import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGraduationCap, FaBars } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const isAuthenticated = localStorage.getItem('token') ? true : false;
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user session
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo/App Name */}
        <Link to="/" className="navbar-logo">
          <FaGraduationCap /> SholarSeek
        </Link>

        {/* Mobile Menu Toggle */}
        <div className="menu-icon">
          <FaBars />
        </div>

        {/* Navigation Links */}
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-links">
              Home
            </Link>
          </li>

          {isAuthenticated ? (
            <>
              <li className="nav-item">
                <Link to="/profile" className="nav-links">
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <button onClick={handleLogout} className="nav-links logout-btn">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <Link to="/login" className="nav-links">
                Login/Signup
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;