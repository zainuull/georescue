import { CircularProgress } from "@mui/material";

const LoadingIndicator = ({style}) => (
  <div
    className="d-flex justify-content-center align-items-center w-100 h-100"
    style={{ minHeight: "15rem" }}
  >
    <i className="bx bx-loader-circle spin fs-1" style={style} />
  </div>
);

export const LoadingWithMessage = ({ text }) => {
  return (
    <div>
      <CircularProgress size={72} />
      <p>{text || "Sedang memuat data..."}</p>
    </div>
  );
};

export default LoadingIndicator;
