"use client";
import React, { useState, useCallback, useMemo } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript,
  OverlayView,
} from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/(service)/store/store";
import Image from "next/image";
import propertyImage from "@/public/assests/img/download.jpg";
import { setSelectedProperty as property } from "@/app/(service)/store/slice/SelectedSlice";
import { PropertyData } from "@/app/(platform)/home/page";

interface Location {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

type PropertyType = "VILLA" | "COMMERCIAL" | "APARTMENT" | "HOUSE" | "LAND";

const DEFAULT_LAT = 40.7128; // New York City coordinates as an example
const DEFAULT_LNG = -74.0060;

const CustomMap = ({ properties }: { properties: PropertyData[] }) => {
  const [selectedProperty, setSelectedProperty] = useState<PropertyData | null>(
    null
  );
  const { lat, lng } = useSelector((state: RootState) => state.actionBarLatLog);
  const dispatch = useDispatch();
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyABa6cE3AqD4LlELbzI7me8GOzaEUo0vVA",
    libraries: ["places"],
  });

  const mapContainerStyle = {
    width: "100%",
    height: "100%",
    borderRadius: "20px",
  };
  const center = useMemo(
    () => ({
      lat: lat || (properties.length > 0 ? properties[0]?.address?.lat : DEFAULT_LAT),
      lng: lng || (properties.length > 0 ? properties[0]?.address?.lng : DEFAULT_LNG),
    }),
    [lat, lng, properties]
  );
  const mapOptions = useMemo(
    () => ({
      zoomControl: false,
      streetViewControl: false,
      mapTypeControl: false,
      fullscreenControl: false,
    }),
    []
  );

  const handleMarkerClick = useCallback((property: PropertyData) => {
    setSelectedProperty(property);
  }, []);

  const handleInfoWindowClose = useCallback(() => {
    setSelectedProperty(null);
  }, []);

  const handleDispatchSelected = useCallback(
    (val: PropertyData) => {
      dispatch(property(val));
    },
    [dispatch]
  );

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  console.log("this is the properties");
  console.log(properties);

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={13}
      options={mapOptions}
    >
      {properties?.map((property) => (
        <Marker
          key={property.id}
          position={{ lat: property?.address?.lat, lng: property?.address?.lng }}
          onClick={() => handleMarkerClick(property)}
          icon={{
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: "black",
            fillOpacity: 1,
            strokeColor: "white",
            strokeWeight: 2,
            scale: 8,
            anchor: new google.maps.Point(0, 0),
          }}
        />
      ))}

      {selectedProperty && (
        <InfoWindow
          position={{
            lat: selectedProperty.address.lat,
            lng: selectedProperty.address.lng,
          }}
          onCloseClick={handleInfoWindowClose}
          onPositionChanged={() => handleDispatchSelected(selectedProperty)}
        >
          <div className="rounded-xl shadow-sm w-full relative p-2 bg-gradient-to-tr from-blue-300 via-purple-300 to-pink-300 z-[999999999999999999]">
            <Image
              src={propertyImage}
              alt="property"
              width={200}
              height={150}
              className="w-full rounded-lg mb-2"
            />
            <h3 className="font-bold text-lg">{selectedProperty.name}</h3>
            <p className="font-semibold text-black bg-green-200 rounded-xl p-1 w-fit">
              ${selectedProperty.price.toLocaleString()}
            </p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};
export default CustomMap;
