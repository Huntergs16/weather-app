// components/LineChart.js
import React from "react";
import { Line } from "react-chartjs-2";

export default function LineChart({ chartData }) {
  return (
    <div className="w-full h-full pt-6">
      <h2 style={{ textAlign: "center" }}>Hourly Forecast</h2>
      <Line
        data={chartData}
        options={{
            showLine: false,
            animation: false,
            plugins: {
            title: {
                display: true,
                text: "Tempurature in F"
                },
                legend: {
                display: false
                }
            },
            spanGaps: true // enable for all datasets
        }}
      />
    </div>
  );
}
