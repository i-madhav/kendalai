import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { LocationType, PropertyType } from "@prisma/client";
export async function POST(request: NextRequest) {
    const prisma = new PrismaClient();
    try {
        const {propertyData} = await request.json();
        const address = await prisma.location.create({
            data: {
                name: propertyData.address.name,
                type: LocationType.ADDRESS,
                lat: propertyData.address.lat,
                lng: propertyData.address.lng,
            }
        });

        const neighborhood = await prisma.location.create({
            data: {
                name: propertyData.neighborhood.name,
                type: LocationType.NEIGHBORHOOD,
                lat: propertyData.neighborhood.lat,
                lng: propertyData.neighborhood.lng,
            }
        });

        const property = await prisma.property.create({
            data: {
                name: propertyData.name,
                price: propertyData.price,
                description: propertyData.description,
                propertyType: propertyData.propertyType,
                bedrooms: propertyData.bedrooms,
                bathrooms: propertyData.bathrooms,
                squareFeet: propertyData.squareFeet,
                images: propertyData.images,
                addressId: address.id,
                neighborhoodId: neighborhood.id,
            }
        });

        return NextResponse.json({
            message: "Property created successfully", 
            property: property
        }, { status: 200 });
    } catch (error) {
        console.error("Error details:", error);
        return NextResponse.json(
            { message: "Error creating property" }, 
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}