import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthContext from "../context/Auth/AuthContext";
import { useContext } from "react";
const NavBar = () => {
  const {loggedIn,LogOut,userData}=useContext(AuthContext);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Chat App  {userData?` : ${userData.name}`:""}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            {
              loggedIn ? 
              <>
              <li className="nav-item">
              <Link className="nav-link" to="/user">
                User
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" onClick={LogOut} to="/login">
                LogOut
              </Link>
            </li>
              </>
              :
              <>
                  <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signup">
                Signup
              </Link>
            </li>
              </>
            }
            
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
