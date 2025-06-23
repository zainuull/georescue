import { capitalizeTheFirstLetterOfEachWord, formatNumber } from "@/core/services/convert";
import React from "react";
import Chart from "react-apexcharts";


const StatistikPieChart = ({
  series,
  labels,
  width = 380,
  type,
  colorLabel,
  title = "Top 10",
}) => {
  const formattedLabels = Array.isArray(labels)
    ? labels.map((label) => capitalizeTheFirstLetterOfEachWord(label))
    : [];

  // Calculate percentages for labels
  const total = series.reduce((sum, value) => sum + value, 0);
  const percentages = series.map((value) => Math.round((value / total) * 100));

  // Custom colors similar to the reference image
  const colors = [
    "#4285F4", // Blue - Kabupaten Cianjur
    "#FFC145", // Light Yellow - Kabupaten Bandung
    "#41C5F4", // Light Blue - Kota Bekasi
    "#F37735", // Orange - Kota Bandung
    "#FFA145", // Light Orange - Kabupaten Bogor
    "#7BC043", // Green - Kabupaten Sukabumi
    "#3D9970", // Dark Green - Kabupaten Karawang
    "#214D72", // Navy Blue - Kabupaten Bekasi
    "#7B4EA8", // Purple - Kabupaten Garut
    "#A64EA8", // Dark Purple - Kabupaten Subang
    // Additional colors for more regions if needed
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33A8",
    "#A833FF",
    "#33FFF5",
    "#F5FF33",
    "#FF5733",
    "#33FF57",
    "#3357FF",
  ];

  const options = {
    chart: {
      type: "pie",
      fontFamily: "Arial, sans-serif",
    },
    colors: colors,
    labels: formattedLabels,
    tooltip: {
      enabled: true,
      custom: ({ series, seriesIndex, w }) => {
        const label = w.globals.labels[seriesIndex];
        const value = series[seriesIndex];
        return `
            <div style="padding: 8px; background: #1f2937; color: #fff; border-radius: 4px; font-size: 12px; max-width: 200px; word-wrap: break-word;">
              <strong style="display: block; white-space: normal;">${capitalizeTheFirstLetterOfEachWord(
                label
              )}</strong>
              Nilai: ${formatNumber(value)} ${type}
            </div>
        `;
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val, opts) {
        return `${percentages[opts.seriesIndex]}%`;
      },
      style: {
        fontSize: "14px",
        fontWeight: "bold",
        colors: ["#fff"],
      },
      dropShadow: {
        enabled: false,
      },
    },
    legend: {
      //   position: "bottom",
      //   fontSize: "12px",
      //   formatter: function (seriesName, opts) {
      //     return `<div style="display: flex; flex-direction: column;">
      //   <span>${seriesName}</span>
      //   <span style="color: #999; font-size: 12px;">${formatNumber(
      //     series[opts.seriesIndex]
      //   )} ${type}</span>
      // </div>`;
      //   },
      //   markers: {
      //     width: 12,
      //     height: 12,
      //     strokeWidth: 0,
      //     radius: 0,
      //   },
      //   itemMargin: {
      //     horizontal: 5,
      //     vertical: 8,
      //   },
      //   labels: {
      //     colors: colorLabel ?? "#000",
      //     fontSize: "12px",
      //   },
      show: false,
    },

    stroke: {
      width: 0,
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
      },
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          legend: {
            position: "bottom",
            formatter: function (seriesName, opts) {
              return `${seriesName} - ${formatNumber(
                series[opts.seriesIndex]
              )} ${type}`;
            },
          },
          chart: {
            width: 300,
          },
        },
      },
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  // Create custom legend display for two-column layout
  const renderCustomLegend = () => {
    const halfLength = Math.ceil(formattedLabels.length / 2);
    const leftColumn = formattedLabels.slice(0, halfLength);
    const rightColumn = formattedLabels.slice(halfLength);
    return (
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4 max-w-lg mx-auto">
        <div className="space-y-2">
          {leftColumn.map((label, idx) => (
            <div key={`legend-left-${idx}`} className="flex items-center">
              <div
                className="w-2 h-7 mr-2 flex-shrink-0"
                style={{ backgroundColor: colors[idx] }}
              ></div>
              <div>
                <div className="text-xs">{label}</div>
                <div className="text-xs text-gray-300">
                  {formatNumber(series[idx])} {type}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          {rightColumn.map((label, idx) => (
            <div key={`legend-right-${idx}`} className="flex items-center">
              <div
                className="w-2 h-7 mr-2 flex-shrink-0"
                style={{ backgroundColor: colors[idx + halfLength] }}
              ></div>
              <div>
                <div className="text-xs">{label}</div>
                <div className="text-xs text-gray-300">
                  {formatNumber(series[idx + halfLength])} {type}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Disable built-in legend if we're using custom legend
  if (formattedLabels.length > 5) {
    options.legend.show = false;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <Chart options={options} series={series} type="pie" width={width} />
      {formattedLabels?.length && renderCustomLegend()}
    </div>
  );
};

export default StatistikPieChart;
