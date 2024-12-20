import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import NoteContext from "../context/NoteContext";

const Navbar = () => {
  const { profile } = useContext(NoteContext);
  const location = useLocation();
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          NoteSpot
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                aria-current="page"
                to="/about"
              >
                About Us
              </Link>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
          <Link to="/profile">
            <div className="d-flex align-items-center ms-3">
              <img
                src="path/to/profile-image.jpg"
                alt="Profile"
                className="rounded-circle"
                style={{ width: "40px", height: "40px" }}
              />
              <span className="ms-2">{profile.name}</span>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
