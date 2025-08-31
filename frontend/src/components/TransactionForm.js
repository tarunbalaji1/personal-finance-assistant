import React, { useState, useEffect } from 'react';

const TransactionForm = ({ onAddTransaction, initialAmount }) => {
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [description, setDescription] = useState('');

  // This effect listens for a pre-filled amount from the receipt scanner
  // and updates the form's state accordingly.
  useEffect(() => {
    if (initialAmount) {
      setAmount(initialAmount);
    }
  }, [initialAmount]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category || !amount || !date) {
      alert('Please fill in all required fields.');
      return;
    }
    const newTransaction = {
      type,
      category,
      amount: parseFloat(amount),
      date,
      description
    };
    onAddTransaction(newTransaction);
    // Reset form after submission
    setCategory('');
    setAmount('');
    setDescription('');
  };

  return (
    <div className="card transaction-form">
      <h3>Add New Transaction</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
        <div className="form-group">
          <label>Category</label>
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g., Groceries, Salary" required />
        </div>
        <div className="form-group">
          <label>Amount</label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" required />
        </div>
        <div className="form-group">
          <label>Date</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Description (Optional)</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="e.g., Weekly shopping" />
        </div>
        <button type="submit" className="btn">Add Transaction</button>
      </form>
    </div>
  );
};

export default TransactionForm;