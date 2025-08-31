// File Path: src/components/ReceiptUpload.js
import React from 'react';

const ReceiptUpload = () => {
  return (
    <div className="card">
      <h3>Extract Expenses from Receipt</h3>
      <div className="form-group">
        <label>Upload Receipt (Image or PDF)</label>
        <input type="file" />
      </div>
      <button className="btn">Scan and Extract</button>
      <p style={{marginTop: '1rem', color: '#7f8c8d'}}>
        This feature will allow you to upload a receipt, and the system will automatically extract the transaction details.
      </p>
    </div>
  );
};

export default ReceiptUpload;