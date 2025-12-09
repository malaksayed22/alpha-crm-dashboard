import React from 'react';

const CompanyProfileCard = ({ companyData, setCompanyData }) => {
  const handleChange = (field, value) => {
    setCompanyData({ ...companyData, [field]: value });
  };

  return (
    <div className="company-profile-card">
      <div className="card-header">
        <div>
          <h2 className="card-title">Company Profile</h2>
          <p className="card-description">Update your company's profile and branding</p>
        </div>
      </div>
      
      <div className="card-body">
        <div className="logo-section">
          <div className="logo-display">
            <img 
              src={companyData.logo} 
              alt="Company logo"
              className="company-logo"
            />
            <p className="logo-label">Company Logo</p>
          </div>
          <div className="logo-actions">
            <button className="btn btn-outline-secondary">
              Remove
            </button>
            <button className="btn btn-primary">
              Upload
            </button>
          </div>
        </div>
        
        <div className="row g-4 mt-2">
          <div className="col-md-6">
            <label className="form-label">Company Name</label>
            <input 
              type="text"
              className="form-control settings-input"
              placeholder="Enter company name"
              value={companyData.companyName}
              onChange={(e) => handleChange('companyName', e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Contact Email</label>
            <input 
              type="email"
              className="form-control settings-input"
              placeholder="Enter contact email"
              value={companyData.contactEmail}
              onChange={(e) => handleChange('contactEmail', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfileCard;
