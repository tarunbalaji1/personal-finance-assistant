import React, { useState, useMemo } from 'react';

const TransactionList = ({ transactions }) => {
  // --- STATE AND LOGIC (No changes here) ---
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filteredTransactions = useMemo(() => {
    return transactions.filter(tx => {
      const txDate = new Date(tx.date);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;
      if (start && txDate < start) return false;
      if (end && txDate > end) return false;
      if (filterType !== 'all' && tx.type !== filterType) return false;
      return true;
    });
  }, [transactions, startDate, endDate, filterType]);

  const summary = useMemo(() => {
    return filteredTransactions.reduce((acc, tx) => {
      if (tx.type === 'income') {
        acc.totalIncome += tx.amount;
      } else {
        acc.totalExpense += tx.amount;
      }
      return acc;
    }, { totalIncome: 0, totalExpense: 0 });
  }, [filteredTransactions]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  return (
    <div className="card transaction-list">
      {/* --- Summary and filter controls are unchanged --- */}
      <div className="summary-container">
        <div className="summary-box income-summary">
          <span>Net Income</span>
          <span className="amount">₹{summary.totalIncome.toFixed(2)}</span>
        </div>
        <div className="summary-box expense-summary">
          <span>Net Expense</span>
          <span className="amount">₹{summary.totalExpense.toFixed(2)}</span>
        </div>
      </div>
      <h3>History</h3>
      <div className="filter-controls">
        <div className="filter-buttons">
          <button onClick={() => setFilterType('all')} className={`filter-btn ${filterType === 'all' ? 'active' : ''}`}>All</button>
          <button onClick={() => setFilterType('income')} className={`filter-btn ${filterType === 'income' ? 'active' : ''}`}>Income</button>
          <button onClick={() => setFilterType('expense')} className={`filter-btn ${filterType === 'expense' ? 'active' : ''}`}>Expense</button>
        </div>
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
      </div>

      {/* --- NEW: Table Header --- */}
      <div className="list-header">
        <span className="header-date">Date</span>
        <span className="header-details">Description</span>
        <span className="header-amount">Amount</span>
      </div>

      <ul>
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map(tx => {
            const { description, category } = tx;
            let displayText = description || category;
            if (description && category && description !== category) {
              displayText = `${description} (${category})`;
            }

            return (
              // --- MODIFIED: List item with a new column structure ---
              <li key={tx._id} className={tx.type}>
                <span className="date-column">{formatDate(tx.date)}</span>
                
                <div className="details-column">
                  <span className="description">{displayText}</span>
                </div>

                <div className="amount-container">
                  <span className="amount">
                    {tx.type === 'expense' ? '-' : '+'}
                    ₹{tx.amount.toFixed(2)}
                  </span>
                  <button className="delete-btn">X</button>
                </div>
              </li>
            );
          })
        ) : (
          <p>No transactions found for the selected filters.</p>
        )}
      </ul>
    </div>
  );
};

export default TransactionList;