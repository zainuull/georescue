import { useState } from "react";
import TableList from "./TableList";
import Title from "./Title";



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
    { id: "waktu", label: "Waktu" },
    { id: "jenis_kecelakaan", label: "Jenis Kecelakaan" },
    { id: "nama_korban", label: "Nama Korban" },
    { id: "nama_kelurahan", label: "Kelurahan / Desa" },
    {
      id: "lat", label: "Koordinat", cell: (row) => {
        return (
          <p>Lat:{row.lat} Long:{ row.lng}</p>
      )
    } },
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
          <Title title={title} color={'orange'} />
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
