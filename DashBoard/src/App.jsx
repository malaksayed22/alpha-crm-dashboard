import React, { useState } from 'react';
import { SettingsProvider } from './context/SettingsContext';
import LoginPage from './components/Auth/LoginPage';
import EcommercePage from './components/Ecommerce/EcommercePage';
import CustomersPage from './components/Customers/CustomersPage';
import CalendarPage from './components/Calendar/CalendarPage';
import LeadsPage from './components/Leads/LeadsPage';
import AccountPage from './components/Account/AccountPage';
import SettingsPage from './components/Settings/SettingsPage';

function App() {
  const [currentPage, setCurrentPage] = useState('ecommerce');

  const renderPage = () => {
    switch(currentPage) {
      case 'ecommerce':
        return <EcommercePage key="ecommerce" onNavigate={setCurrentPage} currentPage={currentPage} />;
      case 'customers':
        return <CustomersPage key="customers" onNavigate={setCurrentPage} currentPage={currentPage} />;
      case 'calendar':
        return <CalendarPage key="calendar" onNavigate={setCurrentPage} currentPage={currentPage} />;
      case 'leads':
        return <LeadsPage key="leads" onNavigate={setCurrentPage} currentPage={currentPage} />;
      case 'account':
        return <AccountPage key="account" onNavigate={setCurrentPage} currentPage={currentPage} />;
      case 'settings':
        return <SettingsPage key="settings" onNavigate={setCurrentPage} currentPage={currentPage} />;
      default:
        return <EcommercePage key="ecommerce" onNavigate={setCurrentPage} currentPage={currentPage} />;
    }
  };

  return (
   <SettingsProvider>
     {renderPage()}
   </SettingsProvider>
  )
}

export default App
