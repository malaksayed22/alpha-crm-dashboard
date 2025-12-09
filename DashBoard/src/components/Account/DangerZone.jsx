import React from 'react';

const DangerZone = () => {
  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // Add delete logic here
    }
  };

  return (
    <div className="danger-zone-section">
      <h2 className="section-title danger">Destructive Zone</h2>
      <div className="danger-card">
        <div className="danger-item">
          <div className="danger-info">
            <p className="danger-title">Delete Account</p>
            <p className="danger-description">
              Permanently delete your account and all associated data. This action cannot be undone.
            </p>
          </div>
          <button className="btn btn-danger" onClick={handleDeleteAccount}>
            Delete My Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default DangerZone;
