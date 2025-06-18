import React, { useMemo, useState } from "react";
import CityMap from "./city.map";
import DynamicTableDB from "./DynamicTable";
import { formatNumber,capitalizeTheFirstLetterOfEachWord } from "../../core/services/convert";
import Divider from '@mui/material/Divider';

const dataSebaran = [
  { id: 3201, nama_kabupaten: "Kabupaten Bogor", jumlah: 128 },
  { id: 3202, nama_kabupaten: "Kabupaten Sukabumi", jumlah: 85 },
  { id: 3203, nama_kabupaten: "Kabupaten Cianjur", jumlah: 73 },
  { id: 3204, nama_kabupaten: "Kabupaten Bandung", jumlah: 142 },
  { id: 3205, nama_kabupaten: "Kabupaten Garut", jumlah: 90 },
  { id: 3206, nama_kabupaten: "Kabupaten Tasikmalaya", jumlah: 78 },
  { id: 3207, nama_kabupaten: "Kabupaten Ciamis", jumlah: 65 },
  { id: 3208, nama_kabupaten: "Kabupaten Kuningan", jumlah: 58 },
  { id: 3209, nama_kabupaten: "Kabupaten Cirebon", jumlah: 101 },
  { id: 3210, nama_kabupaten: "Kabupaten Majalengka", jumlah: 47 },
  { id: 3211, nama_kabupaten: "Kabupaten Sumedang", jumlah: 52 },
  { id: 3212, nama_kabupaten: "Kabupaten Indramayu", jumlah: 112 },
  { id: 3213, nama_kabupaten: "Kabupaten Subang", jumlah: 96 },
  { id: 3214, nama_kabupaten: "Kabupaten Purwakarta", jumlah: 66 },
  { id: 3215, nama_kabupaten: "Kabupaten Karawang", jumlah: 134 },
  { id: 3216, nama_kabupaten: "Kabupaten Bekasi", jumlah: 190 },
  { id: 3271, nama_kabupaten: "Kota Bogor", jumlah: 110 },
  { id: 3272, nama_kabupaten: "Kota Sukabumi", jumlah: 45 },
  { id: 3273, nama_kabupaten: "Kota Bandung", jumlah: 212 },
  { id: 3274, nama_kabupaten: "Kota Cirebon", jumlah: 70 },
  { id: 3275, nama_kabupaten: "Kota Bekasi", jumlah: 198 },
  { id: 3276, nama_kabupaten: "Kota Depok", jumlah: 180 },
  { id: 3277, nama_kabupaten: "Kota Cimahi", jumlah: 65 },
  { id: 3278, nama_kabupaten: "Kota Tasikmalaya", jumlah: 77 },
  { id: 3279, nama_kabupaten: "Kota Banjar", jumlah: 32 }
];

const jenisKecelakaan = [
  "Kecelakaan Tunggal",
];
const namaKelurahan = [
  { nama: "Kelurahan Sukamaju", lat: -6.9012, lng: 107.6123 },
  { nama: "Kelurahan Mekarsari", lat: -6.9204, lng: 107.6111 },
  { nama: "Kelurahan Babakan", lat: -6.905, lng: 107.62 },
  { nama: "Kelurahan Cigadung", lat: -6.89, lng: 107.63 },
  { nama: "Kelurahan Gegerkalong", lat: -6.88, lng: 107.615 },
];


const namaKorban = [
  "Andi Saputra",
  "Siti Aminah",
  "Dedi Mulyadi",
  "Rina Kartika",
  "Budi Santoso",
  "Lina Marlina",
  "Ahmad Zaki",
  "Putri Ayu",
  "Fajar Nugroho",
  "Yuni Permata"
];


const generateDetailSebaran = (sebaran) => {
  const result = [];

  sebaran.forEach((item) => {
    for (let i = 0; i < item.jumlah; i++) {
      const kelurahan = namaKelurahan[Math.floor(Math.random() * namaKelurahan.length)];
      const korban = namaKorban[Math.floor(Math.random() * namaKorban.length)];
      const jenis = jenisKecelakaan[Math.floor(Math.random() * jenisKecelakaan.length)];

      result.push({
        id: `${item.id}-${i + 1}`,
        nama_kabupaten: item.nama_kabupaten,
        nama_kelurahan: kelurahan.nama,
        lat: kelurahan.lat,
        lng: kelurahan.lng,
        nama_korban: korban,
        jenis_kecelakaan: jenis,
        waktu: `2024-${String(Math.floor(Math.random() * 9 + 1)).padStart(2, "0")}-${String(
          Math.floor(Math.random() * 28 + 1)
        ).padStart(2, "0")}`,
      });
    }
  });

  return result;
};


const dataDetailSebaran = generateDetailSebaran(dataSebaran);


const StatistikContent = ({ data, setSelectData }) => {
  const [selectMap,setSelectMap] = useState(null)


const resultDataDetail = useMemo(() => {
  if (!selectMap?.KDPKAB) return [];
  return dataDetailSebaran.filter(
    (item) => item.id.split("-")[0] === String(selectMap.KDPKAB)
  );
}, [dataDetailSebaran, selectMap?.KDPKAB]);
  console.log('selectMap,',selectMap)
  return (
<aside
  className={`w-3/4 p-2`}
>
  <div className="flex flex-col h-full">
    {/* Header */}
    <div className="flex items-center  bg-gradient-to-r from-zinc-900 to-zinc-800 px-6 py-4 border-b border-gray-700">
      <div className="flex justify-between items-center w-full">
        <div>
          <p className="font-bold uppercase tracking-wide text-white">
              Data {data?.text } Di Jawa Barat
          </p>
        </div>
        <button
          onClick={() => setSelectData(null)}
          className="text-gray-300 text-2xl hover:text-red-400 transition"
        >
          ×
        </button>
      </div>
    </div>

    {/* Content */}
    <div className="flex-1 overflow-y-auto bg-zinc-900/50 pb-6">
          <CityMap namaProvinsi={'Jawa Barat'} dataSebaran={dataSebaran} selected={selectMap} setSelectMap={setSelectMap} />
          <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.2)' }} />

   <DynamicTableDB
              label={"db_usage"}
     data={resultDataDetail || []}
    title={`Daftar Kecelakaan - ${capitalizeTheFirstLetterOfEachWord(selectMap?.namaLengkap)}`}
            />
    </div>
  </div>
</aside>
  );
};

export default StatistikContent;
