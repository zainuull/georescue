"use client";
import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import { Tooltip } from "@mui/material";
import "./style.css";
import { hospitalList, initialMapSourcesMapbox } from "./data/mapSourcesMapbox";
import MapAccordion from "./mapAccordion";
import { BiWorld, BiZoomIn, BiZoomOut } from "react-icons/bi";
import { FaRegMap } from "react-icons/fa";
import { dataPopup } from "./data/dataPopup";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import axios from "axios";
import inside from "@turf/boolean-point-in-polygon";
import { point } from "@turf/helpers";

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
  let hospitalMarkerRef = null;

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

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, [token, currentMap]);

  const fetchHospitals = async () => {
    try {
      const res = await axios.get("/hospitals/jabar.json");
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
      const hospitalList = await fetchHospitals(); // 🔥 ambil dari API lokal

      let nearestHospital = null;
      for (const contour of geojson.features) {
        for (const hospital of hospitalList) {
          const hospitalPoint = point(hospital.coordinates); // pastikan [lng, lat]
          if (inside(hospitalPoint, contour)) {
            nearestHospital = hospital;
            break;
          }
        }
        if (nearestHospital) break;
      }

      console.log("nearestHospital", nearestHospital);

      if (nearestHospital) {
        const routeUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${userCoords.join(
          ","
        )};${nearestHospital.coordinates.join(
          ","
        )}?geometries=geojson&access_token=${token}`;

        const routeRes = await axios.get(routeUrl);
        const routeGeoJSON = {
          type: "Feature",
          geometry: routeRes.data.routes[0].geometry,
        };

        // Tambahkan atau update layer rute
        if (mapRef.current.getSource("route")) {
          mapRef.current.getSource("route").setData(routeGeoJSON);
        } else {
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
        }

        // Tambah marker RS
        // Hapus marker RS sebelumnya jika ada
        if (hospitalMarkerRef) {
          hospitalMarkerRef.remove();
        }

        // Tambah marker RS baru
        const newHospitalMarker = new mapboxgl.Marker({
          element: (() => {
            const el = document.createElement("div");
            el.innerHTML = "🏥";
            el.style.fontSize = "24px";
            el.style.cursor = "pointer";
            return el;
          })(),
        })
          .setLngLat(nearestHospital.coordinates)
          .setPopup(
            new mapboxgl.Popup().setDOMContent(
              (() => {
                const popupDiv = document.createElement("div");
                popupDiv.textContent = `RS Terdekat: ${nearestHospital.name}`;
                popupDiv.style.color = "black";
                popupDiv.style.fontWeight = "bold";
                return popupDiv;
              })()
            )
          )
          .addTo(mapRef.current);

        // Simpan referensinya
        hospitalMarkerRef = newHospitalMarker;
      } else {
        console.warn("❗ Tidak ada RS dalam radius isochrone.");
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

        console.log("properties:", properties);
        showPopupWithContent(e.originalEvent, "Provinsi_Indonesia", properties);
        await fetchIsochrone(properties);
      } else {
        console.log("Tidak ada fitur yang ditemukan pada titik tersebut.");
      }
    };

    map.on("click", onClickHandler);
  }, [data, mapRef.current]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    map.on("load", () => {
      // Tambahkan NavigationControl hanya jika belum ada
      if (
        !document.querySelector(".mapboxgl-ctrl-top-right .mapboxgl-ctrl-group")
      ) {
        const nav = new mapboxgl.NavigationControl();
        map.addControl(nav, "top-right");

        // Tambahkan margin-top setelah kontrol ditambahkan
        setTimeout(() => {
          const controls = document.querySelector(".mapboxgl-ctrl-top-right");
          if (controls) {
            controls.style.marginTop = "75px";
          }
        }, 0);
      }

      map.addControl(new mapboxgl.FullscreenControl(), "bottom-left");
    });
  }, [mapRef.current]);

  const generatePopupContent = (id, result) => {
    let content = "";

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
  useEffect(() => {
    if (!mapRef.current) {
      console.log("Map is not initialized yet");
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

    mapRef.current.on("zoom", ZoomPitch); // Mendaftarkan event zoom

    // Hapus event listener saat komponen dibersihkan
    return () => {
      if (mapRef.current) {
        mapRef.current.off("zoom", ZoomPitch);
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

  return (
    <div className="relative overflow-hidden">
      <div className="relative portals-openlayer h-screen w-screen">
        <div id="map" ref={mapRef} className="w-full h-full relative"></div>
        <div
          className="absolute text-white flex justify-end"
          style={{
            zIndex: "999",
            top: "22%",
            right: "0px",
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
      </div>
    </div>
  );
};

export default MapboxExample;
