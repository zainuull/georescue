import { useEffect, useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

// Tambahkan plugin ke dayjs
dayjs.extend(utc);
dayjs.extend(timezone);

const Title = ({
  title,
  fontSize = "0.9rem",
  mb = "mb-2",
  col = false,
  color = "white",
  showLastUpdt = true
}) => {
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 5 * 60 * 1000); // setiap 5 menit

    return () => clearInterval(interval); // bersihkan interval saat komponen unmount
  }, []);

  return (
<div
  className={`flex ${col ? "flex-col" : "flex-row items-center"} justify-between ${mb}`}
>
  <h1
    className={`font-semibold truncate uppercase m-0 p-0`}
    style={{
      fontSize: fontSize,
      letterSpacing: "0.5px",
      color: color,
    }}
  >
    {title}
  </h1>

  {showLastUpdt && (
    <p className="text-white text-opacity-75 m-0 p-0 text-[11px]">
      Terakhir Diperbaharui:{" "}
      {dayjs(lastUpdate).tz("Asia/Jakarta").format("DD MMMM YYYY, HH:mm")}
    </p>
  )}
</div>

  );
};

export default Title;
