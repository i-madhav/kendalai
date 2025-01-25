import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/app/(service)/store/store'
import { clearSelectedProperty } from '@/app/(service)/store/selectedPropertySlice'
import Image from 'next/image'
import property from "@/public/assests/img/download.jpg" // Replace with actual dynamic image source

const PropertyDetail: React.FC = () => {
  const selectedPropertyId = useSelector((state: RootState) => state.selectedProperty.selectedProperty)
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(clearSelectedProperty())
  }

  if (!selectedPropertyId) return null;

  // Fetch property details based on selectedPropertyId
  // This example uses static data; replace with actual data fetching logic
  const propertyDetails = {
    id: selectedPropertyId,
    price: 500000,
    propertyName: "Beautiful Family House",
    area: 2500,
    location: "San Francisco, CA",
    description: "A lovely 4-bedroom house in the heart of the city.",
    // Add more details as needed
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg relative w-11/12 md:w-2/3 lg:w-1/2">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          &#10005;
        </button>
        <div className="relative h-64 w-full mb-4">
          <Image
            src={property}
            alt={propertyDetails.propertyName}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <h2 className="text-3xl font-bold mb-2">{propertyDetails.propertyName}</h2>
        <p className="text-xl text-green-700 mb-4">${propertyDetails.price.toLocaleString()}</p>
        <p className="text-md text-gray-600 mb-4">{propertyDetails.area.toLocaleString()} sq ft • {propertyDetails.location}</p>
        <p className="text-gray-700">{propertyDetails.description}</p>
        {/* Add more details as needed */}
      </div>
    </div>
  )
}

export default PropertyDetail 