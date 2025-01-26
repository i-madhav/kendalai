'use client'  
import React, { useState, useRef } from 'react'  
import { Autocomplete } from '@react-google-maps/api';  
import { useDispatch } from 'react-redux';  
import { setLatLog } from '../../(service)/store/slice/ActionBarLatLog';  
import { Search } from 'lucide-react'  
import Link from 'next/link';  
import { useSession } from 'next-auth/react';

const ActionBar = ({setSearchedProperty, setSelectedCategory}:{setSearchedProperty:(value:string)=>void, setSelectedCategory:(value:string)=>void}) => {  
  const [searchResult, setSearchResult] = useState<google.maps.places.Autocomplete | null>(null);  
  const dispatch = useDispatch();  
  const session = useSession();
  const searchRef = useRef<HTMLInputElement>(null);  
  const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(false);

  const categories = ['ALL','VILLA', 'APARTMENT', 'HOUSE', 'COMMERCIAL', 'LAND'];

  const onPlaceChanged = () => {  
    if (searchResult && searchRef.current) {  
      const place = searchResult.getPlace();  
      if (place.geometry) {  
        const lat = place.geometry.location?.lat();  
        const lng = place.geometry.location?.lng();  
        if (lat && lng) {  
          dispatch(setLatLog({ lat, lng }));
          setSearchedProperty(place.formatted_address || "");
        }  
      }  
    }  
  };  

  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {  
    setSearchResult(autocomplete);  
  };  

  // Handler for Category Selection
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setIsCategoryOpen(false);
  };

  return (  
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">  
      <div className="flex-1 relative">  
        <Autocomplete  
          onLoad={onLoad}  
          onPlaceChanged={onPlaceChanged}  
        >  
          <input   
            ref={searchRef}  
            type="text"  
            placeholder="Search locations..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"  
          />  
        </Autocomplete>  
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />  
      </div>  

      <div className="flex gap-2 relative">   
        <div className="relative">
          <button
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center justify-between">
            Category
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isCategoryOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
              />
            </svg>
          </button>
          {isCategoryOpen && (
            <ul className="absolute mt-2 w-full bg-white border rounded-lg shadow-lg z-10">
              {categories.map((category) => (
                <li
                  key={category}
                  onClick={() => handleCategorySelect(category)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {category}
                </li>
              ))}
            </ul>
          )}
        </div>
        <Link   
          href={`${session.data ? "/listing" : "/api/auth/signin"}`} 
          className="px-4 py-2 border rounded-lg bg-black text-white"  
        >  
         Add Property  
        </Link>  
      </div>  
    </div>  
  );  
}  

export default ActionBar;