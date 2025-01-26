"use client";
import React from "react";
import { useJsApiLoader } from "@react-google-maps/api";

interface GoogleMapsLoaderProps {
  children: React.ReactNode;
}
const GoogleMapsLoader: React.FC<GoogleMapsLoaderProps> = ({ children }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY!,
    libraries: ["places"],
    version: "weekly"
  });

  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default GoogleMapsLoader; 