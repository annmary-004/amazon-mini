import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE from "../utils/api";
import "./VerifyEmail.css";

function VerifyEmail() {
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔐 DATA FROM SIGNUP
  const name = localStorage.getItem("name");
  const mobile = localStorage.getItem("mobile");
  const email = localStorage.getItem("email");

  useEffect(() => {
    generateOtp();
  }, []);

  const generateOtp = () => {
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);

    // ⚠️ DEMO ONLY
    alert("Demo OTP: " + newOtp);
  };

  const handleVerify = async (e) => {
    e.preventDefault();

    if (otp !== generatedOtp) {
      alert("Invalid OTP ❌");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${API_BASE}/api/auth/verify-user`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            mobile,
            email,
          }),
        }
      );

      if (!res.ok) throw new Error("Save failed");

      alert("Account verified successfully ✅");

      // cleanup
      localStorage.removeItem("name");
      localStorage.removeItem("mobile");
      localStorage.removeItem("email");

      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verify-page">
      <div className="verify-card">
        <h1>Verify email address</h1>

        <form onSubmit={handleVerify}>
          <label>Enter OTP</label>
          <input
            type="text"
            maxLength={6}
            value={otp}
            onChange={(e) =>
              setOtp(e.target.value.replace(/\D/g, ""))
            }
            required
          />

          <button className="verify-btn" disabled={loading}>
            {loading ? "Verifying..." : "Create your Amazon account"}
          </button>
        </form>

        <p className="resend" onClick={generateOtp}>
          Resend OTP
        </p>
      </div>
    </div>
  );
}

export default VerifyEmail;