import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useState, useEffect } from "react";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const indonesiaBounds = {
  north: 12.0,
  south: -14.0,
  east: 142.0,
  west: 94.0,
};

const MapComponent = ({ lat, lng, setLat, setLng }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const [markerPos, setMarkerPos] = useState({ lat, lng });

  // 🔄 Sync markerPos when props.lat/lng change
  useEffect(() => {
    if (lat && lng) {
      setMarkerPos({ lat, lng });
    }
  }, [lat, lng]);

  const handleMapClick = (e) => {
    const clickedLat = e.latLng.lat();
    const clickedLng = e.latLng.lng();

    const boundedLat = Math.max(
      indonesiaBounds.south,
      Math.min(indonesiaBounds.north, clickedLat)
    );
    const boundedLng = Math.max(
      indonesiaBounds.west,
      Math.min(indonesiaBounds.east, clickedLng)
    );

    setLat(boundedLat);
    setLng(boundedLng);
    setMarkerPos({ lat: boundedLat, lng: boundedLng });
  };

  if (loadError) return <div>Gagal memuat peta</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={markerPos || { lat: -0.7893, lng: 113.9213 }}
      zoom={5}
      onClick={handleMapClick}
      onLoad={(map) => {
        map.setOptions({
          restriction: {
            latLngBounds: indonesiaBounds,
            strictBounds: false,
          },
        });
      }}
    >
      {markerPos && <Marker position={markerPos} />}
    </GoogleMap>
  );
};

export default MapComponent;
