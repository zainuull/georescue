"use client";
import axios from "axios";
import { useState } from "react";
import "../../globals.css";
import { UploadImage } from "@/app/(components)/uploadImage";
import PopUp from "@/app/(components)/PopUp";
import { useRouter } from "next/navigation";

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  headers: headers,
});

  const token = process.env.NEXT_PUBLIC_TOKEN_MAPBOX;

const Form = () => {
  const [nama, setNama] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [dataInput, setDataInput] = useState({
    imageUrl: "",
    public_id: "",
  });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [jenisKecelakaan, setJenisKecelakaan] = useState("");

  // Function to handle getting location from browser
  const handleLacak = (e) => {
    e.preventDefault();
    setShow(true);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const location = await reverseGeocodeMapbox(lat, lng);
    const payload = {
      nama: nama,
      koordinat: { lat, lng },
      imageUrl: dataInput.imageUrl,
      public_id: dataInput.public_id,
      jenis_kecelakaan: jenisKecelakaan,
      lokasi: location,
    };

    const res = await instance
      .post("/api/location", payload)
      .then((res) => {
        alert("Lokasi berhasil ditambahkan!");
        router.push("/");
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
        setLoading(false);
      });
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

      // Format output
      // console.log(`Kode Pos: ${hasil.kodePos}`);
      // console.log(`Kecamatan/Desa: ${hasil.kecamatan}`);
      // console.log(`Kota: ${hasil.kota}`);
      // console.log(`Provinsi: ${hasil.provinsi}`);
      // console.log(`Negara: ${hasil.negara}`);

      return hasil;
    } catch (error) {
      console.error("Gagal melakukan reverse geocoding:", error);
      return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-8 space-y-8">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Tambah Lokasi Kecelakaan
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nama */}
          <div className="flex flex-col">
            <label htmlFor="nama" className="font-medium text-gray-700 mb-2">
              Nama korban
            </label>
            <input
              id="nama"
              type="text"
              placeholder="Masukkan nama korban"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Jenis kecelakaan */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="jenisKecelakaan"
              className="mb-2 font-medium text-sm text-gray-700"
            >
              Jenis Kecelakaan
            </label>
            <select
              id="jenisKecelakaan"
              value={jenisKecelakaan}
              onChange={(e) => setJenisKecelakaan(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>
                -- Pilih Jenis Kecelakaan --
              </option>
              <option value="tunggal">Kecelakaan Tunggal</option>
              <option value="motor">Kecelakaan Motor</option>
              <option value="mobil">Kecelakaan Mobil</option>
            </select>
          </div>

          {/* Upload Gambar */}
          <div className="flex flex-col">
            <label
              htmlFor="uploadImage"
              className="font-medium text-gray-700 mb-2"
            >
              Upload Gambar <span className="text-red-500">*</span>
            </label>
            <UploadImage setDataInput={setDataInput} dataInput={dataInput} />
          </div>

          {/* Latitude */}
          {/* <div className="flex flex-col">
            <label htmlFor="lat" className="font-medium text-gray-700 mb-2">
              Latitude
            </label>
            <input
              id="lat"
              type="number"
              step="any"
              placeholder="Contoh: -6.200000"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div> */}

          {/* Longitude */}
          {/* <div className="flex flex-col">
            <label htmlFor="lng" className="font-medium text-gray-700 mb-2">
              Longitude
            </label>
            <input
              id="lng"
              type="number"
              step="any"
              placeholder="Contoh: 106.816666"
              value={lng}
              onChange={(e) => setLng(e.target.value)}
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div> */}

          {/* Button: Cari Koordinat */}
          <button
            type="button"
            onClick={handleLacak}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Cari Koordinat
          </button>

          {/* PopUp */}
          {show && (
            <>
              <div
                className="fixed top-0 left-0 w-full h-full bg-black/50 z-40"
                onClick={handleClose}
              />

              <PopUp
                lat={lat}
                lng={lng}
                handleClose={handleClose}
                setLat={setLat}
                setLng={setLng}
                setShow={setShow}
              />
            </>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {loading ? "Loading..." : "Simpan Lokasi"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
