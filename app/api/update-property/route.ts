import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function PATCH(request: Request) {
    const prisma = new PrismaClient();
  try {
    const {propertyData,id} = await request.json();
    if (!id) {
      return NextResponse.json(
        { error: "Property ID is required" },
        { status: 400 }
      );
    }
    const property = await prisma.property.findUnique({
        where:{
            id:id
        }
    });

    if(!property){
        return NextResponse.json({error:"Property not found" , status:404});
    }

    const updateAddress = await prisma.location.update({
        where:{
            id:property?.addressId
        },
        data:{
            name:propertyData.address.name,
            lat:propertyData.address.lat,
            lng:propertyData.address.lng
        }
    })

    if(!updateAddress){
        return NextResponse.json({error:"Address not found" , status:404});
    }

    const updateNeighborhood = await prisma.location.update({
        where:{
            id:property?.neighborhoodId
        },
        data:{
            name:propertyData.neighborhood.name,
            lat:propertyData.neighborhood.lat,
            lng:propertyData.neighborhood.lng
        }
    })

    if(!updateNeighborhood){
        return NextResponse.json({error:"Neighborhood not found" , status:404});
    }

    const updatedProperty = await prisma.property.update({
        where:{
            id:id
        },
        data:{
            name:propertyData.name,
            price:propertyData.price,
            description:propertyData.description,
            addressId:updateAddress.id,
            neighborhoodId:updateNeighborhood.id,
            propertyType:propertyData.propertyType,
            squareFeet:propertyData.squareFeet,
            bedrooms:propertyData.bedrooms,
            bathrooms:propertyData.bathrooms,
            images:propertyData.images
        }
    })

    return NextResponse.json({status:200 , updatedProperty , message:"Property updated successfully"});
  } catch (error) {
    console.error("Error updating property:", error);
    return NextResponse.json(
      { error: "Error updating property" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
