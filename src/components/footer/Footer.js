import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <div className="footer">
      <Link className="privacy-link" to="/privacy">
        Privacy
      </Link>
      <Link className="privacy-link" to="/about">
        About
      </Link>
    </div>
  );
}
