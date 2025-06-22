import { useState } from "react";
import TableList from "./TableList";
import Title from "./Title";
import dayjs from "dayjs";
import "dayjs/locale/id"; // Untuk format lokal Indonesia
dayjs.locale("id");

const DynamicTableDB = ({
  label,
  data,
  title,
  color,
  expand = false,
  height = "300px",
}) => {
  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
  });

  const DBUsageCol = [
    {
      id: "created_at",
      label: "Waktu",
      cell: (row) => {
        return (
          <p className="capitalize">
            {dayjs(row.created_at).format("DD MMMM YYYY HH:mm")}
          </p>
        );
      },
    },
    {
      id: "jenis_kecelakaan",
      label: "Jenis Kecelakaan",
      cell: (row) => {
        return <p className="capitalize">{row.jenis_kecelakaan}</p>;
      },
    },
    { id: "nama", label: "Nama Korban" },
    {
      id: "nama_kelurahan",
      label: "Kelurahan / Desa",
      cell: (row) => {
        return <p className="capitalize">{row.lokasi?.kecamatan}</p>;
      },
    },
    {
      id: "lat",
      label: "Koordinat",
      cell: (row) => {
        return (
          <p>
            Lat:{row.koordinat?.lat} Long:{row.koordinat?.lng}
          </p>
        );
      },
    },
  ];

  const columnsConfig = {
    db_usage: DBUsageCol,
  };

  const columns = columnsConfig[label] || [];

  return (
    <div
      className="w-100 rounded-3 text-white mt-4"
      style={{ minHeight: height }}
    >
      <div className="px-4">
        <Title title={title} color={"orange"} />
      </div>
      <TableList
        query={query}
        setQuery={setQuery}
        initialColumns={columns}
        tableData={data}
        totalData={data?.length}
        expand={expand}
      />
    </div>
  );
};

export default DynamicTableDB;
