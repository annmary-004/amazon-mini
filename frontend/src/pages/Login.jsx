import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [loginInput, setLoginInput] = useState(""); // email or mobile
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // EMAIL / MOBILE LOGIN
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let emailToUse = loginInput;

      // mobile → fake email
      if (/^\d{10}$/.test(loginInput)) {
        emailToUse = `${loginInput}@amazonclone.com`;
      }

      await signInWithEmailAndPassword(auth, emailToUse, password);
      navigate("/");
    } catch {
      alert("Invalid email / mobile number or password");
    } finally {
      setLoading(false);
    }
  };

  // GOOGLE LOGIN
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch {
      alert("Google login failed");
    }
  };

  return (
    <div className="login-page">
      {/* AMAZON LOGO */}
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
        alt="Amazon"
        className="login-logo"
      />

      {/* LOGIN CARD */}
      <div className="login-card">
        <h1>Sign in</h1>

        <form onSubmit={handleSubmit}>
          <label>Email or mobile phone number</label>
          <input
            type="text"
            required
            value={loginInput}
            onChange={(e) =>
              setLoginInput(e.target.value.replace(/\s/g, ""))
            }
          />

          <label>Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="login-primary-btn" disabled={loading}>
            {loading ? "Signing in..." : "Continue"}
          </button>
        </form>

        <p className="login-text">
          By continuing, you agree to Amazon's{" "}
          <span>Conditions of Use</span> and{" "}
          <span>Privacy Notice</span>.
        </p>

        <p className="login-help">▶ Need help?</p>

        <hr />

        <div className="login-work">
          <b>Buying for work?</b>
          <p>Shop on Amazon Business</p>
        </div>

        {/* OR + GOOGLE (INSIDE CARD) */}
        <div className="login-divider">
          <span>or</span>
        </div>

        <button
          type="button"
          className="login-google-btn"
          onClick={handleGoogleLogin}
        >
          Login with Google
        </button>
      </div>

      {/* CREATE ACCOUNT */}
      <div className="login-new">
        <span>New to Amazon?</span>
      </div>

      <Link to="/signup">
        <button className="login-secondary-btn">
          Create your Amazon account
        </button>
      </Link>

      {/* FOOTER */}
      <div className="login-footer">
        <span>Conditions of Use</span>
        <span>Privacy Notice</span>
        <span>Help</span>
      </div>

      <p className="login-footer-bottom">
        © 1996-2024, Amazon.com, Inc. or its affiliates
      </p>
    </div>
  );
}

export default Login;