import React, { useMemo } from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale,
  LinearScale,
  BarElement,
  Title
} from 'chart.js';

ChartJS.register(
  ArcElement, Tooltip, Legend, CategoryScale, 
  LinearScale, BarElement, Title
);

const SummaryCharts = ({ transactions }) => {

  // This block contains the data processing logic that was missing
  const chartData = useMemo(() => {
    if (!transactions) return {}; // Guard against undefined transactions prop

    const expenses = transactions.filter(tx => tx.type === 'expense');
    const income = transactions.filter(tx => tx.type === 'income');

    const expenseByCategory = expenses.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {});

    const totalIncome = income.reduce((sum, tx) => sum + tx.amount, 0);
    const totalExpense = expenses.reduce((sum, tx) => sum + tx.amount, 0);
    
    return { expenseByCategory, totalIncome, totalExpense };
  }, [transactions]);

  // --- Configuration for Doughnut Chart ---
  const doughnutChartData = {
    labels: Object.keys(chartData.expenseByCategory || {}),
    datasets: [{
      data: Object.values(chartData.expenseByCategory || {}),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40']
    }],
  };
  
  // --- Configuration for Income vs. Expense Bar Chart ---
  const barChartData = {
    labels: ['Financial Flow'],
    datasets: [
      {
        label: 'Total Income',
        data: [chartData.totalIncome],
        backgroundColor: 'rgba(46, 204, 113, 0.7)',
        borderColor: 'rgba(46, 204, 113, 1)',
        borderWidth: 1,
      },
      {
        label: 'Total Expense',
        data: [chartData.totalExpense],
        backgroundColor: 'rgba(231, 76, 60, 0.7)',
        borderColor: 'rgba(231, 76, 60, 1)',
        borderWidth: 1,
      }
    ]
  };
  
  const barChartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Total Income vs. Expense' },
      tooltip: { callbacks: { label: (context) => `₹${context.raw.toFixed(2)}` } }
    },
    scales: { y: { beginAtZero: true, ticks: { callback: (value) => `₹${value}` } } }
  };

  // --- Configuration for Horizontal Bar Chart (Spending by Category) ---
  const categoryBarData = {
    labels: Object.keys(chartData.expenseByCategory || {}),
    datasets: [
      {
        label: 'Amount Spent',
        data: Object.values(chartData.expenseByCategory || {}),
        backgroundColor: 'rgba(153, 102, 255, 0.7)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const categoryBarOptions = {
    maintainAspectRatio: false,
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Spending by Category (in ₹)' },
      tooltip: { callbacks: { label: (context) => `₹${context.raw.toFixed(2)}` } }
    },
    scales: { x: { beginAtZero: true, ticks: { callback: (value) => `₹${value}` } } }
  };

  // Conditional rendering to prevent errors if chartData is not ready
  if (!chartData || !chartData.expenseByCategory) {
    return <div className="card"><p>Loading chart data...</p></div>;
  }

  return (
    <div className="card">
      <h3>Financial Summary</h3>
      <div className="charts-container">
        <div className="chart-wrapper">
          <Bar options={barChartOptions} data={barChartData} />
        </div>
        <div className="chart-wrapper">
          <Bar options={categoryBarOptions} data={categoryBarData} />
        </div>
        <div className="chart-wrapper">
          {Object.keys(chartData.expenseByCategory).length > 0 ? (
            <Doughnut 
              data={doughnutChartData} 
              options={{
                maintainAspectRatio: false,
                plugins: { title: { display: true, text: 'Expense Proportions' } }
              }}
            />
          ) : (
            <p>No expense data to display.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SummaryCharts;