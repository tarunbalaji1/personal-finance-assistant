import React, { useState, useEffect } from 'react';
import DashboardNav from '../components/DashboardNav';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import SummaryCharts from '../components/SummaryCharts';
import ReceiptUpload from '../components/ReceiptUpload';
import { getTransactions, createTransaction } from '../services/api';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [activeView, setActiveView] = useState('list');
  const [loading, setLoading] = useState(true);
  const [extractedAmount, setExtractedAmount] = useState(null);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await getTransactions();
      setTransactions(response.data.data); 
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // --- THIS FUNCTION WAS MISSING ---
  // Re-added the handler to save new transactions
  const handleAddTransaction = async (transaction) => {
    try {
      const response = await createTransaction(transaction);
      // Add the new transaction from the response to our state
      setTransactions(prevTransactions => [...prevTransactions, response.data]);
      setExtractedAmount(null); // Clear the extracted amount after use
      setActiveView('list'); // Switch back to the list view after adding
    } catch (error) {
      console.error('Failed to add transaction:', error);
      alert('Failed to add transaction.');
    }
  };

  // Handler for when a receipt is successfully scanned
  const handleReceiptScanned = (amount) => {
    setExtractedAmount(amount);
    setActiveView('add');
  };
  
  const renderActiveView = () => {
    if (loading && activeView === 'list') {
      return <p>Loading...</p>;
    }
    
    switch (activeView) {
      case 'add':
        // This now works because handleAddTransaction is defined above
        return <TransactionForm onAddTransaction={handleAddTransaction} initialAmount={extractedAmount} />;
      case 'charts':
        return <SummaryCharts transactions={transactions} />;
      case 'upload':
        return <ReceiptUpload onReceiptScanned={handleReceiptScanned} />;
      case 'list':
      default:
        return <TransactionList transactions={transactions} />;
    }
  };

  return (
    <div>
      <DashboardNav setActiveView={setActiveView} activeView={activeView} />
      <div className="dashboard-content">
        {renderActiveView()}
      </div>
    </div>
  );
};

export default Dashboard;