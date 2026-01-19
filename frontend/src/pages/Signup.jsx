import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

function Signup() {
  const { signup, googleLogin } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const fakeEmail = `${mobile}@amazonclone.com`;
      await signup(fakeEmail, password);
      navigate("/verify-email");
    } catch {
      alert("Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await googleLogin();
      navigate("/");
    } catch {
      alert("Google signup failed");
    }
  };

  return (
    <div className="auth-page">
      {/* AMAZON LOGO */}
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
        alt="Amazon"
        className="amazon-logo"
      />

      {/* CARD */}
      <div className="auth-card">
        <h1>Create account</h1>

        <form onSubmit={handleSubmit}>
          <label>Your name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Mobile number</label>
          <input
            type="text"
            required
            placeholder="Enter mobile number"
            maxLength={10}
            value={mobile}
            onChange={(e) =>
              setMobile(e.target.value.replace(/\D/g, ""))
            }
          />

          <label>Password</label>
          <input
            type="password"
            required
            placeholder="At least 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="primary-btn" disabled={loading}>
            {loading ? "Creating account..." : "Verify mobile number"}
          </button>
        </form>

        <div className="buying-work">
          <b>Buying for work?</b>
          <p>Shop on Amazon Business</p>
        </div>

        <p className="auth-text">
          Already have an account?{" "}
          <Link to="/login">
            <span>Sign in ▶</span>
          </Link>
        </p>

        <p className="auth-text small">
          By creating an account, you agree to Amazon’s{" "}
          <span>Conditions of Use</span> and{" "}
          <span>Privacy Notice</span>.
        </p>

        {/* ✅ OR + GOOGLE (INSIDE CARD, WIDTH 100%) */}
        <div className="auth-divider">
          <span>or</span>
        </div>

        <button
          type="button"
          className="google-btn"
          onClick={handleGoogleSignup}
        >
          Sign up with Google
        </button>
      </div>

      {/* FOOTER */}
      <div className="auth-footer">
        <span>Conditions of Use</span>
        <span>Privacy Notice</span>
        <span>Help</span>
      </div>

      <p className="auth-footer-bottom">
        © 1996-2024, Amazon.com, Inc. or its affiliates
      </p>
    </div>
  );
}

export default Signup;