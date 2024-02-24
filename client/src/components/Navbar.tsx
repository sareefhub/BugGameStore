import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { getUserData } from "../helper";
import "./Navbar.css";
import Dropdown from 'react-bootstrap/Dropdown';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const user = getUserData();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/home");
  };

  const handleLogoClick = () => {
    navigate('/home');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/home" onClick={handleLogoClick}>
          <img src={require("../Images/Logo_BugStore.png")} alt="Logo" />
        </a>
        <button className="navbar-toggler" type="button" onClick={toggleNavbar}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/home">สินค้าทั้งหมด</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/history">ประวัติการสั่งซื้อ</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/point">เติมพอยท์</a>
            </li>
          </ul>
          <ul className="navbar-nav">
            {user ? (
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {user.username}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="/profile">โปรไฟล์</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout}>ออกจากระบบ</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <>
                <li className="nav-item">
                  <button className="btn btn-outline-success" type="button" style={{ marginRight: '5px' }} onClick={() => navigate("/register")}>Sign up</button>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-success" type="button" onClick={() => navigate("/login")}>Log in</button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
