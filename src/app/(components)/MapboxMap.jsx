import { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, useLoadScript } from '@react-google-maps/api';

const MapComponent = ({ setLat, setLng }) => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  // Indonesia bounding box
  const indonesiaBounds = {
    north: 12.0, // North bound (top of Indonesia)
    south: -14.0, // South bound (bottom of Indonesia)
    east: 142.0, // East bound (right of Indonesia)
    west: 94.0, // West bound (left of Indonesia)
  };

  const handleMapClick = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();

    // Validasi koordinat (pastikan tetap dalam maxBounds)
    const maxBounds = indonesiaBounds;

    // Pastikan koordinat berada di dalam batas
    const boundedLat = Math.max(maxBounds.south, Math.min(maxBounds.north, lat));
    const boundedLng = Math.max(maxBounds.west, Math.min(maxBounds.east, lng));

    // Update lat/lng state
    setLat(boundedLat);
    setLng(boundedLng);

    // If there's an existing marker, update its position
    if (marker) {
      marker.setPosition({ lat: boundedLat, lng: boundedLng });
    } else {
      const newMarker = new window.google.maps.Marker({
        position: { lat: boundedLat, lng: boundedLng },
        map,
      });
      setMarker(newMarker);
    }
  };

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '400px' }}
        center={{ lat: -0.7893, lng: 113.9213 }} // Center map on Indonesia
        zoom={3}
        onClick={handleMapClick}
        onLoad={(map) => {
          setMap(map);
          map.setOptions({
            restriction: {
              latLngBounds: indonesiaBounds, // Apply the bounding box restriction
              strictBounds: false, // Allow panning inside the bounds
            },
          });
        }}>
        {marker && <Marker position={marker.getPosition()} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
