import React from "react";
import Chart, { Props } from "react-apexcharts";

// Adjusted series data for the Radial Bar Chart
const series: Props["series"] = [76, 67, 61, 90]; // Example data values

// Adjusted options for the Radial Bar Chart
const options: Props["options"] = {
  chart: {
    type: "radialBar",
    height: 370,
  },
  plotOptions: {
    radialBar: {
      offsetY: 0,
      startAngle: 0,
      endAngle: 270,
      hollow: {
        margin: 5,
        size: "40%",
        background: "transparent",
        image: undefined,
      },
      dataLabels: {
        name: {
          fontSize: "22px",
        },
        value: {
          fontSize: "16px",
        },
        total: {
          show: true,
          label: "Total",
          formatter: function (w) {
            // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
            return "249";
          },
        },
      },
    },
  },
  labels: ["Vimeo", "Messenger", "Facebook", "LinkedIn"], // Example labels
  colors: ["#1ab7ea", "#0084ff", "#39539E", "#0077B5"], // Example colors
  responsive: [
    {
      breakpoint: 480,
      options: {
        legend: {
          show: false,
        },
      },
    },
  ],
};

export const RadialBarChart = () => {
  return (
    <>
      <div className="w-full z-20">
        <div id="chart">
          <Chart
            options={options}
            series={series}
            type="radialBar"
            height={370}
          />
        </div>
      </div>
    </>
  );
};
