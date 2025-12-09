import React from 'react';

const ContactsHeader = () => {
  return (
    <div className="contacts-header">
      <div className="header-title">
        <h3>Contacts Directory</h3>
      </div>
      <div className="header-actions">
        <button className="btn btn-primary d-flex align-items-center gap-2">
          <i className="fa-solid fa-plus"></i>
          <span>Add New Contact</span>
        </button>
        <button className="icon-button">
          <i className="fa-regular fa-bell"></i>
        </button>
        <div className="user-profile">
          <div className="user-avatar"></div>
        </div>
      </div>
    </div>
  );
};

export default ContactsHeader;
