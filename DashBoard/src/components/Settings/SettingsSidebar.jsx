import React from 'react';

const SettingsSidebar = () => {
  return (
    <aside className="settings-sidebar">
      <div className="sidebar-header">
        <div className="settings-icon">
          <i className="fa-solid fa-gear"></i>
        </div>
        <div className="settings-info">
          <h1 className="settings-title">Application Settings</h1>
          <p className="settings-subtitle">Manage your system</p>
        </div>
      </div>
      
      <nav className="settings-nav">
        <div className="nav-item active">
          <i className="fa-solid fa-toggle-on"></i>
          <span>General</span>
        </div>
        <div className="nav-item">
          <i className="fa-solid fa-users"></i>
          <span>Users & Permissions</span>
        </div>
        <div className="nav-item">
          <i className="fa-solid fa-bell"></i>
          <span>Notifications</span>
        </div>
        <div className="nav-item">
          <i className="fa-solid fa-puzzle-piece"></i>
          <span>Integrations</span>
        </div>
        <div className="nav-item">
          <i className="fa-solid fa-code"></i>
          <span>API & Webhooks</span>
        </div>
        <div className="nav-item">
          <i className="fa-solid fa-receipt"></i>
          <span>Billing</span>
        </div>
      </nav>
    </aside>
  );
};

export default SettingsSidebar;
