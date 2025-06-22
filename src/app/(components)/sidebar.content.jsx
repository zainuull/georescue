import React, { useMemo, useState } from "react";
import { GiPowder } from "react-icons/gi";
import { BsCarFront } from "react-icons/bs";
import { FaMotorcycle } from "react-icons/fa";
import { formatNumber } from "@/core/services/convert";
import StatistikContent from "./statistik.content";

const SidebarContent = ({
  sidebar_content,
  setSidebar_content,
  data,
  dataSelect,
}) => {
  const [selectData, setSelectData] = useState(null);
  console.log("data", data);

  // / Hitung jumlah jenis kecelakaan (bisa dari data lebih banyak nanti)const getKecelakaanCount = (data = [], jenis) =>
  const getKecelakaanCount = (data = [], jenis) =>
    data.filter((item) => item.jenis_kecelakaan === jenis).length;

  const transformProvince = (
    data = [],
    provinsi,
    id = 11,
    ibuKota = "DKI Jakarta"
  ) => {
    if (!Array.isArray(data)) return null;

    const isNasional = provinsi.toLowerCase() === "indonesia";

    const filtered = isNasional
      ? data
      : data.filter(
          (item) =>
            item.lokasi?.provinsi?.toUpperCase() === provinsi.toUpperCase()
        );

    return {
      id,
      provinsi: provinsi.toUpperCase(),
      ibu_kota: ibuKota,
      kecelakaan_tunggal: {
        value: getKecelakaanCount(filtered, "tunggal"),
        satuan: "Kasus",
        kenaikan: "naik",
      },
      kecelakaan_motor: {
        value: getKecelakaanCount(filtered, "motor"),
        satuan: "Kasus",
        kenaikan: "turun",
      },
      kecelakaan_mobil: {
        value: getKecelakaanCount(filtered, "mobil"),
        satuan: "Kasus",
        kenaikan: "naik",
      },
    };
  };

  const result = transformProvince(data, dataSelect?.provinsi || "Indonesia");

  console.log("result", result);

  //Sidebar Portal
  const sidebarPortal = useMemo(() => {
    const _temp = [
      {
        icon: "bx bx-car-crash",
        title: "Jenis Kecelakaan",
        year: "2025",
        children: [
          {
            icon: <GiPowder size={30} className="text-secondary" />,
            text: "Kecelakaan Tunggal",
            value: result?.kecelakaan_tunggal?.value || 0,
            satuan: result?.kecelakaan_tunggal?.satuan || "Kasus",
            kenaikan: result?.kecelakaan_tunggal?.kenaikan,
          },
          {
            icon: <FaMotorcycle size={30} className="text-secondary" />,
            text: "Kecelakaan Motor",
            value: result?.kecelakaan_motor?.value || 0,
            satuan: result?.kecelakaan_motor?.satuan || "Kasus",
            kenaikan: result?.kecelakaan_motor?.kenaikan,
          },
          {
            icon: <BsCarFront size={30} className="text-secondary" />,
            text: "Kecelakaan Mobil",
            value: result?.kecelakaan_mobil?.value || 0,
            satuan: result?.kecelakaan_mobil?.satuan || "Kasus",
            kenaikan: result?.kecelakaan_mobil?.kenaikan,
          },
        ],
      },
    ].filter(Boolean);
    return _temp;
  }, [result]);

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-full overflow-y-auto transition-transform duration-300 ease-in-out transform ${
        sidebar_content ? "translate-x-0" : "-translate-x-full"
      } bg-black/40 backdrop-blur-lg border-r border-gray-800 shadow-xl flex gap-2`}
    >
      <div className="flex flex-col h-full w-1/4 p-2">
        {/* Header */}
        <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 px-6 py-5 border-b border-gray-700">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xl font-bold uppercase tracking-wide text-white">
                {result?.provinsi || "INDONESIA"}
              </p>
              {/* {result?.provinsi !== "NASIONAL" && (
                <p className="text-sm text-gray-400 mt-1">
                  Ibu Kota: {result?.ibu_kota || "-"}
                </p>
              )} */}
            </div>
            <button
              onClick={() => {
                setSidebar_content(false);
                setSelectData(null);
              }}
              className="text-gray-300 text-2xl hover:text-red-400 transition"
            >
              ×
            </button>
          </div>
        </div>

        {/* Logo */}
        <div className="flex justify-center items-center py-6 bg-zinc-900/60 border-b border-gray-700">
          <img
            src={`/assets/logoprov/${
              (result?.id === "-" ? 1 : result?.id) || 1
            }.png`}
            className={result?.id === "-" ? "w-32" : "w-24"}
            alt="logoProv"
          />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-zinc-900/50 pb-6">
          {sidebarPortal.map((section, i) => (
            <div key={i} className="text-white">
              {/* Section Title */}
              <div className="flex items-center justify-between px-4 py-3 bg-black/40 border border-gray-700 shadow-sm">
                <div className="flex items-center gap-3">
                  <i className={`${section.icon} text-yellow-400 text-lg`} />
                  <span className="text-lg font-semibold">{section.title}</span>
                </div>
                <span className="text-sm text-yellow-400 font-medium">
                  {section.year}
                </span>
              </div>

              {/* Items */}
              <div className="mt-2 divide-y divide-gray-700">
                {section.children?.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectData(item)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-zinc-800/60 transition rounded-md cursor-pointer"
                  >
                    {/* Icon */}
                    <div className="text-xl text-blue-400 pt-1">
                      {typeof item.icon === "object" ? (
                        item.icon
                      ) : (
                        <i className={item.icon} />
                      )}
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <span
                          onClick={item.onClick || (() => {})}
                          className={`${
                            item.onClick && "hover:underline cursor-pointer"
                          } font-medium`}
                        >
                          {item?.text}
                        </span>

                        {item.value && (
                          <div className="text-green-400 font-semibold text-sm whitespace-nowrap">
                            {formatNumber(item.value)} {item.satuan}
                          </div>
                        )}
                      </div>

                      {/* Children_2 */}
                      {item.children_2 && (
                        <div className="mt-2 space-y-1 pl-3 border-l border-gray-700">
                          {item.children_2.map((sub, subIdx) => (
                            <div
                              key={subIdx}
                              className="flex justify-between text-sm text-gray-200"
                            >
                              <span
                                onClick={sub.onClick || (() => {})}
                                className={`${
                                  sub.onClick &&
                                  "hover:underline cursor-pointer"
                                }`}
                                dangerouslySetInnerHTML={{ __html: sub.text }}
                              />
                              <span className="text-green-300 font-semibold whitespace-nowrap">
                                {formatNumber(sub.value)} {sub.satuan}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CONTENT STATISTIK */}
      {selectData && (
        <StatistikContent data={selectData} setSelectData={setSelectData} />
      )}
    </aside>
  );
};

export default SidebarContent;
