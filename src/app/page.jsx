"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import ToastNotify from "@/core/services/notify/toast";
import axios from "axios";

// Komponen hanya dirender di client
const Map3D = dynamic(() => import("./(components)/map3d"), { ssr: false });

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  headers,
});

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get("/api/location");
        setData(response.data?.data || []);
      } catch (error) {
        console.error("Gagal ambil data:", error);
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
