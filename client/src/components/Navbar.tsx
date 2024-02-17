import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { getUserData } from "../helper";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const user = getUserData();
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const CheckUserToken = () => {
    const checkuser = localStorage.getItem("user");
    return !!checkuser; // คืนค่าเป็น true ถ้ามี user ใน localStorage
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/home");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Navbar</a>
        <button className="navbar-toggler" type="button" onClick={toggleNavbar}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Menu1</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Menu2</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Menu3</a>
            </li>
          </ul>
          <form className="d-flex">
            {CheckUserToken() ? (
              <div className="d-flex align-items-center">
                <span className="navbar-text mx-2">{user.username}</span>
                <button className="btn btn-outline-danger" type="button" onClick={handleLogout}>Logout</button>
              </div>
            ) : (
              <>
                <button className="btn btn-outline-success" type="button" style={{ marginRight: '5px' }} onClick={() => navigate("/register")}>Sign up</button>
                <button className="btn btn-outline-success" type="button" onClick={() => navigate("/login")}>Log in</button>
              </>
            )}
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
