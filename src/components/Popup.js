// Popup.js
import React from "react";
import "./Popup.css"; // Make sure to import the CSS file for styling

const Popup = ({ message, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2 className="popup-title">Thông Báo</h2>
        <p className="popup-message">{message}</p>
        <button className="popup-close-button" onClick={onClose}>
          Đóng
        </button>
      </div>
    </div>
  );
};

export default Popup;
