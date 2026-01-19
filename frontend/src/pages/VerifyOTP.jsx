import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../pages/Auth.css";
import logo from "../assets/amazon-logo.png";

function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleVerify = () => {
    if (otp === "123456") {
      navigate("/");
    } else {
      alert("Invalid OTP ❌");
    }
  };

  return (
    <div className="auth-page">
      <img src={logo} alt="Amazon" className="amazon-logo" />

      <div className="auth-card">
        <h1>Verify mobile number</h1>

        <label>Enter OTP</label>
        <input
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <button className="primary-btn" onClick={handleVerify}>
          Verify
        </button>

        <p className="auth-text">
          Demo OTP: <b>123456</b>
        </p>
      </div>
    </div>
  );
}

export default VerifyOTP;
