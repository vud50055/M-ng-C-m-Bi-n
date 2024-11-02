// src/components/SensorChart.js
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const SensorChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip />
        <CartesianGrid strokeDasharray="3 3" />
        <Line type="monotone" dataKey="temperature" stroke="#ff7300" />
        <Line type="monotone" dataKey="humidity" stroke="#387908" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SensorChart;
