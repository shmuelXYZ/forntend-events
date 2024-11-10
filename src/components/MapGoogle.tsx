import React from "react";
import { useCallback, useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

export const MapComponent = ({ address, className = "" }) => {
  const [coordinates, setCoordinates] = useState(null);
  const [map, setMap] = useState(null);

  const mapStyles = {
    height: "100%",
    width: "100%",
  };

  // Function to geocode address to coordinates
  const geocodeAddress = useCallback(async (address) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=YOUR_GOOGLE_MAPS_API_KEY`
      );
      const data = await response.json();
      
      if (data.results && data.results[0]) {
        const { lat, lng } = data.results[0].geometry.location;
        setCoordinates({ lat, lng });
        
        // Center map on the new coordinates
        if (map) {
          map.panTo({ lat, lng });
        }
      }
    } catch (error) {
      console.error('Geocoding error:', error);
    }
  }, [map]);

  // Update coordinates when address changes
  useEffect(() => {
    if (address) {
      geocodeAddress(address);
    }
  }, [address, geocodeAddress]);

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const defaultCenter = {
    lat: 40.7128, // Default to New York City
    lng: -74.0060
  };

  return (
    <div className={`h-64 w-full rounded-lg overflow-hidden ${className}`}>
      <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={15}
          center={coordinates || defaultCenter}
          onLoad={onLoad}
        >
          {coordinates && <Marker position={coordinates} />}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};
