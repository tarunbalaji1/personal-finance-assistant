// File Path: src/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="card" style={{ textAlign: 'center' }}>
      <h2>Welcome to Your Personal Finance Assistant</h2>
      <p>Track your income and expenses, visualize your spending, and take control of your financial life.</p>
      <Link to="/dashboard" className="btn">
        Go to Dashboard
      </Link>
    </div>
  );
};

export default HomePage;