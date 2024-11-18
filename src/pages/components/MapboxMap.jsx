import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';

const token = process.env.NEXT_PUBLIC_TOKEN_MAPBOX || '';

const MapboxMap = ({ lat, lng, setLat, setLng }) => {
  const mapContainer = useRef(null);
  const markerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = token;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [113.9213, -0.7893], // Pusat Indonesia
      zoom: 3,
      maxBounds: [
        [94.0, -14.0],
        [142.0, 12.0],
      ],
    });

    mapRef.current = map;

    map.on('click', (e) => {
      let { lat, lng } = e.lngLat;

      // Validasi koordinat (pastikan tetap dalam maxBounds)
      const maxBounds = {
        southWest: { lat: -14.0, lng: 94.0 }, // Kiri bawah
        northEast: { lat: 12.0, lng: 142.0 }, // Kanan atas
      };

      // Jika koordinat di luar batas, sesuaikan ke tepi batas
      lat = Math.max(maxBounds.southWest.lat, Math.min(maxBounds.northEast.lat, lat));
      lng = Math.max(maxBounds.southWest.lng, Math.min(maxBounds.northEast.lng, lng));

      // Perbarui state lat/lng
      setLat(lat);
      setLng(lng);

      // Tambahkan atau pindahkan marker
      if (markerRef.current) {
        markerRef.current.setLngLat([lng, lat]);
      } else {
        markerRef.current = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
      }
    });

    return () => map.remove();
  }, []);

  useEffect(() => {
    if (!mapRef.current) {
      console.log('Map is not initialized yet');
      return;
    }

    const ZoomPitch = () => {
      const zoomLevel = mapRef.current.getZoom();
      let targetPitch = 0;

      if (zoomLevel >= 5.8 && zoomLevel <= 10) {
        targetPitch = (zoomLevel - 8) * 22.5;
      } else if (zoomLevel > 10) {
        const pitchIncrement = (zoomLevel - 10) * 7.5;
        targetPitch = Math.min(45 + pitchIncrement, 60);
      }

      const currentMapPitch = mapRef.current.getPitch();
      if (targetPitch !== currentMapPitch) {
        mapRef.current.setPitch(targetPitch);
      }
    };

    mapRef.current.on('zoom', ZoomPitch); // Mendaftarkan event zoom

    // Hapus event listener saat komponen dibersihkan
    return () => {
      if (mapRef.current) {
        mapRef.current.off('zoom', ZoomPitch);
      }
    };
  }, [mapRef.current]);

  return <div ref={mapContainer} style={{ width: '100%', height: '400px' }} />;
};

export default MapboxMap;
