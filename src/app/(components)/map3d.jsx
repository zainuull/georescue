"use client";
import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import { Tooltip } from "@mui/material";
import "./style.css";
import { initialMapSourcesMapbox } from "./data/mapSourcesMapbox";
import { BiWorld, BiZoomIn, BiZoomOut } from "react-icons/bi";
import { dataPopup } from "./data/dataPopup";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import axios from "axios";
import * as turf from "@turf/turf";
import inside from "@turf/boolean-point-in-polygon";
import { point } from "@turf/helpers";
import distance from "@turf/distance";
import SidebarContent from "./sidebar.content";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import dayjs from "dayjs";
import "dayjs/locale/id"; // Untuk format lokal Indonesia
dayjs.locale("id");

const token = process.env.NEXT_PUBLIC_TOKEN_MAPBOX || "";
const indonesiaCoordinates = [117.54672551458364, -2.8251446211285893];
const selectedSource = Object.values(initialMapSourcesMapbox).find(
  (source) => source.state
);

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
  const [activeKey, setActiveKey] = useState("outdoors");
  const [currentMap, setCurrentMap] = useState(selectedSource);
  const [currentPitch, setCurrentPitch] = useState(0);
  const [isZoomingWithPopup, setIsZoomingWithPopup] = useState(false);
  // object
  const radiusRef = useRef(20); // Radius awal untuk animasi
  const radiusDirectionRef = useRef("increase"); // Menyimpan arah perubahan radius
  const pulseEffectRef = useRef(0); // Menyimpan efek pulse untuk animasi
  const markerRef = useRef(null);
  let hospitalMarkerRefs = [];
  const [sidebar_content, setSidebar_content] = useState(false);
  const [dataProvince, setProvinceSelect] = useState(null);
  const [dataSelect, setDataSelect] = useState(null);
  // console.log("hospitals", hospitals);

  // Init Map dan layer bangunan
  useEffect(() => {
    mapboxgl.accessToken = token;

    mapRef.current = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/standard",
      center: indonesiaCoordinates,
      zoom: currentZoom,
      minZoom: 4.5,
      maxZoom: 40,
      pitch: currentPitch,
      antialias: true,
      bearing: 0,
      dragPan: true,
      attributionControl: false,
      interactive: true,
      touchZoomRotate: true,
      doubleClickZoom: true,
      scrollZoom: true,
      touchPitch: true,
    });

    mapRef.current.setMaxBounds([
      [94.0, -14.0],
      [142.0, 12.0],
    ]);

    mapRef.current.on("style.load", () => {
      // ✅ Semua style-related configuration dilakukan di sini
      mapRef.current.setConfigProperty("basemap", "lightPreset", "morning");
      mapRef.current.setConfigProperty(
        "basemap",
        "showPointOfInterestLabels",
        false
      );
      mapRef.current.setConfigProperty("basemap", "showPlaceLabels", true);

      mapRef.current.addSource("mapbox-dem", {
        type: "raster-dem",
        url: "mapbox://mapbox.terrain-rgb",
        tileSize: 512,
        maxzoom: 14,
      });

      mapRef.current.setFog({
        color: "rgba(240, 240, 240, 0.5)",
        "horizon-blend": 0.3,
        "high-color": "#add8e6",
        "space-color": "#000000",
        "star-intensity": 0.15,
      });

      mapRef.current.addLayer({
        id: "sky",
        type: "sky",
        paint: {
          "sky-type": "atmosphere",
          "sky-atmosphere-sun": [0.0, 90.0],
          "sky-atmosphere-sun-intensity": 15,
        },
      });

      mapRef.current.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 });

      mapRef.current.setLight({
        anchor: "viewport",
        intensity: 0.6,
        color: "white",
        position: [1.15, 210, 30],
      });

      mapRef.current.addSource("composite", {
        type: "vector",
        url: "mapbox://mapbox.mapbox-streets-v8",
      });

      mapRef.current.addLayer({
        id: "3d-buildings",
        source: "composite",
        "source-layer": "building",
        filter: ["==", "extrude", "true"],
        type: "fill-extrusion",
        minzoom: 15,
        paint: {
          "fill-extrusion-color": "#aaa",
          "fill-extrusion-height": ["get", "height"],
          "fill-extrusion-base": ["get", "min_height"],
          "fill-extrusion-opacity": 0.6,
        },
      });

      fetchIsochrone({
        latitude: -6.9175,
        longitude: 107.6191,
      });

      fetchHospitals();
    });

    let lastZoom = mapRef.current.getZoom();

    mapRef.current.on("zoomend", () => {
      const zoom = mapRef.current.getZoom();

      if (zoom !== lastZoom) {
        // Pitch menyesuaikan dengan zoom, tetapi lebih halus
        const newPitch = Math.max(zoom * 3, 0); // Batas minimum pitch 0
        mapRef.current.easeTo({ pitch: newPitch, duration: 500 });

        lastZoom = zoom;
      }
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, [token, currentMap]);

  const toUnderscoreLowercase = (str) =>
    str?.toLowerCase().replace(/\s+/g, "_");

  const fetchHospitals = async (province) => {
    const provKey = toUnderscoreLowercase(province); // Contoh: "Jawa Barat" -> "jawa_barat"
    try {
      const res = await axios.get(`/hospitals/${provKey}.json`);
      const hospitals = res.data.map((item) => ({
        name: item.name || "Rumah Sakit",
        coordinates: [item.lng, item.lat], // ⬅️ Sesuaikan
        type: item.type,
        isochrone: item.isochrone || [],
      }));
      return hospitals;
    } catch (error) {
      console.error("Gagal fetch RS lokal:", error);
      return [];
    }
  };

  const reverseGeocodeMapbox = async (lat, lng) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json`;

    try {
      const response = await axios.get(url, {
        params: {
          access_token: token,
          limit: 1,
          language: "id",
        },
      });

      const placeName = response.data.features?.[0]?.place_name;
      const features = response.data.features || [];

      const region = features
        .flatMap((f) => f.context || [])
        .find((item) => item.id.startsWith("region"));

      return region || "Lokasi tidak ditemukan";
    } catch (error) {
      console.error("Error saat reverse geocoding:", error.message);
      return "Terjadi kesalahan saat mengambil lokasi";
    }
  };

  const fetchIsochrone = async (data) => {
    const token = mapboxgl.accessToken;
    const userCoords = [data.longitude, data.latitude];

    const url = `https://api.mapbox.com/isochrone/v1/mapbox/driving/${userCoords.join(
      ","
    )}?contours_minutes=10,30,60&contours_colors=04e813,f4e842,f44141&polygons=true&access_token=${token}`;

    try {
      const res = await axios.get(url);
      const geojson = res.data;

      if (!mapRef.current.getSource("isochrone")) {
        if (mapRef.current.isStyleLoaded()) {
          mapRef.current.addSource("isochrone", {
            type: "geojson",
            data: geojson,
          });

          mapRef.current.addLayer({
            id: "isochrone-layer",
            type: "fill",
            source: "isochrone",
            paint: {
              "fill-color": [
                "match",
                ["get", "contour"],
                10,
                "#04e813", // hijau
                30,
                "#f4e842", // kuning
                60,
                "#f44141", // merah
                "#ccc", // default jika tidak cocok
              ],
              "fill-opacity": 0.4,
            },
          });
        } else {
          mapRef.current.once("styledata", () => {
            fetchIsochrone(data);
          });
          return;
        }
      } else {
        mapRef.current.getSource("isochrone").setData(geojson);
      }

      // ✅ Hapus marker sebelumnya
      if (markerRef.current) {
        markerRef.current.remove();
      }

      const newMarker = new mapboxgl.Marker({ color: "red" })
        .setLngLat(userCoords)
        // .setPopup(new mapboxgl.Popup().setText("Pusat Area"))
        .addTo(mapRef.current);

      markerRef.current = newMarker;

      // =========================
      // 🔍 Cari RS terdekat dalam isochrone
      // =========================

      const location = await reverseGeocodeMapbox(
        data.latitude,
        data.longitude
      );

      if (location) {
        const hospitalList = await fetchHospitals(location.text);
        const nearestHospitals = [];
        const userPoint = point(userCoords);

        // Filter dan hitung jarak untuk RS dalam kontur
        for (const contour of geojson.features) {
          for (const hospital of hospitalList) {
            const hospitalPoint = point(hospital.coordinates);
            if (inside(hospitalPoint, contour)) {
              const dist = distance(userPoint, hospitalPoint, {
                units: "kilometers",
              });
              nearestHospitals.push({ ...hospital, distance: dist });
            }
          }
        }

        // Urutkan berdasarkan jarak terdekat dan ambil 10 saja
        const topHospitals = nearestHospitals
          .sort((a, b) => a.distance - b.distance)
          .slice(0, 10);

        if (topHospitals.length > 0) {
          // Hapus layer & source sebelumnya
          if (mapRef.current.getLayer("route-line")) {
            mapRef.current.removeLayer("route-line");
          }
          if (mapRef.current.getSource("route")) {
            mapRef.current.removeSource("route");
          }

          const features = [];
          hospitalMarkerRefs.forEach((marker) => marker.remove());
          hospitalMarkerRefs = [];
          for (const hospital of topHospitals) {
            const routeUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${userCoords.join(
              ","
            )};${hospital.coordinates.join(
              ","
            )}?geometries=geojson&access_token=${token}`;

            const routeRes = await axios.get(routeUrl);
            const route = routeRes.data.routes[0];
            const durationInMin = Math.round(route.duration / 60); // dalam menit
            const distanceInKm = route.distance / 1000;

            features.push({
              type: "Feature",
              geometry: route.geometry,
              properties: {
                name: hospital.name,
                distance: distanceInKm,
                duration: durationInMin,
              },
            });

            const popup = new mapboxgl.Popup();

            popup.setDOMContent(
              (() => {
                const popupDiv = document.createElement("div");
                const buttonId = `btn-start-${hospital.name
                  .replace(/\s/g, "-")
                  .toLowerCase()}`;

                popupDiv.innerHTML = `
      <strong>${hospital.name}</strong><br/>
      Jarak: ${distanceInKm.toFixed(2)} km<br/>
      Estimasi waktu: ${durationInMin} menit<br/><br/>
      <button
        data-hospital='${JSON.stringify(hospital)}'
        id="${buttonId}"
        style="padding: 4px 8px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">
        Mulai
      </button>
    `;

                popupDiv.style.color = "black";
                popupDiv.style.fontWeight = "bold";

                return popupDiv;
              })()
            );

            // Tambahkan event setelah popup dibuka
            popup.on("open", () => {
              const startButton = document.getElementById(
                `btn-start-${hospital.name.replace(/\s/g, "-").toLowerCase()}`
              );
              if (startButton) {
                startButton.addEventListener("click", () => {
                  const hospitalData = JSON.parse(startButton.dataset.hospital);
                  console.log("RS diklik:", hospitalData);

                  // Ambil rute dari GeoJSON
                  const selectedRoute = features.find(
                    (f) => f.properties.name === hospitalData.name
                  );
                  console.log("selectedRoute", selectedRoute);
                  if (selectedRoute) {
                    // simulateTrip(selectedRoute.geometry.coordinates);
                    animateSmooth(selectedRoute.geometry.coordinates);
                  }
                });
              }
            });

            // Tambahkan popup ke marker
            const marker = new mapboxgl.Marker({
              element: (() => {
                const el = document.createElement("div");
                el.innerHTML = "🏥";
                el.style.fontSize = "24px";
                el.style.cursor = "pointer";
                return el;
              })(),
            })
              .setLngLat(hospital.coordinates)
              .setPopup(popup)
              .addTo(mapRef.current);

            // Simpan referensi untuk dihapus nanti
            hospitalMarkerRefs.push(marker);
          }

          // Gabungkan semua rute ke GeoJSON
          const routeGeoJSON = {
            type: "FeatureCollection",
            features,
          };

          // Tambahkan source dan layer garis
          mapRef.current.addSource("route", {
            type: "geojson",
            data: routeGeoJSON,
          });

          mapRef.current.addLayer({
            id: "route-line",
            type: "line",
            source: "route",
            layout: {
              "line-cap": "round",
              "line-join": "round",
            },
            paint: {
              "line-color": "#0000ff",
              "line-width": 4,
            },
          });
        } else {
          console.warn("❗ Tidak ada RS dalam radius isochrone.");
        }
      }
    } catch (err) {
      console.error("Gagal mengambil isochrone:", err);
    }
  };

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    let animationFrameId;
    let isKeyPressed = {};
    let startX, startY;
    let lastTap = 0; // Untuk double-tap reset view

    // Smooth keyboard movement
    const smoothMove = (key) => {
      if (!mapRef.current) return;

      const step = 1.5;

      switch (key) {
        case "ArrowUp":
          mapRef.current.setPitch(
            Math.min(mapRef.current.getPitch() + step, 85)
          );
          break;
        case "ArrowDown":
          mapRef.current.setPitch(
            Math.max(mapRef.current.getPitch() - step, 0)
          );
          break;
        case "ArrowLeft":
          mapRef.current.setBearing(mapRef.current.getBearing() - step);
          break;
        case "ArrowRight":
          mapRef.current.setBearing(mapRef.current.getBearing() + step);
          break;
        default:
          return;
      }

      if (isKeyPressed[key]) {
        animationFrameId = requestAnimationFrame(() => smoothMove(key));
      }
    };

    const handleKeyDown = (event) => {
      if (!isKeyPressed[event.key]) {
        isKeyPressed[event.key] = true;
        smoothMove(event.key);
      }
    };

    const handleKeyUp = (event) => {
      isKeyPressed[event.key] = false;
      cancelAnimationFrame(animationFrameId);
    };

    // TOUCH HANDLING
    const handleTouchStart = (event) => {
      if (event.touches.length === 1) {
        // Single finger swipe
        startX = event.touches[0].clientX;
        startY = event.touches[0].clientY;

        // Double Tap to Reset View
        const now = new Date().getTime();
        if (now - lastTap < 300) {
          mapRef.current.flyTo({
            center: [113.9213, -0.7893],
            zoom: 5,
            pitch: 0,
            bearing: 0,
          });
        }
        lastTap = now;
      } else if (event.touches.length === 2) {
        // Two-finger gesture (pitch change)
        const dx = event.touches[0].clientX - event.touches[1].clientX;
        const dy = event.touches[0].clientY - event.touches[1].clientY;
        startDist = Math.sqrt(dx * dx + dy * dy);
      }
    };

    const handleTouchMove = (event) => {
      if (!mapRef.current) return;

      if (event.touches.length === 1) {
        // SWIPE TO ROTATE
        const deltaX = event.touches[0].clientX - startX;
        mapRef.current.setBearing(mapRef.current.getBearing() - deltaX * 0.2);

        startX = event.touches[0].clientX;
      }
    };

    const handleTouchEnd = () => {
      startX = null;
      startY = null;
      startDist = null;
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    const mapContainer = document.getElementById("map");
    if (mapContainer) {
      mapContainer.addEventListener("touchstart", handleTouchStart, {
        passive: false,
      });
      mapContainer.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      mapContainer.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);

      if (mapContainer) {
        mapContainer.removeEventListener("touchstart", handleTouchStart);
        mapContainer.removeEventListener("touchmove", handleTouchMove);
        mapContainer.removeEventListener("touchend", handleTouchEnd);
      }

      cancelAnimationFrame(animationFrameId);
    };
  }, [mapRef.current]);

  // use effect untuk object
  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;

    setProvinceSelect(data);

    const geoJsonData = {
      type: "FeatureCollection",
      features: data.map((item) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [item.koordinat.lng, item.koordinat.lat],
        },
        properties: {
          id: item.id,
          nama: item.nama,
          imageUrl: item.imageUrl,
          latitude: item.koordinat.lat,
          longitude: item.koordinat.lng,
          jenis_kecelakaan: item.jenis_kecelakaan,
          created_at: item.created_at,
          ...item.lokasi,
        },
      })),
    };

    const loadMap = () => {
      // Cek apakah sumber "locations" sudah ada
      if (map.getSource("locations")) {
        // Perbarui data sumber jika sudah ada
        map.getSource("locations").setData(geoJsonData);
      } else {
        // Tambahkan sumber baru jika belum ada
        map.addSource("locations", {
          type: "geojson",
          data: geoJsonData,
        });
      }

      // Tambahkan layer untuk titik objek jika belum ada
      if (!map.getLayer("locations-layer")) {
        map.addLayer({
          id: "locations-layer",
          type: "circle",
          source: "locations",
          paint: {
            "circle-radius": 8, // Ukuran titik
            "circle-color": "#FF5733", // Warna titik
          },
        });
      }

      // Tambahkan layer untuk radius jika belum ada
      if (!map.getLayer("radius-layer")) {
        map.addLayer({
          id: "radius-layer",
          type: "circle",
          source: "locations",
          paint: {
            "circle-radius": radiusRef.current, // Radius
            "circle-color": `rgba(255, 87, 51, 0.4)`, // Transparansi statis
          },
        });
      }
    };

    const animateRadius = () => {
      let newRadius = radiusRef.current;

      // Mengubah arah radius (menambah/mengurangi)
      if (radiusDirectionRef.current === "increase") {
        newRadius += 1;
        if (newRadius > 60) {
          radiusDirectionRef.current = "decrease"; // Radius mencapai batas, maka mengecil
        }
      } else {
        newRadius -= 1;
        if (newRadius < 20) {
          radiusDirectionRef.current = "increase"; // Radius mencapai batas, maka membesar
        }
      }

      // Update nilai radius dan opacity
      radiusRef.current = newRadius;

      // Efek pulse - membuat radius sedikit lebih besar dan kecil dengan smooth
      const pulse = Math.sin(pulseEffectRef.current) * 5; // Memberikan efek pulse
      pulseEffectRef.current += 0.1; // Menambah efek setiap frame

      // Perbarui properti circle-radius dan opacity
      map.setPaintProperty("radius-layer", "circle-radius", newRadius + pulse);
      map.setPaintProperty(
        "radius-layer",
        "circle-color",
        `rgba(255, 87, 51, 0.4)`
      );

      // Memanggil lagi animasi jika perlu
      if (mapRef.current) {
        requestAnimationFrame(animateRadius);
      }
    };

    if (map.isStyleLoaded()) {
      loadMap();
      animateRadius();
    } else {
      map.once("style.load", () => {
        loadMap();
        animateRadius();
        console.log(map.getPaintProperty("locations-layer", "circle-color"));
      });
    }

    // Listen for click events on the Mapbox GL map
    const onClickHandler = async (e) => {
      // Menyaring fitur dalam bounding box yang ditentukan
      const features = mapRef.current.queryRenderedFeatures(e.point, {
        layers: ["locations-layer"], // Nama layer yang digunakan untuk titik lokasi
      });

      if (features.length > 0) {
        const feature = features[0]; // Mengambil fitur pertama yang ditemukan
        const properties = feature.properties;

        setProvinceSelect(
          data.filter((o) => o.lokasi?.provinsi === properties.provinsi) || data
        );

        setDataSelect(properties);

        showPopupWithContent(e.originalEvent, "Provinsi_Indonesia", properties);
        await fetchIsochrone(properties);
      } else {
        console.log("Tidak ada fitur yang ditemukan pada titik tersebut.");
      }
    };

    map.on("click", onClickHandler);
  }, [data, mapRef.current]);

  const generatePopupContent = (id, result) => {
    let content = "";
    // const formattedResult = result.map((item) => ({
    //   ...item,
    //   created_at: dayjs(item.created_at).format("DD MMMM YYYY HH:mm"),
    // }));

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
          : ""
      }
      <div class="ol-popup-satupeta-content">
            ${content || "<div>Tidak ada data</div>"}
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
    const popupElement = document.createElement("div");
    popupElement.className = "ol-popup-satupeta";
    popupElement.innerHTML = popupContent;

    // Hitung posisi popup berdasarkan event
    const mapContainer = mapRef.current.getContainer(); // Mendapatkan kontainer peta
    const mapRect = mapContainer.getBoundingClientRect(); // Mendapatkan bounding box kontainer peta
    const offsetX = originalEvent.clientX - mapRect.left; // Offset horizontal dalam kontainer peta
    const offsetY = originalEvent.clientY - mapRect.top; // Offset vertikal dalam kontainer peta

    // Pastikan popup diposisikan dengan benar dalam kontainer peta
    popupElement.style.position = "absolute";
    popupElement.style.left = `${offsetX}px`;
    popupElement.style.top = `${offsetY}px`;

    // Tambahkan popup ke body (atau ke dalam kontainer peta jika diinginkan)
    document.body.appendChild(popupElement);

    // Perbarui ref ke popup yang sedang aktif
    popupRef.current = popupElement;

    // Tambahkan event listener untuk tombol zoom
    const zoomButton = popupElement.querySelector(".zoom-button");
    if (zoomButton) {
      zoomButton.addEventListener("click", () =>
        handleZoomClick(longitude, latitude, popupElement)
      );
    }

    // Opsional, sembunyikan popup ketika pengguna menggerakkan mouse ke luar
    popupElement.addEventListener("mouseleave", () => {
      popupElement.style.display = "none";
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
    mapRef.current.once("moveend", () => {
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
  // useEffect(() => {
  //   if (!mapRef.current) {
  //     console.log("Map is not initialized yet");
  //     return;
  //   }

  //   const ZoomPitch = () => {
  //     if (isZoomingWithPopup) {
  //       return;
  //     }

  //     const zoomLevel = mapRef.current.getZoom();
  //     let targetPitch = 0;

  //     if (zoomLevel >= 5.8 && zoomLevel <= 10) {
  //       targetPitch = (zoomLevel - 8) * 22.5;
  //     } else if (zoomLevel > 10) {
  //       const pitchIncrement = (zoomLevel - 10) * 7.5;
  //       targetPitch = Math.min(45 + pitchIncrement, 60);
  //     }

  //     const currentMapPitch = mapRef.current.getPitch();
  //     if (targetPitch !== currentMapPitch) {
  //       mapRef.current.setPitch(targetPitch);
  //     }
  //   };

  //   mapRef.current.on("zoom", ZoomPitch); // Mendaftarkan event zoom

  //   // Hapus event listener saat komponen dibersihkan
  //   return () => {
  //     if (mapRef.current) {
  //       mapRef.current.off("zoom", ZoomPitch);
  //     }
  //   };
  // }, [mapRef.current, isZoomingWithPopup]);

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

    const selectedSource2 = Object.values(updatedMapSources).find(
      (source) => source.state
    );
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
      const newZoom = Math.min(
        mapRef.current.getZoom() + 0.5,
        mapRef.current.getMaxZoom()
      );
      mapRef.current.flyTo({
        center: mapRef.current.getCenter(),
        zoom: newZoom,
        pitch: currentPitch,
        duration: 300,
      });
      setCurrentZoom(newZoom);
    }

    mapRef.current.once("moveend", () => {
      setIsZoomingWithPopup(false); // Reset status zooming
    });
  };

  const handleZoomOut = () => {
    setIsZoomingWithPopup(true);
    if (mapRef.current) {
      const newZoom = Math.max(
        mapRef.current.getZoom() - 0.5,
        mapRef.current.getMinZoom()
      );
      mapRef.current.flyTo({
        center: mapRef.current.getCenter(),
        zoom: newZoom,
        pitch: currentPitch,
        duration: 300,
      });
      setCurrentZoom(newZoom);
    }
    mapRef.current.once("moveend", () => {
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
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function interpolatePos(from, to, t) {
    const lng = from[0] + (to[0] - from[0]) * t;
    const lat = from[1] + (to[1] - from[1]) * t;
    return [lng, lat];
  }

  let animationMarker = null;
  let animationId = null;

  const animateSmooth = (route, duration = 100000) => {
    const map = mapRef.current;
    if (!map || !route || route.length < 2) return;

    if (animationMarker) {
      animationMarker.remove();
      animationMarker = null;
    }
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }

    animationMarker = new mapboxgl.Marker({ color: "#1DB954" })
      .setLngLat(route[0])
      .addTo(map);

    // Posisi kamera awal
    map.flyTo({
      center: route[0],
      zoom: 19.5,
      pitch: 70,
      bearing: 0,
      speed: 1.4,
      curve: 1.5,
      essential: true,
    });

    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      const totalSegments = route.length - 1;
      const segmentDuration = duration / totalSegments;

      let currentSegment = Math.floor(elapsed / segmentDuration);
      let t = (elapsed % segmentDuration) / segmentDuration;

      if (currentSegment >= totalSegments) {
        animationMarker.setLngLat(route[route.length - 1]);
        return;
      }

      const from = route[currentSegment];
      const to = route[currentSegment + 1];
      const pos = interpolatePos(from, to, t);

      animationMarker.setLngLat(pos);

      // Hitung arah gerak
      const bearing = turf.bearing(turf.point(from), turf.point(to));

      // Kamera mengikuti dengan smooth easing dan durasi pendek
      map.easeTo({
        center: pos,
        zoom: 19.5,
        pitch: 70,
        bearing: bearing,
        duration: 80, // Lebih pendek = lebih responsif
        easing: (t) => t * t * (3 - 2 * t), // Smooth easing cubic
      });

      animationId = requestAnimationFrame(step);
    };

    animationId = requestAnimationFrame(step);
  };

  function simulateTrip(routeCoords, duration = 100000) {
    const map = mapRef.current;
    if (!map || !routeCoords || routeCoords.length < 2) return;

    let startTime = null;
    const totalSegments = routeCoords.length - 1;
    const segmentDuration = duration / totalSegments;

    const carEl = document.createElement("div");
    carEl.innerHTML = "🚗";
    carEl.style.fontSize = "24px";

    const carMarker = new mapboxgl.Marker(carEl)
      .setLngLat(routeCoords[0])
      .addTo(map);

    // Auto zoom dan center ke awal posisi
    map.flyTo({
      center: routeCoords[0],
      zoom: 19.5,
      pitch: 70,
      bearing: 0,
      speed: 1.4,
      curve: 1.5,
      essential: true,
    });

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      let currentSegment = Math.floor(elapsed / segmentDuration);
      let t = (elapsed % segmentDuration) / segmentDuration;

      if (currentSegment >= totalSegments) {
        carMarker.setLngLat(routeCoords[routeCoords.length - 1]);
        alert("🚗 Perjalanan selesai!");
        return;
      }

      const from = routeCoords[currentSegment];
      const to = routeCoords[currentSegment + 1];
      const pos = interpolatePos(from, to, t);

      carMarker.setLngLat(pos);

      const bearing = turf.bearing(turf.point(from), turf.point(to));

      map.easeTo({
        center: pos,
        zoom: 19.5,
        pitch: 70,
        bearing: bearing,
        duration: 80,
        easing: (t) => t * t * (3 - 2 * t),
      });

      requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  const openSidebarNasional = () => {
    setSidebar_content(true);
  };

  return (
    <div className="relative overflow-hidden">
      <div className="relative portals-openlayer h-screen w-screen">
        <div id="map" ref={mapRef} className="w-full h-full relative"></div>
        <div
          className="absolute text-white flex justify-end"
          style={{
            zIndex: "9",
            top: "22%",
            right: "5px",
            width: "450px",
            height: "450px",
            borderTopLeftRadius: "25px",
            borderBottomLeftRadius: "25px",
          }}
        >
          <div className="w-full h-full relative flex flex-col items-end">
            {/* Maps Section */}
            {/* <div
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
            </div> */}
            {/* Zoom In */}
            <div
              className="w-[46px] h-[50px] bg-black bg-opacity-50"
              onClick={handleZoomIn}
            >
              <div className="flex justify-center items-center p-2">
                <Tooltip title="Zoom In" placement="left">
                  <BiZoomIn size={25} className="cursor-pointer" />
                </Tooltip>
              </div>
            </div>
            {/* Zoom Out */}
            <div
              className="flex flex-col w-[46px] h-[50px] bg-black bg-opacity-50"
              onClick={handleZoomOut}
            >
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
                  mapRef.current.once("moveend", () => {
                    setIsZoomingWithPopup(false); // Reset status zooming
                  });
                }
              }}
            >
              <div className="flex justify-between items-center p-2">
                <Tooltip title="Zoom Out ke Peta" placement="left">
                  <BiWorld size={25} className="cursor-pointer" />
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
        {/* Sidebar Left (Statistik)*/}
        {!sidebar_content && (
          <div
            className="absolute text-white flex justify-end"
            style={{
              zIndex: "9",
              top: "30%",
              left: "0px",
              height: "450px",
              borderTopLeftRadius: "25px",
              borderBottomLeftRadius: "25px",
            }}
          >
            {/*Menu */}
            <div className="flex flex-col relative">
              <div className="flex flex-col absolute rounded-xl transition-all duration-300 ease-in-out w-[25px] h-[100px] bg-black/50 top-0 left-2">
                <div
                  onClick={openSidebarNasional}
                  className="flex justify-between items-center h-full px-1"
                >
                  <Tooltip title="Produksi Nasional" placement="right">
                    <MdKeyboardDoubleArrowRight />
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <SidebarContent
        sidebar_content={sidebar_content}
        setSidebar_content={setSidebar_content}
        data={dataProvince}
        dataSelect={dataSelect}
      />
    </div>
  );
};

export default MapboxExample;
