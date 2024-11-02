import React, { useState, useEffect } from "react";
import SensorChart from "./SensorChart";
import Popup from "./Popup";
import "../styles.css";

// Function to call the AI Gemini API
const analyzeDataWithAI = async (temperature, humidity) => {
  try {
    const response = await fetch("https://api.yourgemini.ai/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer YOUR_API_KEY", // Replace with your actual API key
      },
      body: JSON.stringify({ temperature, humidity }),
    });
    const data = await response.json();
    return data; // Adjust according to the response structure
  } catch (error) {
    console.error("Error calling AI Gemini:", error);
    return null;
  }
};

const Dashboard = () => {
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [data, setData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [alertActive, setAlertActive] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [lightOn, setLightOn] = useState(false); // State for light toggle
  const [activeMenu, setActiveMenu] = useState("home"); // State to manage the active menu

  useEffect(() => {
    const interval = setInterval(async () => {
      const newTemp = (Math.random() * 15 + 20).toFixed(1);
      const newHumidity = (Math.random() * 40 + 40).toFixed(1);
      setTemperature(newTemp);
      setHumidity(newHumidity);

      setData((prevData) => [
        ...prevData.slice(-9),
        {
          temperature: newTemp,
          humidity: newHumidity,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);

      // Call AI Gemini to analyze the data
      const result = await analyzeDataWithAI(newTemp, newHumidity);
      setAnalysisResult(result);
    }, 5000);

    return () => clearInterval(interval);
  }, [alertActive]);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  const toggleLight = () => {
    setLightOn((prevState) => {
      const newLightState = !prevState; // Toggle light state
      setShowPopup(true); // Show popup whenever the light state changes
      return newLightState;
    });
  };

  return (
    <div
      className={`dashboard ${
        temperature > 30 ? "hot" : temperature < 25 ? "cold" : "normal"
      }`}
    >
      <div className="logo-container">
        <img
          src={`${process.env.PUBLIC_URL}/ptit-logo-inv.png`}
          alt="IoT Dashboard"
          className="dashboard-image"
        />
        <h2 style={{ marginLeft: "10px", color: "#007bff" }}>
          Học Viện Công Nghệ Bưu Chính Viễn Thông
        </h2>
      </div>
      <h1> Xây dựng giao diện IoT (dashboard) cho theo dõi ánh sáng</h1>
      <div className="fixed-blocks">
        <div className="fixed-block">
          <h2>Nhiệt độ</h2>
          <p>{temperature}°C</p>
        </div>
        <div className="fixed-block">
          <h2>Ánh Sáng</h2>
          <p>{humidity}%</p>
        </div>
      </div>
      {/* Display AI Analysis Result */}
      {analysisResult && (
        <div className="analysis-result">
          <h3>Phân tích AI:</h3>
          <p>{analysisResult.message}</p>
        </div>
      )}
      <SensorChart data={data} />
      {/* Light Toggle Button */}
      <div className="light-toggle">
        <button
          className={lightOn ? "btn-light-on" : "btn-light-off"}
          onClick={toggleLight}
        >
          {lightOn ? "Tắt đèn" : "Bật đèn"}{" "}
          {/* Change button text based on state */}
        </button>
        <span className={lightOn ? "lightbulb-on" : "lightbulb-off"}>
          💡 {/* Lightbulb icon */}
        </span>
      </div>
      {showPopup && (
        <Popup
          message={`Đèn đã ${lightOn ? "bật" : "tắt"}!`} // Popup message reflects light status
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
};

export default Dashboard;
