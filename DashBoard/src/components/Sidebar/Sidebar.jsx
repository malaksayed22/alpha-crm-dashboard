import React, { useState } from 'react';
import { useSettings } from '../../context/SettingsContext';
import { translate } from '../../utils/translations';
import logo from '../../../DashBoard/src/assets/images/logo.jpg';

const Sidebar = ({ onNavigate, currentPage }) => {
  const { settings } = useSettings();
  const t = (key) => translate(key, settings.language);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    window.location.reload();
  };

  const handleNavigation = (page) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <style>{`
        @media (min-width: 768px) {
          .mobile-menu-btn { display: none !important; }
          .desktop-sidebar { display: flex !important; }
          .mobile-sidebar { display: none !important; }
        }
        @media (max-width: 767px) {
          .mobile-menu-btn { display: block !important; }
          .desktop-sidebar { display: none !important; }
          .mobile-sidebar { display: ${isMobileMenuOpen ? 'flex' : 'none'} !important; }
        }
      `}</style>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="mobile-menu-btn fixed top-4 left-4 z-50 p-3 bg-primary text-white rounded-lg shadow-lg"
      >
        <i className={`fa-solid ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-lg`}></i>
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* Desktop Sidebar */}
      <aside className="desktop-sidebar w-64 flex-col border-r border-slate-200 bg-white p-4">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
          <img src={logo} alt="Alpha Logo" className="rounded" style={{ width: '40px', height: '40px', objectFit: 'cover' }} />
          <h2 className="text-xl font-semibold">Alpha</h2>
        </div>
        
        <div className="flex-1 py-4 overflow-auto">
          <div className="mb-6">
            <small className="text-xs font-semibold text-slate-500 uppercase px-2 mb-2 block">{t('Overview')}</small>
            <div className="space-y-1">
              <div 
                className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                  currentPage === 'ecommerce' 
                    ? 'bg-primary text-white' 
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
                onClick={() => handleNavigation('ecommerce')}
                role="button"
              >
                <i className="fa-solid fa-table-cells-large"></i>
                <span>{t('Ecommerce')}</span>
              </div>
              <div 
                className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                  currentPage === 'customers' 
                    ? 'bg-primary text-white' 
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
                onClick={() => handleNavigation('customers')}
                role="button"
              >
                <i className="fa-solid fa-users"></i>
                <span>{t('Customers')}</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <small className="text-xs font-semibold text-slate-500 uppercase px-2 mb-2 block">{t('Project')}</small>
            <div className="space-y-1">
              <div 
                className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                  currentPage === 'calendar' 
                    ? 'bg-primary text-white' 
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
                onClick={() => handleNavigation('calendar')}
                role="button"
              >
                <i className="fa-regular fa-calendar"></i>
                <span>{t('Calendar')}</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <small className="text-xs font-semibold text-slate-500 uppercase px-2 mb-2 block">{t('Tools')}</small>
            <div className="space-y-1">
              <div 
                className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                  currentPage === 'leads' 
                    ? 'bg-primary text-white' 
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
                onClick={() => handleNavigation('leads')}
                role="button"
              >
                <i className="fa-regular fa-note-sticky"></i>
                <span>{t('Leads')}</span>
              </div>
              <div 
                className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                  currentPage === 'account' 
                    ? 'bg-primary text-white' 
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
                onClick={() => handleNavigation('account')}
                role="button"
              >
                <i className="fa-solid fa-user"></i>
                <span>{t('Account')}</span>
              </div>
              <div 
                className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                  currentPage === 'settings' 
                    ? 'bg-primary text-white' 
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
                onClick={() => handleNavigation('settings')}
                role="button"
              >
                <i className="fa-solid fa-gear"></i>
                <span>{t('Settings')}</span>
              </div>
              <div 
                className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-red-600 hover:bg-red-50 transition-colors mt-2"
                onClick={handleLogout}
                role="button"
              >
                <i className="fa-solid fa-right-from-bracket"></i>
                <span>{t('Logout')}</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Sliding Sidebar */}
      <aside className="mobile-sidebar fixed inset-y-0 left-0 z-50 w-64 flex-col border-r border-slate-200 bg-white p-4 shadow-2xl">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
          <img src={logo} alt="Alpha Logo" className="rounded" style={{ width: '40px', height: '40px', objectFit: 'cover' }} />
          <h2 className="text-xl font-semibold">Alpha</h2>
        </div>
        
        <div className="flex-1 py-4 overflow-auto">
          <div className="space-y-2">
            <div
              className={`flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer transition-colors ${
                currentPage === 'ecommerce'
                  ? 'bg-primary text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
              onClick={() => handleNavigation('ecommerce')}
              role="button"
            >
              <i className="fa-solid fa-table-cells-large text-lg"></i>
              <span className="font-medium">{t('Ecommerce')}</span>
            </div>

            <div
              className={`flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer transition-colors ${
                currentPage === 'customers'
                  ? 'bg-primary text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
              onClick={() => handleNavigation('customers')}
              role="button"
            >
              <i className="fa-solid fa-users text-lg"></i>
              <span className="font-medium">{t('Customers')}</span>
            </div>

            <div
              className={`flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer transition-colors ${
                currentPage === 'calendar'
                  ? 'bg-primary text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
              onClick={() => handleNavigation('calendar')}
              role="button"
            >
              <i className="fa-regular fa-calendar text-lg"></i>
              <span className="font-medium">{t('Calendar')}</span>
            </div>

            <div
              className={`flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer transition-colors ${
                currentPage === 'leads'
                  ? 'bg-primary text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
              onClick={() => handleNavigation('leads')}
              role="button"
            >
              <i className="fa-regular fa-note-sticky text-lg"></i>
              <span className="font-medium">{t('Leads')}</span>
            </div>

            <div
              className={`flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer transition-colors ${
                currentPage === 'account'
                  ? 'bg-primary text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
              onClick={() => handleNavigation('account')}
              role="button"
            >
              <i className="fa-solid fa-user text-lg"></i>
              <span className="font-medium">{t('Account')}</span>
            </div>

            <div
              className={`flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer transition-colors ${
                currentPage === 'settings'
                  ? 'bg-primary text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
              onClick={() => handleNavigation('settings')}
              role="button"
            >
              <i className="fa-solid fa-gear text-lg"></i>
              <span className="font-medium">{t('Settings')}</span>
            </div>
            
            <div 
              className="flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer text-red-600 hover:bg-red-50 transition-colors mt-4"
              onClick={handleLogout}
              role="button"
            >
              <i className="fa-solid fa-right-from-bracket text-lg"></i>
              <span className="font-medium">{t('Logout')}</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
