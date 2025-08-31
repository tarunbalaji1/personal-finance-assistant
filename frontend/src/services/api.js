import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

// Use an interceptor to add the auth token to every request
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
});

// --- ADD THIS NEW FUNCTION ---
// Function to upload a receipt file
export const uploadReceipt = (file) => {
  const formData = new FormData();
  formData.append('receipt', file); // 'receipt' must match the backend field name
  
  return api.post('/upload/receipt', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// --- Existing Functions ---
export const getTransactions = () => api.get('/transactions');
export const createTransaction = (transaction) => api.post('/transactions', transaction);
export const deleteTransaction = (id) => api.delete(`/transactions/${id}`);
export const loginUser = (credentials) => api.post('/users/login', credentials);
export const registerUser = (userData) => api.post('/users/register', userData);

export default api;