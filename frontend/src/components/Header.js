// File Path: src/components/Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Header = ({ toggleTheme, currentTheme, isAuthenticated, onLogout }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    navigate('/'); // Redirect to home page after logout
  };

  return (
    <header className="header">
      <h1>💰 Personal Finance Assistant</h1>
      <div className="header-right">
        <nav>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <button onClick={handleLogoutClick} className="logout-btn">Logout</button>
            </>
          ) : (
            <>
              <Link to="/">Home</Link>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </>
          )}
        </nav>
        <ThemeToggle toggleTheme={toggleTheme} currentTheme={currentTheme} />
      </div>
    </header>
  );
};

export default Header;