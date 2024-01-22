import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./auth/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="logo">
        <h3>
          Currency <span>Converter</span>
        </h3>
      </div>
      <div className="navbar-nav">
        <Link to="/">Home</Link>
        <Link to="saving">Saving</Link>
        <Link to="about">About us</Link>
      </div>
      <div className="navbar-button">
        {user ? (
          <div className="user-login">
            <span>Welcome, {user.email}!</span>
            <button id="logout" className="logout" onClick={logout}>
              Logout
            </button>
          </div>
        ) : (
          <>
            <button id="login" className="login">
              <Link to="login">Login</Link>
            </button>
            <button id="regis" className="regis">
              <Link to="register">Register</Link>
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
