import React from 'react';

const ProfileForm = ({ profileData, setProfileData }) => {
  const handleChange = (field, value) => {
    setProfileData({ ...profileData, [field]: value });
  };

  return (
    <div className="profile-form-section">
      <h2 className="section-title">Profile Information</h2>
      <div className="profile-form-card">
        <div className="row g-4">
          <div className="col-md-6">
            <label className="form-label">Full Name</label>
            <input 
              type="text"
              className="form-control form-control-lg"
              value={profileData.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Job Title</label>
            <input 
              type="text"
              className="form-control form-control-lg"
              value={profileData.jobTitle}
              onChange={(e) => handleChange('jobTitle', e.target.value)}
            />
          </div>
        </div>
        
        <div className="row g-4 mt-2">
          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input 
              type="email"
              className="form-control form-control-lg"
              value={profileData.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Password</label>
            <button className="btn btn-outline-secondary w-100 btn-lg">
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
