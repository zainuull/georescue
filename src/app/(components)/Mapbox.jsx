import React, { useEffect, useState, useCallback } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const indonesiaBounds = {
  north: 12.0,
  south: -14.0,
  east: 142.0,
  west: 94.0,
};

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const token = process.env.NEXT_PUBLIC_TOKEN_MAPBOX || "";

const MapComponent = ({ lat, lng, setLat, setLng }) => {
  // 🛡️ Proteksi nilai invalid
  if (
    typeof lat !== "number" ||
    typeof lng !== "number" ||
    isNaN(lat) ||
    isNaN(lng)
  ) {
    return <div>Menunggu koordinat...</div>;
  }

  const [viewport, setViewport] = useState({
    latitude: -2.8251446211285893,
    longitude: 117.54672551458364,
    zoom: 3.5,
    minZoom: 3.5,
    maxZoom: 40,
    width: "100%",
    height: "400px",
  });

  const [markerPos, setMarkerPos] = useState({ latitude: lat, longitude: lng });

  useEffect(() => {
    setViewport((prev) => ({
      ...prev,
      latitude: lat,
      longitude: lng,
    }));
    setMarkerPos({ latitude: lat, longitude: lng });
  }, [lat, lng]);

  const handleClick = useCallback(
    (event) => {
      const [clickedLng, clickedLat] = event.lngLat;

      const boundedLat = clamp(
        clickedLat,
        indonesiaBounds.south,
        indonesiaBounds.north
      );
      const boundedLng = clamp(
        clickedLng,
        indonesiaBounds.west,
        indonesiaBounds.east
      );

      setLat(boundedLat);
      setLng(boundedLng);
      setMarkerPos({ latitude: boundedLat, longitude: boundedLng });
    },
    [setLat, setLng]
  );

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={token}
      mapStyle={`https://api.mapbox.com/styles/v1/mapbox/streets-v11?access_token=${token}`}
      onViewportChange={(next) => setViewport(next)}
      onClick={handleClick}
    >
      <Marker latitude={markerPos.latitude} longitude={markerPos.longitude}>
        <div
          style={{
            fontSize: "24px",
            color: "red",
            transform: "translate(-50%, -100%)",
          }}
        >
          📍
        </div>
      </Marker>
    </ReactMapGL>
  );
};

export default MapComponent;
