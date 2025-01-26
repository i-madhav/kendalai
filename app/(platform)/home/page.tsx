"use client";
import React,{ useEffect, useState } from "react";
import ActionBar from "../_components/ActionBar";
import SideBar from "../_components/SideBar";
import CustomMap from "../_components/CustomMap";

const SkeletonCard = () => (
  <div className="p-4 border rounded-lg mb-4 animate-pulse">
    <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
  </div>
);

const ShimmerMap = () => (
  <div className="w-full h-full flex items-center justify-center animate-pulse">
    <div className="w-3/4 h-3/4 bg-gray-200 rounded-lg"></div>
  </div>
);

export interface PropertyData {
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


const HomePage = () => {
const [properties, setProperties] = useState<PropertyData[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
const[searchedProperty, setSearchedProperty] = useState<string>("paschim");
const[selectedCategory, setSelectedCategory] = useState<string>("");

console.log(searchedProperty);
console.log(selectedCategory);
useEffect(() => {
  const fetchProperties = async () => {
    try {
      if(selectedCategory.length === 0 && searchedProperty.length === 0){
        return;
      }
      const response = await fetch(`/api/get-property?query=${selectedCategory.length === 0 ? searchedProperty?.trim().toLocaleLowerCase() : ""}&category=${selectedCategory}`);
      if (!response.ok) {
        throw new Error('Failed to fetch properties');
      }
      const data = await response.json();
      setProperties(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setSearchedProperty("");
      setSelectedCategory("");
      setLoading(false);
    }
  };
  fetchProperties();
}, [searchedProperty, selectedCategory]);


  return (
    <div>
      <ActionBar setSearchedProperty={setSearchedProperty} setSelectedCategory={setSelectedCategory}/>
      <div className="md:block lg:flex h-[37.4rem]">
        <div className="w-full lg:w-[50%] h-full  overflow-y-scroll scrollbar">
          {loading && properties.length === 0 ? (
            <div className="p-4">
              {[...Array(5)]?.map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          ) : (
            <SideBar properties={properties} />
          )}
        </div>
        <div className="w-full lg:w-[50%] h-full ">
          <div className=" flex items-center justify-center h-full">
            {loading && properties.length === 0 ? <ShimmerMap /> : <CustomMap properties={properties}/>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;