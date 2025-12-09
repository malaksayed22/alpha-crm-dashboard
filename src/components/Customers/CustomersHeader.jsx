import React from 'react';
import { useSettings } from '../../context/SettingsContext';
import { translate } from '../../utils/translations';

const CustomersHeader = ({ onAddCustomer, onExport }) => {
  const { settings } = useSettings();
  const t = (key) => translate(key, settings.language);

  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold text-slate-900">{t('Customers')}</h1>
      <div className="flex items-center gap-3">
        <button 
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 border border-slate-300 rounded-lg transition-all duration-300" 
          onClick={onExport}
          style={{transition: 'all 0.3s ease', backgroundColor: 'white'}}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#e2e8f0';
            e.currentTarget.style.borderColor = '#94a3b8';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'white';
            e.currentTarget.style.borderColor = '#cbd5e1';
          }}
        >
          <i className="fa-solid fa-download"></i>
          {t('Export')}
        </button>
        <button 
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-lg transition-all duration-300" 
          onClick={onAddCustomer}
          style={{transition: 'all 0.3s ease', backgroundColor: '#256af4'}}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#1e4db8';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#256af4';
          }}
        >
          <i className="fa-solid fa-plus"></i>
          {t('Add New Customer')}
        </button>
      </div>
    </div>
  );
};

export default CustomersHeader;
