import React from "react";
import { Link } from "react-router-dom";
import logo from "./images/logo.png";

const Navbar = (props) => {
  return (
    <div
      className="navbar-container"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "linear-gradient(90deg, #f6f7fb, #fff)",
        padding: "12px 50px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* Logo */}
      <div>
        <Link
          className="logo-container"
          to="/"
          style={{ display: "flex", alignItems: "center", textDecoration: "none" }}
        >
          <img
            className="navbar-logo"
            src={logo}
            alt="PawFinds Logo"
            style={{ width: "55px", marginRight: "10px" }}
          />
          <p
            style={{
              fontSize: "1.4rem",
              fontWeight: "bold",
              color: "#333",
              margin: 0,
            }}
          >
            {props.title}
          </p>
        </Link>
      </div>

      {/* Nav Links */}
      <div>
        <ul
          className="navbar-links"
          style={{
            display: "flex",
            listStyle: "none",
            gap: "25px",
            margin: 0,
            padding: 0,
          }}
        >
          <li>
            <Link to="/" style={{ textDecoration: "none", color: "#444", fontWeight: 500 }}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/services" style={{ textDecoration: "none", color: "#444", fontWeight: 500 }}>
              Services
            </Link>
          </li>
          <li>
            <Link to="/pets" style={{ textDecoration: "none", color: "#444", fontWeight: 500 }}>
              Pets
            </Link>
          </li>
          <li>
            <Link to="/contact" style={{ textDecoration: "none", color: "#444", fontWeight: 500 }}>
              Contact Us
            </Link>
          </li>
        </ul>
      </div>

      {/* Buttons */}
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <Link to="/services">
          <button
            className="Navbar-button"
            style={{
              padding: "8px 18px",
              background: "#ff914d",
              border: "none",
              borderRadius: "8px",
              color: "white",
              cursor: "pointer",
              fontWeight: 600,
              transition: "0.3s",
            }}
            onMouseOver={(e) => (e.target.style.background = "#ff7b2d")}
            onMouseOut={(e) => (e.target.style.background = "#ff914d")}
          >
            Give a Pet
          </button>
        </Link>

        <Link to="/login">
          <button
            style={{
              padding: "8px 18px",
              background: "white",
              border: "2px solid #ff914d",
              borderRadius: "8px",
              color: "#ff914d",
              cursor: "pointer",
              fontWeight: 600,
              transition: "0.3s",
            }}
            onMouseOver={(e) => {
              e.target.style.background = "#ff914d";
              e.target.style.color = "white";
            }}
            onMouseOut={(e) => {
              e.target.style.background = "white";
              e.target.style.color = "#ff914d";
            }}
          >
            Login / Signup
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
