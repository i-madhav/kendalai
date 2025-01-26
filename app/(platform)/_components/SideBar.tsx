import React from 'react'
import PropertyCard from './PropertyCard'

interface PropertyData {
  id: string;
  name: string;
  price: number;
  description: string;
  addressId: string;
  neighborhoodId: string;
  propertyType: PropertyType;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  images: string;
  createdAt: string;
  updatedAt: string;
  address: Location;
  neighborhood: Location;
}

interface Location {
  id: string;
  name: string;
  type: LocationType;
  lat: number;
  lng: number;
}

type PropertyType = "VILLA" | "COMMERCIAL" | "APARTMENT" | "HOUSE" | "LAND";

type LocationType = "ADDRESS" | "NEIGHBORHOOD" | "CITY" | "STATE";

const SideBar = ({properties}:{properties:PropertyData[]}) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      {properties?.map((property) => (
        <PropertyCard 
          key={property.id}
          {...property}
        />
      ))}
    </div>
  )
}

export default SideBar