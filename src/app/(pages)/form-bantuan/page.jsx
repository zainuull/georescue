'use client';
import axios from 'axios';
import { useState } from 'react';
import '../../globals.css';
import { UploadImage } from '@/app/(components)/uploadImage';
import PopUp from '@/app/(components)/PopUp';
import { redirect } from 'next/navigation';

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  headers: headers,
});

const Form = () => {
  const [nama, setNama] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [dataInput, setDataInput] = useState({
    imageUrl: '',
    public_id: '',
  });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const router = useRouter();

  // Function to handle getting location from browser
  const handleLacak = (e) => {
    e.preventDefault();
    setShow(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      nama: nama,
      koordinat: { lat, lng },
      imageUrl: dataInput.imageUrl,
      public_id: dataInput.public_id,
    };

    try {
      const res = await instance.post('/api/location', payload);
      alert('Lokasi berhasil ditambahkan!');
      redirect('/');
    } catch (err) {
      console.log('err', err);
      alert('Gagal menambahkan lokasi.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Lokasi Pengguna</h1>

      {/* Form Input */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col">
          <label htmlFor="nama" className="font-medium text-sm mb-1">
            Nama
          </label>
          <input
            id="nama"
            type="text"
            placeholder="Nama"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            required
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-y-1 text-xs xl:text-sm">
          <label htmlFor="uploadImage" className="font-medium">
            Upload Image<span className="text-red-600">*</span>
          </label>
          <UploadImage setDataInput={setDataInput} dataInput={dataInput} />
        </div>

        <div className="flex flex-col">
          <label htmlFor="lat" className="font-medium text-sm mb-1">
            Latitude
          </label>
          <input
            id="lat"
            type="number"
            step="any"
            placeholder="Latitude"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            required
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="lng" className="font-medium text-sm mb-1">
            Longitude
          </label>
          <input
            id="lng"
            type="number"
            step="any"
            placeholder="Longitude"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            required
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={(e) => handleLacak(e)}
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Cari Koordinat
        </button>

        {show && (
          <>
            {/* Overlay */}
            <div
              className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40"
              onClick={handleClose}></div>
            {/* Popup */}
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

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Tambahkan Lokasi
        </button>
      </form>
    </div>
  );
};

export default Form;
