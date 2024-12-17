'use client';
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { Tooltip } from '@mui/material';
import './style.css';
import { initialMapSourcesMapbox } from './data/mapSourcesMapbox';
import MapAccordion from './mapAccordion';
import { BiWorld, BiZoomIn, BiZoomOut } from 'react-icons/bi';
import { FaRegMap } from 'react-icons/fa';
import { dataPopup } from './data/dataPopup';

const token = process.env.NEXT_PUBLIC_TOKEN_MAPBOX || '';
const indonesiaCoordinates = [117.54672551458364, -2.8251446211285893];
const selectedSource = Object.values(initialMapSourcesMapbox).find((source) => source.state);

const MapboxExample = ({ data }) => {
  const legendaRef = useRef(null);
  const mapMenuRef = useRef(null);
  const layerRef = useRef(null);
  const atributesRef = useRef(null);
  const mapRef = useRef(null);
  const popupRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState({
    map: false,
    layer: false,
    legenda: false,
    attributes: false,
  });
  const [isTab, setIsTab] = useState({});
  const [currentZoom, setCurrentZoom] = useState(4.15);

  const [mapSources, setMapSources] = useState(initialMapSourcesMapbox);
  const [activeKey, setActiveKey] = useState('outdoors');
  const [currentMap, setCurrentMap] = useState(selectedSource);
  const [currentPitch, setCurrentPitch] = useState(0);
  const [isZoomingWithPopup, setIsZoomingWithPopup] = useState(false);
  // object
  const radiusRef = useRef(20); // Radius awal untuk animasi
  const radiusDirectionRef = useRef('increase'); // Menyimpan arah perubahan radius
  const pulseEffectRef = useRef(0); // Menyimpan efek pulse untuk animasi

  console.log('data', data);

  // Init Map dan layer bangunan
  useEffect(() => {
    mapboxgl.accessToken = token;

    mapRef.current = new mapboxgl.Map({
      container: 'map',
      // style: 'mapbox://styles/mapbox/streets-v11',
      style: currentMap.source,
      center: indonesiaCoordinates,
      zoom: currentZoom,
      minZoom: 4.5,
      maxZoom: 40,
      pitch: currentPitch,
      antialias: true,
    });

    mapRef.current.setMaxBounds([
      [94.0, -14.0],
      [142.0, 12.0],
    ]);

    mapRef.current.on('style.load', () => {
      const layers = mapRef.current.getStyle().layers;
      const labelLayerId = layers.find(
        (layer) => layer.type === 'symbol' && layer.layout['text-field']
      )?.id;

      mapRef.current.addSource('dem', {
        type: 'raster-dem',
        url: 'mapbox://mapbox.mapbox-terrain-dem-v1', // URL untuk sumber DEM
        tileSize: 512,
        maxzoom: 14,
      });

      // Menambahkan layer DEM ke peta
      mapRef.current.addLayer({
        id: 'terrain',
        source: 'dem',
        type: 'hillshade',
        layout: {},
        paint: {
          'hillshade-exaggeration': 0.2, // Menentukan eksagerasi hillshade
          'hillshade-shadow-color': '#000000', // Warna bayangan
          'hillshade-highlight-color': '#FFFFFF', // Warna highlight
          'hillshade-accent-color': '#888888', // Warna aksen
        },
      });

      // Mengaktifkan pencahayaan 3D pada DEM
      mapRef.current.setTerrain({ source: 'dem', exaggeration: 0.5 }); //Menentukan Ketinggian

      mapRef.current.addLayer(
        {
          id: '3d-buildings',
          source: 'composite',
          'source-layer': 'building',
          filter: ['==', 'extrude', 'true'],
          type: 'fill-extrusion',
          minzoom: 15,
          paint: {
            'fill-extrusion-color': '#aaa',
            'fill-extrusion-height': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'height'],
            ],
            'fill-extrusion-base': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'min_height'],
            ],
            'fill-extrusion-opacity': 0.6,
          },
        },
        labelLayerId
      );
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, [token, currentMap]);

  // use effect untuk object
  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;

    const geoJsonData = {
      type: 'FeatureCollection',
      features: data.map((item) => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [item.koordinat.lng, item.koordinat.lat],
        },
        properties: {
          id: item.id,
          nama: item.nama,
          imageUrl: item.imageUrl,
          latitude: item.koordinat.lat,
          longitude: item.koordinat.lng,
        },
      })),
    };

    const loadMap = () => {
      // Cek apakah sumber "locations" sudah ada
      if (map.getSource('locations')) {
        // Perbarui data sumber jika sudah ada
        map.getSource('locations').setData(geoJsonData);
      } else {
        // Tambahkan sumber baru jika belum ada
        map.addSource('locations', {
          type: 'geojson',
          data: geoJsonData,
        });
      }

      // Tambahkan layer untuk titik objek jika belum ada
      if (!map.getLayer('locations-layer')) {
        map.addLayer({
          id: 'locations-layer',
          type: 'circle',
          source: 'locations',
          paint: {
            'circle-radius': 8, // Ukuran titik
            'circle-color': '#FF5733', // Warna titik
          },
        });
      }

      // Tambahkan layer untuk radius jika belum ada
      if (!map.getLayer('radius-layer')) {
        map.addLayer({
          id: 'radius-layer',
          type: 'circle',
          source: 'locations',
          paint: {
            'circle-radius': radiusRef.current, // Radius
            'circle-color': `rgba(255, 87, 51, 0.4)`, // Transparansi statis
          },
        });
      }
    };

    const animateRadius = () => {
      let newRadius = radiusRef.current;

      // Mengubah arah radius (menambah/mengurangi)
      if (radiusDirectionRef.current === 'increase') {
        newRadius += 1;
        if (newRadius > 60) {
          radiusDirectionRef.current = 'decrease'; // Radius mencapai batas, maka mengecil
        }
      } else {
        newRadius -= 1;
        if (newRadius < 20) {
          radiusDirectionRef.current = 'increase'; // Radius mencapai batas, maka membesar
        }
      }

      // Update nilai radius dan opacity
      radiusRef.current = newRadius;

      // Efek pulse - membuat radius sedikit lebih besar dan kecil dengan smooth
      const pulse = Math.sin(pulseEffectRef.current) * 5; // Memberikan efek pulse
      pulseEffectRef.current += 0.1; // Menambah efek setiap frame

      // Perbarui properti circle-radius dan opacity
      map.setPaintProperty('radius-layer', 'circle-radius', newRadius + pulse);
      map.setPaintProperty('radius-layer', 'circle-color', `rgba(255, 87, 51, 0.4)`);

      // Memanggil lagi animasi jika perlu
      if (mapRef.current) {
        requestAnimationFrame(animateRadius);
      }
    };

    map.on('load', () => {
      loadMap(); // Load map once
      animateRadius(); // Start animation only once
    });

    // Listen for click events on the Mapbox GL map
    const onClickHandler = async (e) => {
      // Menyaring fitur dalam bounding box yang ditentukan
      const features = mapRef.current.queryRenderedFeatures(e.point, {
        layers: ['locations-layer'], // Nama layer yang digunakan untuk titik lokasi
      });

      if (features.length > 0) {
        const feature = features[0]; // Mengambil fitur pertama yang ditemukan
        const properties = feature.properties;

        console.log('features:', features);
        showPopupWithContent(e.originalEvent, 'Provinsi_Indonesia', properties);
      } else {
        console.log('Tidak ada fitur yang ditemukan pada titik tersebut.');
      }
    };

    map.on('click', onClickHandler);
  }, [data, mapRef.current]);

  const generatePopupContent = (id, result) => {
    let content = '';

    if (result) {
      for (const [pattern, templateFn] of Object.entries(dataPopup)) {
        if (id.includes(pattern)) {
          content = templateFn(result);
          break; // Exit loop once a matching pattern is found
        }
      }
    }

    return `
     <div>
      ${
        content
          ? `<div class="d-flex align-items-center gap-2">
              <button class="zoom-button btn btn-primary" data-id="${id}">
                Zoom
              </button>
            </div>`
          : ''
      }
      <div class="ol-popup-satupeta-content">
            ${content || '<div>Tidak ada data</div>'}
      </div>
    </div>
  `;
  };

  const showPopupWithContent = (originalEvent, id, properties) => {
    const popupContent = generatePopupContent(id, properties);
    const latitude = properties.latitude;
    const longitude = properties.longitude;

    // Hapus popup yang ada jika ada
    if (popupRef.current) {
      popupRef.current.remove();
    }

    // Buat elemen popup baru
    const popupElement = document.createElement('div');
    popupElement.className = 'ol-popup-satupeta';
    popupElement.innerHTML = popupContent;

    // Hitung posisi popup berdasarkan event
    const mapContainer = mapRef.current.getContainer(); // Mendapatkan kontainer peta
    const mapRect = mapContainer.getBoundingClientRect(); // Mendapatkan bounding box kontainer peta
    const offsetX = originalEvent.clientX - mapRect.left; // Offset horizontal dalam kontainer peta
    const offsetY = originalEvent.clientY - mapRect.top; // Offset vertikal dalam kontainer peta

    // Pastikan popup diposisikan dengan benar dalam kontainer peta
    popupElement.style.position = 'absolute';
    popupElement.style.left = `${offsetX}px`;
    popupElement.style.top = `${offsetY}px`;

    // Tambahkan popup ke body (atau ke dalam kontainer peta jika diinginkan)
    document.body.appendChild(popupElement);

    // Perbarui ref ke popup yang sedang aktif
    popupRef.current = popupElement;

    // Tambahkan event listener untuk tombol zoom
    const zoomButton = popupElement.querySelector('.zoom-button');
    if (zoomButton) {
      zoomButton.addEventListener('click', () =>
        handleZoomClick(longitude, latitude, popupElement)
      );
    }

    // Opsional, sembunyikan popup ketika pengguna menggerakkan mouse ke luar
    popupElement.addEventListener('mouseleave', () => {
      popupElement.style.display = 'none';
    });
  };

  const handleZoomClick = (longitude, latitude) => {
    setIsZoomingWithPopup(true); // Tandai bahwa zoom sedang berlangsung

    const zoomLevel = 20; // Atur zoom level yang diinginkan

    // Menghitung pitch berdasarkan zoomLevel
    const calculatePitch = (zoomLevel) => {
      let targetPitch = 0;
      if (zoomLevel >= 5.8 && zoomLevel <= 10) {
        targetPitch = (zoomLevel - 8) * 22.5; // Interpolasi pitch antara 0 hingga 45
      } else if (zoomLevel > 10) {
        const pitchIncrement = (zoomLevel - 10) * 7.5; // Tambah pitch jika zoom lebih dari 10
        targetPitch = Math.min(45 + pitchIncrement, 60); // Maksimalkan pitch hingga 60
      }
      return targetPitch;
    };

    // Gunakan zoomTo untuk melakukan zoom langsung ke level yang diinginkan
    mapRef.current.zoomTo(zoomLevel, {
      center: [longitude, latitude], // Tentukan posisi (longitude, latitude)
      duration: 5000, // Durasi animasi zoom
    });

    // Setelah peta selesai melakukan zoom, update pitch secara bertahap
    mapRef.current.once('moveend', () => {
      const targetPitch = calculatePitch(zoomLevel); // Hitung pitch sesuai dengan zoom level
      let currentPitch = mapRef.current.getPitch();

      // Mulai interval untuk mengubah pitch secara bertahap
      const interval = setInterval(() => {
        currentPitch = mapRef.current.getPitch(); // Ambil pitch saat ini

        // Hitung perbedaan antara pitch saat ini dan target pitch
        const pitchDifference = targetPitch - currentPitch;
        const step = pitchDifference * 0.05; // Mengurangi step untuk transisi lebih halus

        // Jika pitch belum mencapai target, perbarui pitch
        if (Math.abs(pitchDifference) > 0.05) {
          // Perbedaan lebih kecil untuk update lebih halus
          mapRef.current.setPitch(currentPitch + step);
        } else {
          // Jika pitch sudah sesuai target, berhenti memperbarui
          clearInterval(interval);
          mapRef.current.setPitch(targetPitch); // Setel pitch final
          setIsZoomingWithPopup(false); // Reset status zooming
        }
      }, 10); // Update pitch lebih sering (lebih cepat)
    });
  };

  // Zoom Pitch
  useEffect(() => {
    if (!mapRef.current) {
      console.log('Map is not initialized yet');
      return;
    }

    const ZoomPitch = () => {
      if (isZoomingWithPopup) {
        return;
      }

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
  }, [mapRef.current, isZoomingWithPopup]);

  // For change basemap
  useEffect(() => {
    // Update mapSources to set the state of the active map to true
    const updatedMapSources = Object.keys(mapSources).reduce((acc, key) => {
      acc[key] = {
        ...mapSources[key],
        state: key === activeKey,
      };
      return acc;
    }, {});

    const selectedSource2 = Object.values(updatedMapSources).find((source) => source.state);
    setCurrentMap(selectedSource2);

    // Set the updated map sources state
    setMapSources(updatedMapSources);
  }, [activeKey]);

  // Function to handle menu toggle
  const handleMenuClick = (name) => {
    setIsMenuOpen((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
    if (isMenuOpen[name]) {
      setIsTab((prev) => ({
        ...prev,
        [name]: !prev[name],
      }));
    }
  };

  const handleZoomIn = () => {
    setIsZoomingWithPopup(true);
    if (mapRef.current) {
      const newZoom = Math.min(mapRef.current.getZoom() + 0.5, mapRef.current.getMaxZoom());
      mapRef.current.flyTo({
        center: mapRef.current.getCenter(),
        zoom: newZoom,
        pitch: currentPitch,
        duration: 300,
      });
      setCurrentZoom(newZoom);
    }

    mapRef.current.once('moveend', () => {
      setIsZoomingWithPopup(false); // Reset status zooming
    });
  };

  const handleZoomOut = () => {
    setIsZoomingWithPopup(true);
    if (mapRef.current) {
      const newZoom = Math.max(mapRef.current.getZoom() - 0.5, mapRef.current.getMinZoom());
      mapRef.current.flyTo({
        center: mapRef.current.getCenter(),
        zoom: newZoom,
        pitch: currentPitch,
        duration: 300,
      });
      setCurrentZoom(newZoom);
    }
    mapRef.current.once('moveend', () => {
      setIsZoomingWithPopup(false); // Reset status zooming
    });
  };

  const handleClickOutside = (event) => {
    if (legendaRef.current && !legendaRef.current.contains(event.target)) {
      setIsMenuOpen((prevState) => ({
        ...prevState,
        legenda: false,
      }));
    }
    if (mapMenuRef.current && !mapMenuRef.current.contains(event.target)) {
      setIsMenuOpen((prevState) => ({
        ...prevState,
        map: false,
      }));
    }
    if (layerRef.current && !layerRef.current.contains(event.target)) {
      setIsMenuOpen((prevState) => ({
        ...prevState,

        layer: false,
      }));
    }
    if (atributesRef.current && !atributesRef.current.contains(event.target)) {
      setIsMenuOpen((prevState) => ({
        ...prevState,
        atributes: false,
      }));
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup event listener on unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative overflow-hidden">
      <div className="relative portals-openlayer h-screen w-screen">
        <div id="map" ref={mapRef} className="w-full h-full relative"></div>
        <div
          className="absolute text-white flex justify-end"
          style={{
            zIndex: '999',
            top: '22%',
            right: '0px',
            width: '450px',
            height: '450px',
            borderTopLeftRadius: '25px',
            borderBottomLeftRadius: '25px',
          }}>
          <div className="w-full h-full relative flex flex-col items-end">
            {/* Maps Section */}
            <div
              ref={mapMenuRef}
              className={`transition-all duration-300 ease-in-out bg-black bg-opacity-50 ${
                isMenuOpen.map ? 'w-[450px]' : 'w-[46px]'
              } h-[50px]`}>
              <div className="flex justify-between items-center p-2">
                <Tooltip title="Peta" placement="left">
                  <FaRegMap
                    onClick={() => handleMenuClick('map')}
                    size={25}
                    className="cursor-pointer"
                  />
                </Tooltip>
                <p
                  className={`flex justify-center items-center m-0 p-0 font-bold ${
                    isMenuOpen.map ? 'block' : 'hidden'
                  }`}>
                  BASEMAP GALLERY
                </p>
                <p></p>
              </div>
              {isMenuOpen.map && (
                <MapAccordion
                  mapSources={mapSources}
                  activeKey={activeKey}
                  setActiveKey={setActiveKey}
                />
              )}
            </div>
            {/* Zoom In */}
            <div className="w-[46px] h-[50px] bg-black bg-opacity-50" onClick={handleZoomIn}>
              <div className="flex justify-center items-center p-2">
                <Tooltip title="Zoom In" placement="left">
                  <BiZoomIn size={25} className="cursor-pointer" />
                </Tooltip>
              </div>
            </div>
            {/* Zoom Out */}
            <div
              className="flex flex-col w-[46px] h-[50px] bg-black bg-opacity-50"
              onClick={handleZoomOut}>
              <div className="flex justify-between items-center p-2">
                <Tooltip title="Zoom Out" placement="left">
                  <BiZoomOut size={25} className="cursor-pointer" />
                </Tooltip>
              </div>
            </div>
            {/* Zoom to Indonesia */}
            <div
              className="flex flex-col w-[46px] h-[50px] bg-black bg-opacity-50"
              onClick={() => {
                if (mapRef.current) {
                  setIsZoomingWithPopup(true);
                  mapRef.current.flyTo({
                    center: indonesiaCoordinates,
                    zoom: 4.15,
                    pitch: 0,
                    duration: 2000,
                  });
                  setCurrentZoom(5.15); // Update state
                  mapRef.current.once('moveend', () => {
                    setIsZoomingWithPopup(false); // Reset status zooming
                  });
                }
              }}>
              <div className="flex justify-between items-center p-2">
                <Tooltip title="Zoom Out ke Peta" placement="left">
                  <BiWorld size={25} className="cursor-pointer" />
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapboxExample;
