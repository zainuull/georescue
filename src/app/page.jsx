'use client';
// import dynamic from 'next/dynamic';
// import ToastNotify from '@/core/services/notify/toast';
import './globals.css';
// import { useEffect, useState } from 'react';
// import axios from 'axios';

// const Map3D = dynamic(() => import('./(components)/map3d'), { ssr: false });

// const headers = {
//   'Content-Type': 'application/json',
//   Accept: 'application/json',
// };

// const instance = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
//   headers: headers,
// });

export default function Home() {
  // const [data, setData] = useState([]);

  // // Mengambil data saat komponen dimuat
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await instance.get('/api/location');
  //       setData(response.data?.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div>
      <h1>Hello World</h1>
      {/* <Map3D data={data} />
      <ToastNotify /> */}
    </div>
  );
}
