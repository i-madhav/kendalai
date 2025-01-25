import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
export async function GET(request: NextRequest){ 
    const prisma = new PrismaClient(); 
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    if (!query) {
        return NextResponse.json({ message: 'Query is required' }, { status: 400 });
    }

    try {
        const properties = await prisma.property.findMany({ 
            where: { 
                OR: [ 
                    { 
                        address: { 
                            name: { 
                                contains: query, 
                                mode: "insensitive" 
                            } 
                        } 
                    }, 
                    { 
                        neighborhood: { 
                            name: { 
                                contains: query, 
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

        return NextResponse.json({status:200, data:properties});
    } catch (error) {
        console.error('Search error:', error);
        return NextResponse.json({ status: 500, message: 'Error searching properties' });
    } finally {
        await prisma.$disconnect();
    }
}   