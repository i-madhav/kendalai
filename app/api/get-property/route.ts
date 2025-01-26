import { NextResponse, NextRequest } from "next/server";
import { PrismaClient, PropertyType } from "@prisma/client";
export async function GET(request: NextRequest) {
    const prisma = new PrismaClient();
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    const category = searchParams.get('category');
    if (!query && !category) {
        return NextResponse.json({ message: 'Query is required' }, { status: 400 });
    }

    try {
        if (category?.length === 0) {
            const properties = await prisma.property.findMany({
                where: {
                    OR: [
                        {
                            address: {
                                name: {
                                    contains: query || "",
                                    mode: "insensitive"
                                }
                            }
                        },
                        {
                            neighborhood: {
                                name: {
                                    contains: query || "",
                                    mode: "insensitive"
                                }
                            }
                        }
                    ]
                },
                include: {
                    address: true,
                    neighborhood: true
                }
            });

            if (properties.length === 0) {
                return NextResponse.json({ status: 500, message: "No properties found" });
            } else {
                return NextResponse.json({ status: 200, data: properties });
            }
        } else if (category && category.length > 0 && category !== "ALL") {
            const properties = await prisma.property.findMany({
                where: {
                    propertyType: category as PropertyType
                },
                include: {
                    address: true,
                    neighborhood: true
                }
            });
            if (properties.length === 0) {
                return NextResponse.json({ status: 500, message: "No properties found" });
            } else {
                return NextResponse.json({ status: 200, data: properties });
            }
        }else if(category === "ALL"){
            const properties = await prisma.property.findMany({
                include: {
                    address: true,
                    neighborhood: true
                }
            });
            if (properties.length === 0) {
                return NextResponse.json({ status: 500, message: "No properties found" });
            } else {
                return NextResponse.json({ status: 200, data: properties });
            }
        }
    } catch (error) {
        console.error('Search error:', error);
        return NextResponse.json({ status: 500, message: 'Error searching properties' });
    } finally {
        await prisma.$disconnect();
    }
}   