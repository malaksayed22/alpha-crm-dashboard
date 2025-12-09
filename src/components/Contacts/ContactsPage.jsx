import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import ContactsHeader from './ContactsHeader';
import ContactsList from './ContactsList';
import ContactDetails from './ContactDetails';

const ContactsPage = () => {
  const [contacts, setContacts] = useState([
    { 
      id: 1, 
      name: 'Olivia Martin', 
      position: 'Product Manager', 
      company: 'Innovate Inc.', 
      status: 'Lead',
      statusColor: 'primary',
      email: 'olivia.martin@innovate.com',
      phone: '(555) 123-4567',
      address: '123 Tech Avenue, Silicon Valley, CA 94043',
      tags: ['Enterprise', 'SaaS', 'High-Priority'],
      avatar: 'https://i.pravatar.cc/150?img=1',
      selected: true
    },
    { 
      id: 2, 
      name: 'Liam Johnson', 
      position: 'CEO', 
      company: 'FutureTech', 
      status: 'Customer',
      statusColor: 'success',
      email: 'liam.johnson@futuretech.com',
      phone: '(555) 234-5678',
      address: '456 Innovation Drive, San Francisco, CA 94102',
      tags: ['Enterprise'],
      avatar: 'https://i.pravatar.cc/150?img=2',
      selected: false
    },
    { 
      id: 3, 
      name: 'Sophia Davis', 
      position: 'Marketing Lead', 
      company: 'DataSolutions', 
      status: 'Follow-up',
      statusColor: 'warning',
      email: 'sophia.davis@datasolutions.com',
      phone: '(555) 345-6789',
      address: '789 Market Street, Austin, TX 78701',
      tags: ['SaaS'],
      avatar: 'https://i.pravatar.cc/150?img=3',
      selected: false
    },
    { 
      id: 4, 
      name: 'Noah Garcia', 
      position: 'Lead Developer', 
      company: 'AppWorks', 
      status: 'Archived',
      statusColor: 'secondary',
      email: 'noah.garcia@appworks.com',
      phone: '(555) 456-7890',
      address: '321 Tech Park, Seattle, WA 98101',
      tags: [],
      avatar: 'https://i.pravatar.cc/150?img=4',
      selected: false
    },
    { 
      id: 5, 
      name: 'Isabella Chen', 
      position: 'VP of Sales', 
      company: 'QuantumLeap', 
      status: 'Customer',
      statusColor: 'success',
      email: 'isabella.chen@quantumleap.com',
      phone: '(555) 567-8901',
      address: '654 Business Blvd, New York, NY 10001',
      tags: ['Enterprise', 'High-Priority'],
      avatar: 'https://i.pravatar.cc/150?img=5',
      selected: false
    }
  ]);

  const [selectedContact, setSelectedContact] = useState(contacts[0]);

  const handleSelectContact = (contact) => {
    setContacts(contacts.map(c => ({
      ...c,
      selected: c.id === contact.id
    })));
    setSelectedContact(contact);
  };

  return (
    <div className="contacts-container">
      <Sidebar />
      
      <div className="main-content">
        <ContactsHeader />
        
        <div className="contacts-content">
          <div className="row g-4">
            <div className="col-lg-4">
              <ContactsList 
                contacts={contacts} 
                onSelectContact={handleSelectContact}
              />
            </div>
            <div className="col-lg-8">
              <ContactDetails contact={selectedContact} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactsPage;
