import React, { useState } from 'react';
import { uploadReceipt } from '../services/api';

const ReceiptUpload = ({ onReceiptScanned }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setError('');
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file first.');
      return;
    }

    setIsUploading(true);
    setError('');

    try {
      const response = await uploadReceipt(selectedFile);
      const extractedTotal = response.data.data.extracted.total;

      if (extractedTotal) {
        // Pass the extracted amount up to the Dashboard
        onReceiptScanned(extractedTotal);
      } else {
        setError('Could not automatically find a total amount. Please add the transaction manually.');
      }
    } catch (err) {
      console.error('Receipt upload failed:', err);
      setError('Failed to scan the receipt. Please try again or enter manually.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="card">
      <h3>Extract Expenses from Receipt</h3>
      <p style={{ color: 'var(--text-secondary-color)' }}>
        Upload an image of your receipt. Our system will try to find the total amount.
      </p>
      <div className="form-group">
  <label>Upload Receipt (Image or PDF)</label>
  {/* Add 'application/pdf' to the accept attribute */}
  <input type="file" accept="image/*,application/pdf" onChange={handleFileChange} />
</div>
      
      <button className="btn" onClick={handleUpload} disabled={isUploading}>
        {isUploading ? 'Scanning...' : 'Scan and Extract'}
      </button>
      
      {error && <p style={{ color: '#e74c3c', marginTop: '1rem' }}>{error}</p>}
    </div>
  );
};

export default ReceiptUpload;