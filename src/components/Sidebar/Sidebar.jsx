import React from 'react';
import { useSettings } from '../../context/SettingsContext';
import { translate } from '../../utils/translations';
import logo from '../../../DashBoard/src/assets/images/logo.jpg';

const Sidebar = ({ onNavigate, currentPage }) => {
  const { settings } = useSettings();
  const t = (key) => translate(key, settings.language);
  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    window.location.reload();
  };

  return (
    <aside className="flex w-64 flex-col border-r border-slate-200 bg-white p-4">
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
              onClick={() => onNavigate('ecommerce')}
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
              onClick={() => onNavigate('customers')}
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
              onClick={() => onNavigate('calendar')}
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
              onClick={() => onNavigate('leads')}
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
              onClick={() => onNavigate('account')}
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
              onClick={() => onNavigate('settings')}
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
  );
};

export default Sidebar;
