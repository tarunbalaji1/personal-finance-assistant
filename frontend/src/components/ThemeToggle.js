// File Path: src/components/ThemeToggle.js
import React from 'react';

const ThemeToggle = ({ toggleTheme, currentTheme }) => {
  return (
    <button onClick={toggleTheme} className="theme-toggle-btn">
      {currentTheme === 'light' ? '🌙' : '☀️'}
    </button>
  );
};

export default ThemeToggle;