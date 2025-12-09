import React from 'react';

const ContactsList = ({ contacts, onSelectContact }) => {
  return (
    <div className="contacts-list-card">
      <div className="search-filter-section">
        <div className="search-box">
          <i className="fa-solid fa-magnifying-glass search-icon"></i>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Search contacts..." 
          />
        </div>
        <div className="filter-buttons">
          <button className="btn btn-sm btn-outline-secondary dropdown-toggle">
            Company
          </button>
          <button className="btn btn-sm btn-outline-secondary dropdown-toggle">
            Tags
          </button>
          <button className="btn btn-sm btn-outline-secondary dropdown-toggle">
            Status
          </button>
        </div>
      </div>

      <div className="contacts-list">
        {contacts.map(contact => (
          <div 
            key={contact.id}
            className={`contact-item ${contact.selected ? 'selected' : ''}`}
            onClick={() => onSelectContact(contact)}
          >
            <img 
              src={contact.avatar} 
              alt={contact.name}
              className="contact-avatar"
            />
            <div className="contact-info">
              <div className="contact-name">{contact.name}</div>
              <div className="contact-position">
                {contact.position}, {contact.company}
              </div>
            </div>
            <span className={`badge bg-${contact.statusColor}`}>
              {contact.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactsList;
