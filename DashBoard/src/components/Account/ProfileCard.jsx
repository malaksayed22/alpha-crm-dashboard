import React from 'react';

const ProfileCard = ({ profileData }) => {
  return (
    <div className="profile-card">
      <div className="profile-card-content">
        <div className="profile-info">
          <img 
            src={profileData.avatar} 
            alt="User avatar"
            className="profile-avatar-large"
          />
          <div className="profile-details">
            <h2 className="profile-name">{profileData.fullName}</h2>
            <p className="profile-title">{profileData.jobTitle}</p>
          </div>
        </div>
        <button className="btn btn-outline-secondary change-photo-btn">
          Change Photo
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
