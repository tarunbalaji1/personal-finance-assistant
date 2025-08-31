// File Path: src/components/DashboardNav.js
import React from 'react';

const DashboardNav = ({ setActiveView, activeView }) => {
  return (
    <div className="dashboard-nav">
      <button 
        className={`nav-btn ${activeView === 'add' ? 'active' : ''}`}
        onClick={() => setActiveView('add')}>
        Add Transaction
      </button>
      <button 
        className={`nav-btn ${activeView === 'list' ? 'active' : ''}`}
        onClick={() => setActiveView('list')}>
        List Transactions
      </button>
      <button 
        className={`nav-btn ${activeView === 'charts' ? 'active' : ''}`}
        onClick={() => setActiveView('charts')}>
        View Charts
      </button>
      <button 
        className={`nav-btn ${activeView === 'upload' ? 'active' : ''}`}
        onClick={() => setActiveView('upload')}>
        Upload Receipt
      </button>
    </div>
  );
};

export default DashboardNav;