'use client'  
import React, { useState, useRef } from 'react'  
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api';  
import { useDispatch } from 'react-redux';  
import { setLatLog } from '../../(service)/store/slice/ActionBarLatLog';  
import { Search } from 'lucide-react'  
import Link from 'next/link';  

const ActionBar = () => {  
  const [searchResult, setSearchResult] = useState<google.maps.places.Autocomplete | null>(null);  
  const dispatch = useDispatch();  

  const searchRef = useRef<HTMLInputElement>(null);  

  const onPlaceChanged = () => {  
    if (searchResult && searchRef.current) {  
      const place = searchResult.getPlace();  
      
      if (place.geometry) {  
        const lat = place.geometry.location?.lat();  
        const lng = place.geometry.location?.lng();  
        if (lat && lng) {  
          dispatch(setLatLog({ lat, lng }));  
        }  
      }  
    }  
  };  

  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {  
    setSearchResult(autocomplete);  
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

      <div className="flex gap-2">  
        <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">  
          For Sale  
        </button>  
        <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">  
          Price Range  
        </button>  
        <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">  
          Category  
        </button>  
        <Link   
          href="/listing"  
          className="px-4 py-2 border rounded-lg bg-black text-white"  
        >  
         Add Property  
        </Link>  
      </div>  
    </div>  
  );  
}  

export default ActionBar;