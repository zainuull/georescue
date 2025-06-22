import { useEffect, useRef, useState } from "react";
import Map from "ol/Map";
import View from "ol/View";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { fromLonLat } from "ol/proj";
import { Fill, Stroke, Style } from "ol/style";
import GeoJSON from "ol/format/GeoJSON";
import "./map.css";
import { geoJsonKab, geoJsonProvince } from "./data/geo_json";
import { formatNumber } from "@/core/services/convert";
import { ToastifyService } from "@/core/services/Toastify/toastifyService";

const hoverStyle = new Style({
  fill: new Fill({ color: "rgba(29, 78, 216, 0.6)" }), // lebih tebal
  stroke: new Stroke({ color: "#1d4ed8", width: 3 }), // lebih tebal
});

function generateLegend(data, colors) {
  if (!Array.isArray(data)) return [];

  // Ambil data yang valid
  const validData = data.filter((item) => {
    const hasValidProvince = item.nama_kabupaten || item.kabkot;
    const jumlah = item.JUMLAH ?? item.jumlah_koperasi ?? item.jumlah;
    return hasValidProvince && typeof jumlah === "number";
  });

  if (validData.length === 0) return [];

  // Ambil semua nilai numerik (tanpa 0 dulu)
  const values = validData
    .map((item) => item.JUMLAH ?? item.jumlah_koperasi ?? item.jumlah)
    .filter((v) => v > 0)
    .sort((a, b) => a - b);

  const min = values[0] ?? 1; // fallback kalau semua datanya 0
  const max = values[values.length - 1] ?? 1;

  // Kurangi 1 karena color[0] akan kita pakai khusus untuk 0
  const rangeSize = Math.ceil((max - min + 1) / (colors.length - 1));

  const legend = [];

  // Tambahkan legend khusus untuk 0
  legend.push({ label: "0", color: "#C8C8C8" }); // warna untuk 0

  for (let i = 1; i < colors.length; i++) {
    const start = min + (i - 1) * rangeSize;
    const end = start + rangeSize - 1;

    let label;
    if (i === colors.length - 1) {
      label = `> ${start - 1}`;
    } else {
      label = `${start} - ${end}`;
    }

    legend.push({ label, color: colors[i] });
  }

  return legend;
}

function getColorFromLegend(legend, count) {
  if (count === 0) {
    return legend.find((l) => l.label === "0")?.color || "#C8C8C8";
  }

  for (const { label, color } of legend) {
    if (label.includes(" - ")) {
      const [start, end] = label.split(" - ").map(Number);
      if (count >= start && count <= end) return color;
    } else if (label.includes(">")) {
      const min = Number(label.replace("> ", ""));
      if (count > min) return color;
    }
  }

  return "#F0F0F0"; // fallback
}

const colors = [
  "#C8C8C8", // khusus untuk 0 (harus sesuai dengan legend push pertama)
  "#ADD8E6",
  "#87C6E0",
  "#5DB0D8",
  "#368CC2",
  "#1E5F9C",
];

function CityMap({ namaProvinsi, dataSebaran, setSelectMap }) {
  const mapRef = useRef();
  const mapInstanceRef = useRef(null);
  const currentFeatureRef = useRef(null);
  const hoveredFeatureRef = useRef(null);
  const originalStyleRef = useRef(null);
  const selectedFeatureRef = useRef(null);
  const hoverPopupRef = useRef(null);
  const clickPopupRef = useRef(null);
  const [legend, setLegend] = useState([]);
  const toastifyService = new ToastifyService();

  useEffect(() => {
    const list = generateLegend(dataSebaran, colors);
    setLegend(list);
  }, [dataSebaran]);

  // useEffect(() => {
  //   // Setiap kali selected berubah (termasuk dari satu kabupaten ke kabupaten lain)
  //   if (hoverPopupRef.current) hoverPopupRef.current.style.display = "none";
  //   if (clickPopupRef.current) clickPopupRef.current.style.display = "none";
  //   if (popupRef.current) popupRef.current.style.display = "none";

  //   if (selectedFeatureRef.current && originalStyleRef.current) {
  //     selectedFeatureRef.current.setStyle(originalStyleRef.current);
  //     selectedFeatureRef.current = null;
  //     originalStyleRef.current = null;
  //   }

  //   currentFeatureRef.current = null;
  //   hoveredFeatureRef.current = null;
  // }, [selected]);

  // useEffect(() => {
  //   const popupElement = document.createElement("div");
  //   popupElement.className = "ol-popup";

  //   const popupContent = document.createElement("div");
  //   popupContent.className = "ol-popup-content";
  //   popupContent.style.width = "200px";
  //   popupContent.style.height = "auto";

  //   popupElement.appendChild(popupContent);
  //   popupRef.current = popupElement;

  //   const mapContainer = mapRef.current;
  //   if (mapContainer && mapContainer.parentNode) {
  //     mapContainer.parentNode.appendChild(popupElement);
  //   }

  //   return () => {
  //     if (popupElement.parentNode) {
  //       popupElement.parentNode.removeChild(popupElement);
  //     }
  //   };
  // }, []);

  useEffect(() => {
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = new Map({
        target: mapRef.current,
        layers: [],
        controls: [], // Hapus semua kontrol (termasuk zoom)
        view: new View({
          center: fromLonLat([117.5467, -2.8251]),
          zoom: 7.5,
          minZoom: 7.5, // Mengatur batas zoom minimum
          maxZoom: 7.5, // Mengatur batas zoom maksimum
        }),
      });
    }

    loadData();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.setTarget(null);
        mapInstanceRef.current = null;
      }
    };
  }, [legend, dataSebaran]);

  // Function to get district data by name
  const getDistrictData = (districtName) => {
    const lowerInput = districtName?.toLowerCase?.();

    const district = dataSebaran?.find((item) => {
      const name1 = item?.nama_kabupaten?.toLowerCase?.();
      const name2 = item?.kabkot?.toLowerCase?.();
      return name1 === lowerInput || name2 === lowerInput;
    });

    return district || { nama_kabupaten: districtName, jumlah: 0 };
  };

  const loadData = async () => {
    if (!mapInstanceRef.current) {
      return;
    }
    toastifyService.showLoading();

    try {
      const layers = mapInstanceRef.current.getLayers().getArray();
      for (let i = layers.length - 1; i >= 0; i--) {
        if (layers[i] instanceof VectorLayer) {
          mapInstanceRef.current.removeLayer(layers[i]);
        }
      }

      for (const provinceFile of geoJsonProvince) {
        if (!provinceFile?.url) continue;

        const response = await fetch(provinceFile.url);

        if (!response.ok) {
          console.error(
            `Failed to fetch province data: ${response.statusText}`
          );
          continue;
        }

        const data = await response.json();

        const geojson = new GeoJSON();
        const features = geojson.readFeatures(data, {
          dataProjection: "EPSG:4326",
          featureProjection: "EPSG:3857",
        });

        const filteredFeatures = features.filter((feature) => {
          const properties = feature.getProperties();
          const provinsiName = namaProvinsi?.replace(/%20/g, " ").toLowerCase();
          return provinsiName === properties?.WADMPR?.toLowerCase();
        });

        if (filteredFeatures.length > 0) {
          const provinceSource = new VectorSource({
            features: filteredFeatures,
          });

          mapInstanceRef.current.getView().fit(provinceSource.getExtent(), {
            padding: [50, 50, 50, 50], // Add some padding around the extent
            duration: 1000, // Animation duration in ms
            maxZoom: 8, // Optional: Set maximum zoom level to prevent too close view
          });

          const detailInfo = filteredFeatures[0].getProperties();
          const kdppum = detailInfo?.KDPPUM;

          const dataKabupaten = geoJsonKab?.find(
            (kab) => kab.code_prov === kdppum
          );

          if (dataKabupaten && dataKabupaten?.geo_json_prov) {
            const allKabFeatures = [];

            for (const geoJsonEntry of dataKabupaten.geo_json_prov) {
              try {
                const kabResponse = await fetch(geoJsonEntry.url);
                if (!kabResponse.ok) {
                  console.error(
                    `Failed to fetch kabupaten data from ${geoJsonEntry.url}: ${kabResponse.statusText}`
                  );
                  continue;
                }

                const kabFeatures = await kabResponse.json();
                const features = new GeoJSON().readFeatures(kabFeatures, {
                  dataProjection: "EPSG:4326",
                  featureProjection: "EPSG:3857",
                });

                // Apply individual styles
                features.forEach((feature) => {
                  const properties = feature.getProperties();
                  const namaWilayah =
                    properties?.WADMKK || properties?.WADMKC || "N/A";
                  const namaLengkap = namaWilayah.toUpperCase();

                  const districtData = getDistrictData(namaLengkap);
                  feature.setStyle(
                    new Style({
                      fill: new Fill({
                        color: getColorFromLegend(
                          legend,
                          districtData.jumlah || districtData?.jumlah_penduduk
                        ),
                      }),
                      stroke: new Stroke({ color: "#1d4ed8", width: 1.5 }),
                    })
                  );
                });

                allKabFeatures.push(...features); // Kumpulkan semua fitur

                const kabSource = new VectorSource({
                  features,
                });

                const kabLayer = new VectorLayer({
                  source: kabSource,
                });

                mapInstanceRef.current.addLayer(kabLayer);
              } catch (error) {
                console.error("Error loading kabupaten data:", error);
              }
            }

            // Setelah semua kabupaten dimuat, fit view ke semua fitur
            if (allKabFeatures.length > 0) {
              const allFeaturesSource = new VectorSource({
                features: allKabFeatures,
              });

              mapInstanceRef.current
                .getView()
                .fit(allFeaturesSource.getExtent(), {
                  padding: [50, 50, 50, 50],
                  duration: 1000,
                  maxZoom: 9, // Ubah sesuai kebutuhan agar tidak terlalu zoom-in
                });
            }
          }

          break;
        }
      }

      toastifyService.close();
    } catch (error) {
      console.error("Error in loadData:", error);
    }
  };

  const showPopup = (coordinate, feature, ref) => {
    if (!ref.current || !mapInstanceRef.current) return;

    const pixel = mapInstanceRef.current.getPixelFromCoordinate(coordinate);

    const properties = feature.getProperties();
    const namaWilayah = properties?.WADMKK || properties?.WADMKC || "N/A";
    const namaLengkap = namaWilayah.toUpperCase();

    const findSebaran = dataSebaran?.find((item) => {
      const itemName = (
        item?.nama_kabupaten ||
        item?.kabkot ||
        ""
      ).toLowerCase();

      const districtName = (namaLengkap || "").toLowerCase();

      return itemName === districtName;
    });

    ref.current.innerHTML = `
    <div class="popup-card">
      <h4 class="font-bold">${namaLengkap}</h4>
      <p>Jumlah Data: ${formatNumber(
        findSebaran?.jumlah || findSebaran?.jumlah_penduduk || 0
      )}</p>
    </div>
  `;
    ref.current.style.display = "block";
    ref.current.style.left = `${pixel[0]}px`;
    ref.current.style.top = `${pixel[1]}px`;
  };

  useEffect(() => {
    if (!mapInstanceRef.current) return;

    const pointerMoveHandler = (event) => {
      if (!hoverPopupRef.current) return;

      const feature = mapInstanceRef.current.forEachFeatureAtPixel(
        mapInstanceRef.current.getEventPixel(event.originalEvent),
        (feature) => feature
      );

      // Jangan override jika sedang memilih
      if (
        hoveredFeatureRef.current &&
        hoveredFeatureRef.current !== feature &&
        hoveredFeatureRef.current !== selectedFeatureRef.current &&
        originalStyleRef.current
      ) {
        hoveredFeatureRef.current.setStyle(originalStyleRef.current);
        hoveredFeatureRef.current = null;
        originalStyleRef.current = null;
      }

      // Tampilkan hover hanya jika bukan feature yang dipilih
      if (
        feature &&
        feature !== currentFeatureRef.current &&
        feature !== selectedFeatureRef.current
      ) {
        currentFeatureRef.current = feature;

        originalStyleRef.current = feature.getStyle();
        feature.setStyle(hoverStyle);
        hoveredFeatureRef.current = feature;

        showPopup(event.coordinate, feature, hoverPopupRef);
      } else if (!feature) {
        // Hilangkan style hover
        if (
          hoveredFeatureRef.current &&
          hoveredFeatureRef.current !== selectedFeatureRef.current &&
          originalStyleRef.current
        ) {
          hoveredFeatureRef.current.setStyle(originalStyleRef.current);
          hoveredFeatureRef.current = null;
          originalStyleRef.current = null;
        }

        // Sembunyikan popup hover
        if (hoverPopupRef.current) {
          hoverPopupRef.current.style.display = "none";
        }

        currentFeatureRef.current = null;
      }
    };

    // Add click handler for more detailed popup
    const clickHandler = (event) => {
      const feature = mapInstanceRef.current.forEachFeatureAtPixel(
        mapInstanceRef.current.getEventPixel(event.originalEvent),
        (feature) => feature
      );

      if (feature) {
        // Reset style fitur yang dipilih sebelumnya
        if (
          selectedFeatureRef.current &&
          selectedFeatureRef.current !== feature
        ) {
          selectedFeatureRef.current.setStyle(originalStyleRef.current);
        }

        // Simpan fitur yang diklik
        selectedFeatureRef.current = feature;

        // Set hoverStyle
        feature.setStyle(hoverStyle);

        // Tampilkan popup
        showPopup(event.coordinate, feature, clickPopupRef);

        const properties = feature.getProperties();
        const namaWilayah = properties?.WADMKK || properties?.WADMKC || "N/A";
        const namaLengkap = namaWilayah.toUpperCase();

        setSelectMap({ ...properties, namaLengkap });

        const extent = feature.getGeometry().getExtent();
        mapInstanceRef.current.getView().fit(extent, {
          padding: [50, 50, 50, 50],
          duration: 500,
        });
      } else {
        if (selectedFeatureRef.current && originalStyleRef.current) {
          selectedFeatureRef.current.setStyle(originalStyleRef.current);
        }
        selectedFeatureRef.current = null;
        clickPopupRef.current.style.display = "none";
      }
    };

    mapInstanceRef.current.on("pointermove", pointerMoveHandler);
    mapInstanceRef.current.on("click", clickHandler);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.un("pointermove", pointerMoveHandler);
        mapInstanceRef.current.un("click", clickHandler);
      }
    };
  }, [mapInstanceRef.current, legend, dataSebaran]);

  const LegendMarker = () => (
    <div className="w-40">
      <h5 className="mb-2 text-sm font-semibold">Legenda</h5>
      <ul className="m-0 list-none">
        {legend?.map((item, index) => (
          <li key={index} className="mb-2 flex items-center">
            <div
              className="w-3 h-3 mr-2 border"
              style={{ backgroundColor: item.color }}
            ></div>
            <span className="text-xs">{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div
      className="relative flex flex-col items-center"
      style={{
        width: "100%",
        height: "500px",
      }}
    >
      <div
        className="relative"
        style={{
          width: "80%",
          height: "100%",
        }}
      >
        <div
          ref={mapRef}
          className="map-container"
          style={{
            width: "100%",
            height: "100%",
          }}
        />
        <div
          ref={hoverPopupRef}
          className="ol-popup hover-popup"
          style={{ position: "absolute", display: "none" }}
        />
        <div
          ref={clickPopupRef}
          className="ol-popup click-popup"
          style={{ position: "absolute", display: "none" }}
        />
      </div>

      {legend?.length && (
        <div className="absolute top-2 right-4 bg-black/40 text-white p-2">
          {LegendMarker()}
        </div>
      )}
    </div>
  );
}

export default CityMap;
