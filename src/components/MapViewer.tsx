// components/MapViewer.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

interface Props {
  tripId: string;
  date: string;
}

interface OptionItem {
  name: string;
  googleMapUrl?: string;
  lat?: number;
  lng?: number;
}

const containerStyle = {
  width: '100%',
  height: '100%'
};

const defaultCenter = {
  lat: 48.8606,
  lng: 2.3376 // 羅浮宮經緯度
};

export const MapViewer: React.FC<Props> = ({ tripId, date }) => {
  const [locations, setLocations] = useState<OptionItem[]>([]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || ''
  });

  useEffect(() => {
    const fetchGeoOptions = async () => {
      const ref = collection(db, `trips/${tripId}/days/${date}/slots`);
      const snapshot = await getDocs(ref);
      const options: OptionItem[] = [];

      snapshot.docs.forEach(doc => {
        const slot = doc.data();
        slot.options.forEach((opt: any) => {
          if (opt.lat && opt.lng) {
            options.push({ name: opt.name, lat: opt.lat, lng: opt.lng });
          }
        });
      });

      setLocations(options);
    };

    fetchGeoOptions();
  }, [tripId, date]);

  if (!isLoaded) return <div>地圖載入中...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={locations[0] || defaultCenter}
      zoom={14}
    >
      {locations.map((loc, i) => (
        <Marker key={i} position={{ lat: loc.lat!, lng: loc.lng! }} title={loc.name} />
      ))}
    </GoogleMap>
  );
};