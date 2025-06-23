import React, { useMemo, useState } from "react";
import CityMap from "./city.map";
import DynamicTableDB from "./DynamicTable";
import {
  formatNumber,
  capitalizeTheFirstLetterOfEachWord,
} from "../../core/services/convert";
import Divider from "@mui/material/Divider";
import StatistikPieChart from "./StatistikPieChart";
import StatistikLineChart from "./StatistikLineChart";
import dayjs from "dayjs";

const StatistikContent = ({ data, selectData, setSelectData, result }) => {
  const [selectMap, setSelectMap] = useState(null);

  function groupByKota(data) {
    const grouped = data.reduce((acc, item) => {
      const kota = item.lokasi?.kota || "Tidak Diketahui";
      if (!acc[kota]) {
        acc[kota] = {
          nama_kabupaten: kota,
          jumlah: 1,
        };
      } else {
        acc[kota].jumlah += 1;
      }
      return acc;
    }, {});

    return Object.values(grouped);
  }

  const dataSebaranNew = groupByKota(data);

  const resultDataDetail = useMemo(() => {
    if (!selectMap?.KDPKAB) return [];
    return data.filter(
      (item) => item.lokasi?.kota === String(selectMap.NAMOBJ)
    );
  }, [data, selectMap?.KDPKAB]);

  console.log("selectMap", selectMap);

  const countPerLocation = {};

  resultDataDetail.forEach((item) => {
    const key = item.lokasi.kecamatan || "Tidak Diketahui";
    countPerLocation[key] = (countPerLocation[key] || 0) + 1;
  });

  const countPerMonth = {};

  resultDataDetail.forEach((item) => {
    const dateKey = dayjs(item.created_at).format("YYYY-MM-01");
    countPerMonth[dateKey] = (countPerMonth[dateKey] || 0) + 1;
  });

  const list = {
    top10Tujuan: {
      labels: Object.keys(countPerLocation),
      series: Object.values(countPerLocation),
    },

    order: [
      {
        name: "Total Kecelakaan",
        data: Object.entries(countPerMonth).map(([x, y]) => ({ x, y })),
      },
    ],
  };

  const dummyCategories = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul"];

  return (
    <aside className={`w-3/4 p-2`}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center  bg-gradient-to-r from-zinc-900 to-zinc-800 px-6 py-4 border-b border-gray-700">
          <div className="flex justify-between items-center w-full">
            <div>
              <p className="font-bold uppercase tracking-wide text-white">
                Data {selectData?.text} Di {result?.provinsi || "-"}
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
          <CityMap
            namaProvinsi={result?.provinsi || "-"}
            dataSebaran={dataSebaranNew}
            setSelectMap={setSelectMap}
          />
          <Divider sx={{ my: 4, borderColor: "rgba(255,255,255,0.2)" }} />
          {selectMap?.NAMOBJ && (
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 md:col-span-6 rounded-lg shadow-md p-6 flex flex-col text-white">
                <h2 className="font-semibold mb-4">
                  Top 10 Kecelakaan Berdasarkan Kel/Desa
                </h2>
                <StatistikPieChart
                  series={list.top10Tujuan.series}
                  labels={list.top10Tujuan.labels.map((label) =>
                    label.toUpperCase()
                  )}
                  width={300}
                  type="Kecelakaan"
                  colorLabel="#000"
                />
              </div>

              <div className="col-span-12 md:col-span-6 rounded-lg shadow-md p-6 flex flex-col text-white">
                <h2 className="font-semibold mb-4">
                  Pertumbuhan Kecelakaan di Bekasi
                </h2>
                <StatistikLineChart
                  series={list.order}
                  categories={dummyCategories}
                  width="100%"
                />
              </div>
            </div>
          )}

          <DynamicTableDB
            label={"db_usage"}
            data={resultDataDetail || []}
            title={`Daftar Kecelakaan - ${capitalizeTheFirstLetterOfEachWord(
              selectMap?.namaLengkap
            )}`}
          />
        </div>
      </div>
    </aside>
  );
};

export default StatistikContent;
