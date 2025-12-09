import React, { useState, useEffect, useRef } from 'react';

const LeadsFilters = ({ statusFilter, onStatusFilter, assignedFilter, onAssignedFilter, onClearFilters }) => {
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const statuses = ['All', 'New', 'Contacted', 'Qualified', 'Lost'];

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
    <div className="flex items-center justify-between p-4 border-b border-slate-200">
      <div className="relative" ref={dropdownRef}>
        <button 
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
          onClick={() => setShowStatusDropdown(!showStatusDropdown)}
        >
          Status: {statusFilter}
          <i className="fa-solid fa-chevron-down text-xs"></i>
        </button>
        {showStatusDropdown && (
          <div className="absolute left-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-lg z-10">
            {statuses.map(status => (
              <button 
                key={status}
                className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 first:rounded-t-lg last:rounded-b-lg transition-colors"
                onClick={() => {
                  onStatusFilter(status);
                  setShowStatusDropdown(false);
                }}
              >
                {status}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadsFilters;
