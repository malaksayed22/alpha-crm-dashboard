import React, { useState, useEffect, useRef } from 'react';
import { useSettings } from '../../context/SettingsContext';
import { translate } from '../../utils/translations';

const CustomersFilters = ({ searchQuery, onSearch, statusFilter, onStatusFilter }) => {
  const { settings } = useSettings();
  const t = (key) => translate(key, settings.language);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const statuses = ['All', 'Active', 'Lead', 'Churned'];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowStatusDropdown(false);
      }
    };

    if (showStatusDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showStatusDropdown]);

  return (
    <div className="flex flex-wrap items-center gap-4 p-4 border-b border-slate-200">
      <div className="flex-1 min-w-64">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <i className="fa-solid fa-search"></i>
          </span>
          <input 
            type="text"
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder={t('Search by name, email, or company...')}
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>
      
      <div className="relative" ref={dropdownRef}>
        <button 
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
          onClick={() => setShowStatusDropdown(!showStatusDropdown)}
        >
          {t('Status')}: {t(statusFilter)}
          <i className="fa-solid fa-chevron-down text-xs"></i>
        </button>
        {showStatusDropdown && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-lg z-10">
            {statuses.map(status => (
              <button 
                key={status}
                className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 first:rounded-t-lg last:rounded-b-lg transition-colors"
                onClick={() => {
                  onStatusFilter(status);
                  setShowStatusDropdown(false);
                }}
              >
                {t(status)}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomersFilters;
