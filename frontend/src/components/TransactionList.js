// File Path: src/components/TransactionList.js
import React, { useState, useMemo } from 'react';

const TransactionList = ({ transactions }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const filteredTransactions = useMemo(() => {
    return transactions.filter(tx => {
      if (!startDate || !endDate) return true; // If no dates are set, show all
      const txDate = new Date(tx.date);
      return txDate >= new Date(startDate) && txDate <= new Date(endDate);
    });
  }, [transactions, startDate, endDate]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  return (
    <div className="card transaction-list">
      <h3>History</h3>
      
      <div className="filter-container">
        <div className="form-group">
          <label>From:</label>
          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
        </div>
        <div className="form-group">
          <label>To:</label>
          <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
        </div>
      </div>

      <ul>
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map(tx => (
            <li key={tx._id} className={tx.type}>
              <div className="details">
                <span>{tx.description || tx.category}</span>
                <span className="category">{tx.category} - {formatDate(tx.date)}</span>
              </div>
              <span className="amount">
                {tx.type === 'expense' ? '-' : '+'}
                ₹{tx.amount.toFixed(2)}
              </span>
              <button className="delete-btn">X</button>
            </li>
          ))
        ) : (
          <p>No transactions found for the selected date range.</p>
        )}
      </ul>
    </div>
  );
};

export default TransactionList;