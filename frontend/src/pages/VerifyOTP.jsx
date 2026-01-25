import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../pages/Auth.css";
import logo from "../assets/amazon-logo.png";

function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // generate OTP when page loads
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    localStorage.setItem("otp", generatedOtp);

    // demo only
    alert("Demo OTP: " + generatedOtp);
  }, []);

  const handleVerify = () => {
    const storedOtp = localStorage.getItem("otp");

    if (otp === storedOtp) {
      localStorage.removeItem("otp");
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
          maxLength={6}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
        />

        <button className="primary-btn" onClick={handleVerify}>
          Verify
        </button>
      </div>
    </div>
  );
}

export default VerifyOTP;