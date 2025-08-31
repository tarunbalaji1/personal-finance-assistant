import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api'; // Make sure this is imported

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // --- THIS IS THE FIX ---
      // The API call below was previously commented out. Now it's active.
      const response = await registerUser({ username, email, password });
      
      console.log('User registered successfully:', response.data);
      alert('Sign up successful! Please log in.');
      navigate('/login');

    } catch (error) {
      console.error('Sign up failed:', error.response || error);
      // Display a more specific error message from the backend if available
      const errorMsg = error.response ? error.response.data.msg : 'Sign up failed. Please try again.';
      alert(errorMsg);
    }
  };

  return (
    <div className="card" style={{ maxWidth: '500px', margin: 'auto' }}>
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;