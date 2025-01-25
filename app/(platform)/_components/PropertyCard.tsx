"use client";
import React, { useState } from "react";
import Image from "next/image";
import property from "@/public/assests/img/download.jpg";
import { RootState } from "@/app/(service)/store/store";
import { useSelector, useDispatch } from "react-redux";
import PropertyDescription from "./PropertyDescription";
import { setSelectedProperty } from "@/app/(service)/store/slice/SelectedSlice";
import { PropertyData } from "../home/page";


const PropertyCard: React.FC<PropertyData> = ({
  id,
  price,
  name,
  squareFeet,
  address,
  description,
  propertyType,
  images,
  createdAt,
  updatedAt,
  bedrooms,
  bathrooms,
  neighborhood,
  addressId,
  neighborhoodId,

}) => {
  const selectedProperty = useSelector(
    (state: RootState) => state.selectedProperty.selectedP
  );

  console.log("This is the selected property");
  console.log(selectedProperty);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const handleClick = () => {
    setIsOpen(true);
  };

  return (
    <>
      <div
        onClick={handleClick}
        className={`${
          selectedProperty?.id === id ? "border-[5px] border-black" : ""
        } relative rounded-3xl overflow-hidden h-fit shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-gradient-to-r from-white to-gray-50 border border-gray-200 m-4 transform hover:-translate-y-2 cursor-pointer`}
      >
        {/* Glowy Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-300 via-purple-300 to-pink-300 opacity-30 blur-xl"></div>

        <div className="relative h-56 w-full">
          <Image
            src={property}
            alt={name}
            layout="fill"
            objectFit="cover"
            className="transform scale-100 hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="p-6">
          <h3 className="font-semibold text-2xl mb-4 text-gray-800">
            {name}
          </h3>

          <div className="mb-4">
            <span className="inline-block text-xl font-bold text-green-700 bg-green-100 px-4 py-2 rounded-full shadow-sm">
              ${price?.toLocaleString() || "-"}
            </span>
          </div>

          <div className="flex flex-col gap-4 text-gray-600">
            <div className="flex items-center gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-indigo-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5"
                />
              </svg>
              <span className="text-md">{squareFeet?.toLocaleString() || "-"} sq ft</span>
            </div>

            <div className="flex items-center gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-indigo-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="text-md">{address?.name || "-"}</span>
            </div>
          </div>

          <button className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-full hover:bg-indigo-700 transition-colors duration-300">
            View Details
          </button>
        </div>
      </div>


        {isOpen && (
          <PropertyDescription
            property={{
              id,
              name: name,
              price: price,
              description: description,
              propertyType: propertyType,
              bedrooms: bedrooms,
              bathrooms: bathrooms,
              squareFeet: squareFeet,
              createdAt: createdAt,
              updatedAt: updatedAt,
            }}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          />
        )}
    </>
  );
};

export default PropertyCard;