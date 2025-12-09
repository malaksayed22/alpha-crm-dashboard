import React from 'react';

const Header = () => {
  return (
    <div className="header">
      <div className="header-title">
        <h3>CRM Dashboard</h3>
        <small className="text-muted">Friday, January 12th 2024</small>
      </div>
      <div className="header-actions">
        <button className="icon-button">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
        <button className="icon-button">
          <i className="fa-regular fa-bell"></i>
        </button>
        <div className="user-profile">
          <div className="user-avatar"></div>
          <div className="user-info">
            <div className="user-name">malak</div>
            <small className="user-role">UI/UX Design</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
