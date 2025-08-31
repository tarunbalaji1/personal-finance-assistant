import React, { useState, useEffect } from 'react';
import DashboardNav from '../components/DashboardNav';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import SummaryCharts from '../components/SummaryCharts';
import ReceiptUpload from '../components/ReceiptUpload';
// Import the real API functions
import { getTransactions, createTransaction } from '../services/api';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [activeView, setActiveView] = useState('list');
  const [loading, setLoading] = useState(true); // Add loading state

  // Function to fetch transactions from the backend
  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await getTransactions();
      // The actual data is in response.data.data
      setTransactions(response.data.data); 
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
      // If token is invalid (401), you might want to log the user out
    } finally {
      setLoading(false);
    }
  };

  // Fetch transactions when the component mounts
  useEffect(() => {
    fetchTransactions();
  }, []);

  // Handler to add a new transaction via the API
  const handleAddTransaction = async (transaction) => {
    //console.log('2. Received in Dashboard Component:', transaction);
    try {
      // Call the API to create the transaction in the database
      const response = await createTransaction(transaction);
      // Add the new transaction from the response to our state
      setTransactions([...transactions, response.data]);
      setActiveView('list'); // Switch back to the list view after adding
    } catch (error) {
      console.error('Failed to add transaction:', error);
      alert('Failed to add transaction.');
    }
  };
  
  const renderActiveView = () => {
    if (loading) {
      return <p>Loading...</p>; // Show loading indicator
    }
    
    switch (activeView) {
      case 'add':
        return <TransactionForm onAddTransaction={handleAddTransaction} />;
      case 'charts':
        return <SummaryCharts transactions={transactions} />;
      case 'upload':
        return <ReceiptUpload />;
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