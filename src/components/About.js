import React from "react";
import "../styles.css"; // Import styles if needed

const About = () => {
  return (
    <div className="about">
      <h1>Thông Tin Sinh Viên </h1>
      <h2>Vũ Đình Dương</h2>
      <p>Mã sinh viên: B19DCDT042</p>
      <img
        src={`${process.env.PUBLIC_URL}/395149368_1357907631760971_5886543071450814731_n.jpg`} // Directly use the image from the public folder
        alt="Vũ Đình Dương"
        className="profile-photo"
      />
    </div>
  );
};

export default About;
