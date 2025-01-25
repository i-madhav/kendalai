import React from 'react'
import PropertyCard from './PropertyCard'
import PropertyDetail from './PropertyDetail'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/(service)/store/store'

interface Property {
  id: string;
  price: number;
  propertyName: string;
  area: number;
  location: string;
  // Add more fields as necessary
}

const PropertiesList: React.FC = () => {
  // Replace with actual data fetching logic
  const properties: Property[] = [
    {
      id: '1',
      price: 500000,
      propertyName: 'Beautiful Family House',
      area: 2500,
      location: 'San Francisco, CA',
    },
    {
      id: '2',
      price: 750000,
      propertyName: 'Modern Apartment',
      area: 1800,
      location: 'New York, NY',
    },
    // Add more properties as needed
  ]

  const selectedProperty = useSelector((state: RootState) => state.selectedProperty.selectedProperty)

  return (
    <div className="relative">
      <div className="flex flex-wrap justify-center">
        {properties.map(property => (
          <PropertyCard
            key={property.id}
            id={property.id}
            price={property.price}
            propertyName={property.propertyName}
            area={property.area}
            location={property.location}
          />
        ))}
      </div>
      {selectedProperty && <PropertyDetail />}
    </div>
  )
}

export default PropertiesList 