import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <div className="footer">
      <a
        className="privacy-link"
        rel="noopener noreferrer"
        target="_blank"
        href="https://forms.gle/E83Y2mXJeLs9zLuJ7"
      >
        Feedback?
      </a>
      <Link className="privacy-link" to="/privacy">
        Privacy
      </Link>
      <Link className="privacy-link" to="/about">
        About
      </Link>
    </div>
  );
}
