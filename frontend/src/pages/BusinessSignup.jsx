import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BusinessSignup.css";

function BusinessSignup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleNext = (e) => {
    e.preventDefault();

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // ✅ Move to next Amazon step
    navigate("/verify-email");
  };

  return (
    <div className="biz-page">
      {/* HEADER */}
      <div className="biz-header">
        <div className="biz-logo">amazon business</div>
        <div className="biz-steps">
          <span className="active">1 ACCOUNT CREATION</span>
          <span>2 BUSINESS DETAILS</span>
          <span>3 FINISH</span>
        </div>
      </div>

      {/* CARD */}
      <div className="biz-card">
        <h1>
          Enter your full name <br /> and choose your <br /> business password
        </h1>

        <form onSubmit={handleNext}>
          <label>Your name</label>
          <input
            type="text"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />

          <label>Mobile numbers</label>
          <input
            type="text"
            value={mobile}
            required
            onChange={(e) =>
              setMobile(e.target.value.replace(/\D/g, ""))
            }
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="hint">
            Passwords must be at least 6 characters.
          </p>

          <label>Password again</label>
          <input
            type="password"
            value={confirmPassword}
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button className="next-btn">Next step</button>
        </form>

        <p className="terms">
          By creating an account or logging in, you agree to Amazon’s{" "}
          <span>Conditions of Use</span>,{" "}
          <span>Privacy Notice</span>, and{" "}
          <span>Amazon Business Terms and Conditions</span>. You agree
          that you are creating this business account on behalf of your
          organization and have authority to bind your organization.
        </p>
      </div>
    </div>
  );
}

export default BusinessSignup;