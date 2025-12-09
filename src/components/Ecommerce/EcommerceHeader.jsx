import React, { useState, useEffect, useRef } from 'react';
import { useSettings } from '../../context/SettingsContext';
import { translate } from '../../utils/translations';

const EcommerceHeader = ({ selectedMonth, onMonthChange, onAddProduct, onExport }) => {
  const { settings } = useSettings();
  const t = (key) => translate(key, settings.language);
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const months = ['This Month', 'Last Month', 'Last 3 Months', 'Last 6 Months', 'This Year'];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowMonthDropdown(false);
      }
    };

    if (showMonthDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMonthDropdown]);

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">{t('Ecommerce Dashboard')}</h1>
        <p className="text-sm text-slate-500 mt-1">An overview of your store's performance.</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative" ref={dropdownRef}>
          <button 
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
            onClick={() => setShowMonthDropdown(!showMonthDropdown)}
          >
            {selectedMonth}
            <i className="fa-solid fa-chevron-down text-xs"></i>
          </button>
          {showMonthDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-lg z-10">
              {months.map(month => (
                <button 
                  key={month}
                  className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 first:rounded-t-lg last:rounded-b-lg transition-colors"
                  onClick={() => {
                    onMonthChange(month);
                    setShowMonthDropdown(false);
                  }}
                >
                  {month}
                </button>
              ))}
            </div>
          )}
        </div>
        <button 
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 border border-slate-300 rounded-lg" 
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
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-lg" 
          onClick={onAddProduct}
          style={{transition: 'all 0.3s ease', backgroundColor: '#256af4'}}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#1e4db8';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#256af4';
          }}
        >
          <i className="fa-solid fa-plus"></i>
          {t('Add New Product')}
        </button>
      </div>
    </div>
  );
};

export default EcommerceHeader;
