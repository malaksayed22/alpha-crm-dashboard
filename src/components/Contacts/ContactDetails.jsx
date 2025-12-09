import React, { useState } from 'react';

const ContactDetails = ({ contact }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!contact) return null;

  return (
    <div className="contact-details-card">
      <div className="contact-header">
        <div className="d-flex align-items-center gap-3">
          <img 
            src={contact.avatar} 
            alt={contact.name}
            className="contact-avatar-large"
          />
          <div>
            <h2 className="contact-name-large">{contact.name}</h2>
            <p className="contact-company">
              {contact.position} at <a href="#" className="company-link">{contact.company}</a>
            </p>
          </div>
        </div>
        <div className="contact-actions">
          <button className="btn btn-outline-secondary">Edit</button>
          <button className="btn btn-primary">Log Activity</button>
          <button className="btn btn-outline-secondary">
            <i className="fa-solid fa-ellipsis"></i>
          </button>
        </div>
      </div>

      <div className="contact-tabs">
        <nav className="nav nav-tabs">
          <button 
            className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`nav-link ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            Communication History
          </button>
          <button 
            className={`nav-link ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            Associated Projects
          </button>
          <button 
            className={`nav-link ${activeTab === 'notes' ? 'active' : ''}`}
            onClick={() => setActiveTab('notes')}
          >
            Notes
          </button>
        </nav>
      </div>

      {activeTab === 'overview' && (
        <div className="contact-overview">
          <div className="row">
            <div className="col-md-8">
              <div className="info-section">
                <div className="info-item">
                  <h6 className="info-label">Email</h6>
                  <p className="info-value">{contact.email}</p>
                </div>
                <div className="info-item">
                  <h6 className="info-label">Phone</h6>
                  <p className="info-value">{contact.phone}</p>
                </div>
                <div className="info-item">
                  <h6 className="info-label">Address</h6>
                  <p className="info-value">{contact.address}</p>
                </div>
                <div className="info-item">
                  <h6 className="info-label">Socials</h6>
                  <div className="social-links">
                    <a href="#"><i className="fa-brands fa-facebook"></i></a>
                    <a href="#"><i className="fa-brands fa-twitter"></i></a>
                    <a href="#"><i className="fa-brands fa-linkedin"></i></a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="info-item">
                <h6 className="info-label">Tags</h6>
                <div className="tags-container">
                  {contact.tags.map((tag, index) => (
                    <span key={index} className="badge bg-secondary">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactDetails;
