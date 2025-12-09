import React from 'react';
import { useSettings } from '../../context/SettingsContext';
import { translate } from '../../utils/translations';

const LeadsHeader = ({ onSearch, onAddLead, onExport }) => {
  const { settings } = useSettings();
  const t = (key) => translate(key, settings.language);

  return (
    <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">{t('Leads Management')}</h1>
        <p className="text-sm text-slate-500 mt-1">Track, assign, and manage your sales leads efficiently.</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <i className="fa-solid fa-search"></i>
          </span>
          <input 
            type="text"
            className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder={`${t('Search')} leads...`}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
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
          onClick={onAddLead}
          style={{transition: 'all 0.3s ease', backgroundColor: '#256af4'}}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#1e4db8';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#256af4';
          }}
        >
          <i className="fa-solid fa-plus"></i>
          {t('Add New Lead')}
        </button>
      </div>
    </div>
  );
};

export default LeadsHeader;
