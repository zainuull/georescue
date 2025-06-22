import React, { useMemo, useState } from "react";
import CityMap from "./city.map";
import DynamicTableDB from "./DynamicTable";
import {
  formatNumber,
  capitalizeTheFirstLetterOfEachWord,
} from "../../core/services/convert";
import Divider from "@mui/material/Divider";


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
