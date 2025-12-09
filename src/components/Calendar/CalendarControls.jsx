import React from 'react';
import { useSettings } from '../../context/SettingsContext';
import { translate } from '../../utils/translations';

const CalendarControls = ({ currentMonth, currentDate, view, onViewChange, onPrevMonth, onNextMonth, onToday }) => {
  const { settings } = useSettings();
  const t = (key) => translate(key, settings.language);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <button className="p-2 hover:bg-slate-200 rounded-lg transition-all" onClick={onPrevMonth}>
              <i className="fa-solid fa-chevron-left text-slate-600"></i>
            </button>
            <h2 className="text-xl font-semibold text-slate-900 min-w-48 text-center">{currentMonth}</h2>
            <button className="p-2 hover:bg-slate-200 rounded-lg transition-all" onClick={onNextMonth}>
              <i className="fa-solid fa-chevron-right text-slate-600"></i>
            </button>
          </div>
          <p className="text-sm text-slate-500 text-center">{t('Today')} is {currentDate}</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 hover:border-slate-400 transition-all" onClick={onToday}>
            {t('Today')}
          </button>
          <div className="flex bg-slate-100 rounded-lg p-1">
            <button
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                view === 'Month' 
                  ? 'bg-white text-slate-900 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              onClick={() => onViewChange('Month')}
            >
              {t('Month')}
            </button>
            <button
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                view === 'Week' 
                  ? 'bg-white text-slate-900 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              onClick={() => onViewChange('Week')}
            >
              {t('Week')}
            </button>
            <button
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                view === 'Day' 
                  ? 'bg-white text-slate-900 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              onClick={() => onViewChange('Day')}
            >
              {t('Day')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarControls;
