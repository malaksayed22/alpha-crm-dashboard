import React from 'react';

const SecuritySection = () => {
  return (
    <div className="security-section">
      <h2 className="section-title">Account Security</h2>
      <div className="security-card">
        <div className="security-item">
          <div className="security-info">
            <p className="security-title">Two-Factor Authentication (2FA)</p>
            <p className="security-description">Add an extra layer of security to your account.</p>
          </div>
          <button className="btn btn-outline-secondary">
            Enable 2FA
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecuritySection;
