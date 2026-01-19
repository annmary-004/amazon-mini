import "./Footer.css";

function Footer() {
  return (
    <footer className="amazon-footer">
      {/* BACK TO TOP */}
      <div
        className="back-to-top"
        onClick={() =>
          window.scrollTo({ top: 0, behavior: "smooth" })
        }
      >
        Back to top
      </div>

      {/* LINKS */}
      <div className="footer-links">
        <div>
          <h4>Get to Know Us</h4>
          <p>About Amazon</p>
          <p>Careers</p>
          <p>Press Releases</p>
          <p>Amazon Science</p>
        </div>

        <div>
          <h4>Connect with Us</h4>
          <p>Facebook</p>
          <p>Twitter</p>
          <p>Instagram</p>
        </div>

        <div>
          <h4>Make Money with Us</h4>
          <p>Sell on Amazon</p>
          <p>Sell under Amazon Accelerator</p>
          <p>Amazon Global Selling</p>
          <p>Become an Affiliate</p>
        </div>

        <div>
          <h4>Let Us Help You</h4>
          <p>COVID-19 and Amazon</p>
          <p>Your Account</p>
          <p>Returns Centre</p>
          <p>100% Purchase Protection</p>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt="Amazon"
        />
        <p>© 1996-2026, Amazon.com, Inc. or its affiliates</p>
      </div>
    </footer>
  );
}

export default Footer;