import dynamic from "next/dynamic";
import ToastNotify from "@/core/services/notify/toast";
import axios from "axios";

// Map3D tetap di-load di client jika butuh akses window/document
const Map3D = dynamic(() => import("./(components)/map3d"), { ssr: false });

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  headers: headers,
});

// Ini adalah SERVER COMPONENT karena tidak pakai 'use client'
export default async function Home() {
  let data = [];

  try {
    const response = await instance.get("/api/location");
    data = response.data?.data || [];
  } catch (error) {
    console.error("Gagal ambil data:", error);
  }



  return (
    <div>
      <Map3D data={data} />
      <ToastNotify />
    </div>
  );
}
