import TableListNew from "./TableListNew";
import { useMemo, useRef, useState } from "react";
import ExportExcelDatis from './ExportExcelDatis';
import { filterEmptyValues } from "@/core/services/convert";

const TableList = ({
  formik,
  query,
  setQuery,
  fetchAPI,
  fetchData,
  initialColumns,
  tableData,
  totalData,
  loading,
  onRowClick,
  titleColor,
  bodyColor,
  typeContent,
  expand
}) => {
  const exportExcelRef = useRef();
  const [selectedColumns, setSelectedColumns] = useState([]);

  const columns = useMemo(() => {
    const updatedColumns = [
      ...initialColumns,
      ...selectedColumns.map((key) => ({
        id: key,
        label: key
          .replace(/_/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase()),
        width: "150px",
      })),
    ];

    // filter supaya tidak duplikat
    return updatedColumns.filter(
      (col, index, self) => index === self.findIndex((c) => c.id === col.id)
    );
  }, [initialColumns, selectedColumns]);

  const handlePageChange = (e) => {
    const updatedQuery = {
      ...query,
      ...formik.values,
      page: e,
    };
    setQuery(filterEmptyValues(updatedQuery));
    fetchData(filterEmptyValues(updatedQuery));
  };

  return (
    <>
      <TableListNew
        data={tableData}
        totalData={totalData}
        column={columns}
        onPageChange={handlePageChange}
        page={query.page}
        limit={query.limit}
        loading={loading}
        onRowClick={onRowClick}
        titleColor={titleColor}
        bodyColor={bodyColor}
        typeContent={typeContent}
        expand={expand}
        hidePagination={ true}
      />

      <div style={{ display: "none" }}>
        <ExportExcelDatis
          ref={exportExcelRef}
          name={`Data Kapal`}
          data={tableData}
          header={columns}
          isHide={false}
        />
      </div>
    </>
  );
};

export default TableList;
