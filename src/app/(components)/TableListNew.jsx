import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import {
  Box,
  Collapse,
  IconButton,
  TableHead,
} from "@mui/material";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import { formatNumber,capitalizeTheFirstLetterOfEachWord } from "../../core/services/convert";
import PaginationMui from "./paginationMui";
import { LoadingWithMessage } from "./LoadingIndicator";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

export const styleSticky = {
  position: "sticky",
  left: "0",
  zIndex: 1,
};

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  if (!Array.isArray(array)) {
    console.error("❌ stableSort: Input is not an array");
    return [];
  }

  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  return stabilizedThis.map((el) => el[0]);
}

export function ColumnHead(props) {
  const { order, orderBy, column, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1,
        }}
        className="bg-primary backdrop-blur-md text-capitalize"
        hover
      >
        {column?.map((headCell, index) => (
          <TableCell
            style={{
              //karena udah terlanjut dipake di banyak tempat, jadi handle buat matiin sticky nya aja
              // ...(!headCell?.isNotSticky && index === 0 && styleSticky),
              minWidth: headCell?.minWidth,
              width: headCell?.width,
              ...headCell?.style,
              color: "white",
            }}
            key={index}
            align={"left"}
            padding={headCell?.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell?.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell?.id}
              direction={orderBy === headCell?.id ? order : "asc"}
              className="font-semibold text-white fs-6"
              onClick={createSortHandler(headCell?.id)}
              style={{
                lineHeight: "16.5px",
                width: headCell?.width,
              }}
            >
              {headCell?.label ??
                capitalizeTheFirstLetterOfEachWord(
                  headCell?.id?.replace(/_/g, " ")
                )}
              {orderBy === headCell.id ? (
                <Box
                  component="span"
                  sx={visuallyHidden}
                  className="text-white"
                >
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function Row({
  row,
  column,
  index,
  page,
  limit,
  onClick,
  bodyColor,
  titleColor,
  expand = false,
}) {
  // Ensure page and limit are numbers, fallback to 1 and 10 if undefined or invalid
  const validPage = Number(page) || 1;
  const validLimit = Number(limit) || 10;
  const bgColor = index % 2 === 0 ? "#ffffff" : "#f5f5f5"; // genap putih, ganjil abu‑abu
  const [open, setOpen] = useState(false);
  return (
    <React.Fragment>
      <TableRow
        tabIndex={-1}
        key={row.id}
        hover
        onClick={onClick}
        className="bg-secondary"
        style={{
          cursor: "pointer",
        }}
      >
        {column?.map((v, i) => {
          if (expand && v.id === "action") {
            return (
              <TableCell key={i}>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation(); // biar gak trigger row onClick
                    setOpen(!open);
                  }}
                >
                  {open ? (
                    <MdKeyboardArrowUp size={25} className="text-white" />
                  ) : (
                    <MdKeyboardArrowDown size={25} className="text-white" />
                  )}
                </IconButton>
              </TableCell>
            );
          }
          const isNomorKolom = v.id === "no";
          const nomorUrut = (validPage - 1) * validLimit + index + 1;
          const cellContent = v.cell ? (
            isNomorKolom ? (
              <span>{nomorUrut}</span>
            ) : (
              v.cell(row, index)
            )
          ) : isNomorKolom ? (
            <span>{nomorUrut}</span>
          ) : row[v.id] !== undefined && row[v.id] !== null ? (
            v.isNumber ? (
              formatNumber(row[v.id])
            ) : (
              row[v.id]
            )
          ) : (
            "-"
          );

          return (
            <>
              <TableCell
                key={i}
                align="left"
                onClick={onClick}
                style={{
                  // ...(i === 0 && styleSticky),
                  ...v?.style,
                  color: titleColor ?? "white",
                  cursor: "pointer",
                  fontSize: "12px",
                }}
              >
                {cellContent}
              </TableCell>
            </>
          );
        })}
      </TableRow>
      {expand && (
        <TableRow>
          <TableCell colSpan={5} style={{ paddingBottom: 0, paddingTop: 0 }}>
            <Collapse in={open}>
              <Box
                p={2}
                sx={{
                  // maxWidth: "700px",
                  backgroundColor: "#0f172a", // lebih gelap seperti editor
                  borderRadius: "8px",
                  border: "1px solid #334155",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                  fontFamily: "monospace",
                }}
              >
                <Box
                  mb={1}
                  sx={{
                    color: "#94a3b8",
                    fontSize: "13px",
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <span>📄 Executed Query:</span>
                </Box>
                <Box
                  component="pre"
                  sx={{
                    m: 0,
                    p: 1,
                    backgroundColor: "#1e293b",
                    color: "#e2e8f0",
                    borderRadius: "4px",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    fontSize: "12px",
                    overflowX: "auto",
                  }}
                >
                  {row.query}
                </Box>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </React.Fragment>
  );
}

const TableListNew = ({
  data = [],
  totalData = 20,
  column,
  onPageChange, // Function to handle server-side page changes
  page = 1,
  limit = 10,
  loading = false,
  onRowClick,
  titleColor,
  bodyColor,
  hidePagination = true,
  expand,
}) => {
  // Pagination
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");

  // Sort data based on order and orderBy
  const sortedData = stableSort(data, getComparator(order, orderBy));
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const EmptySection = () => {
    return (
      <TableRow>
        <TableCell
          colSpan={column?.length || 9}
          align="center"
          sx={{ color: "#999" }}
        >
          No data available
        </TableCell>
      </TableRow>
    );
  };

  return (
    <Box sx={{ width: "100%" }} className={`rounded-md pb-2`}>
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table sx={{ width: "100%" }} aria-labelledby="tableTitle">
          <ColumnHead
            column={column}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            titleColor={titleColor}
          />
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  align="center"
                  style={{ borderBottomWidth: 2 }}
                  colSpan={column?.length || 9}
                >
                  <LoadingWithMessage />
                </TableCell>
              </TableRow>
            ) : (
              <>
                {sortedData.length < 1 ? (
                  <EmptySection />
                ) : (
                  sortedData?.map((data, index) => (
                    <Row
                      key={index}
                      index={index}
                      row={data}
                      column={column}
                      page={page}
                      limit={limit}
                      onClick={() => onRowClick(data)}
                      bodyColor={bodyColor}
                      titleColor={titleColor}
                      expand={expand}
                    />
                  ))
                )}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {!hidePagination && (
        <PaginationMui
          pageNow={page}
          totalData={totalData}
          perPage={limit}
          setPage={onPageChange}
        />
      )}
    </Box>
  );
};

export default TableListNew;
