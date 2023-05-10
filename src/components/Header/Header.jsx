import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../../features/auth/authSlice";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/Login");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container">
        <Link className="navbar-brand fw-bolder" to="/">
          Todos App
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
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {user ? (
              <li className="nav-item">
                <a
                  role={"button"}
                  className="nav-link px-lg-3 fw-bolder"
                  onClick={onLogout}
                >
                  <FaSignOutAlt /> Logout
                </a>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link px-lg-3 fw-bolder" to="/Login">
                    <FaSignInAlt /> Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link px-lg-3 fw-bolder" to="/Register">
                    <FaUser /> Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
