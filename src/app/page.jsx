'use client';
import dynamic from 'next/dynamic';
import ToastNotify from '@/core/services/notify/toast';
import './globals.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Map3D = dynamic(() => import('../pages/components/map3d'), { ssr: false });

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  headers: headers,
});

export default function Home() {
  const [data, setData] = useState([]); // Menyimpan data yang didapat
  const [loading, setLoading] = useState(true); // Menyimpan status loading
  const [error, setError] = useState(null); // Menyimpan error jika ada

  // Mengambil data saat komponen dimuat
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get('/api/location');
        setData(response.data?.data);
        setLoading(false);
      } catch (err) {
        setError('Gagal mengambil data'); // Menangani error
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Map3D data={data} />
      <ToastNotify />
    </div>
  );
}
