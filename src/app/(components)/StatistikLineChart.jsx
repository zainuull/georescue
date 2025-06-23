import React from "react";
import Chart from "react-apexcharts";
import {
  capitalizeTheFirstLetterOfEachWord,
  formatNumber,
} from "@/core/services/convert";

const StatistikLineChart = ({
  series = [],
  height = 350,
  colorLabel = "#000",
}) => {
  const colors = ["#4285F4", "#7BC043", "#F37735", "#A64EA8", "#FFBD45"];

  const options = {
    chart: {
      type: "area",
      zoom: {
        enabled: true,
        type: "x", // horizontal zoom
        autoScaleYaxis: true,
      },
      // toolbar: {
      //   show: true,
      //   tools: {
      //     zoom: true,
      //     zoomin: true,
      //     zoomout: true,
      //     reset: true,
      //   },
      // },
      fontFamily: "Arial, sans-serif",
    },
    xaxis: {
      type: "datetime",
      labels: {
        style: {
          colors: "#fff",
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (val) => formatNumber(val),
        style: {
          colors: "#fff",
          fontSize: "12px",
        },
      },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.05,
        stops: [0, 90, 100],
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      theme: "dark", // Gunakan tema dark
      style: {
        fontSize: "14px",
        fontFamily: "inherit",
        background: "#000", // Warna latar tooltip
        color: "#fff", // Warna teks tooltip
      },
      x: {
        format: "dd MMM yyyy",
      },
      y: {
        formatter: (val) => formatNumber(val),
      },
    },

    grid: {
      borderColor: "#eee",
      strokeDashArray: 4,
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
      labels: {
        colors: colorLabel,
      },
    },
    colors,
  };

  return (
    <div className="w-full">
      <Chart options={options} series={series} type="area" height={height} />
    </div>
  );
};

export default StatistikLineChart;
