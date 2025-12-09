import React from 'react';

const AccountSidebar = () => {
  return (
    <aside className="account-sidebar">
      <div className="sidebar-content">
        <div className="sidebar-header">
          <div className="user-profile">
            <img 
              src="https://i.pravatar.cc/150?img=33" 
              alt="User avatar"
              className="user-avatar"
            />
            <div className="user-info">
              <h1 className="user-name">Alex Doe</h1>
              <p className="user-email">alex.doe@example.com</p>
            </div>
          </div>
          
          <nav className="sidebar-nav">
            <div className="nav-item active">
              <i className="fa-solid fa-user-circle"></i>
              <span>My Account</span>
            </div>
            <div className="nav-item">
              <i className="fa-solid fa-sliders"></i>
              <span>Preferences</span>
            </div>
            <div className="nav-item">
              <i className="fa-solid fa-bell"></i>
              <span>Notifications</span>
            </div>
            <div className="nav-item">
              <i className="fa-solid fa-credit-card"></i>
              <span>Billing & Subscription</span>
            </div>
            <div className="nav-item">
              <i className="fa-solid fa-puzzle-piece"></i>
              <span>Integrations</span>
            </div>
          </nav>
        </div>
        
        <div className="sidebar-footer">
          <button className="btn btn-primary w-100 mb-3">
            Upgrade Plan
          </button>
          <div className="sidebar-actions">
            <div className="nav-item">
              <i className="fa-solid fa-circle-question"></i>
              <span>Help Center</span>
            </div>
            <div className="nav-item">
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
              <span>Log Out</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AccountSidebar;
