import React from 'react';
import { useSettings } from '../../context/SettingsContext';
import { translate } from '../../utils/translations';

const CalendarHeader = ({ onAddEvent }) => {
  const { settings } = useSettings();
  const t = (key) => translate(key, settings.language);

  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">{t('Calendar')}</h1>
        <p className="text-sm text-slate-500 mt-1">Manage your events and schedule</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <i className="fa-solid fa-search"></i>
          </span>
          <input 
            type="text"
            className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder={t('Search events...')}
          />
        </div>
        <button 
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-lg transition-all duration-300" 
          onClick={onAddEvent}
          style={{transition: 'all 0.3s ease', backgroundColor: '#256af4'}}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#1e4db8';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#256af4';
          }}
        >
          <i className="fa-solid fa-plus"></i>
          <span>{t('Add Event')}</span>
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader;
