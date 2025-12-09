import React from 'react';
import { useSettings } from '../../context/SettingsContext';
import { translate } from '../../utils/translations';

const CustomersPagination = ({ currentPage, totalPages, totalItems, itemsPerPage, onPageChange }) => {
  const { settings } = useSettings();
  const t = (key) => translate(key, settings.language);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 3; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 2; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
      <p className="text-sm text-gray-700">
        {t('Showing')} <span className="font-medium">{startItem}</span> {t('to')} <span className="font-medium">{endItem}</span> {t('of')} <span className="font-medium">{totalItems}</span> {t('results')}
      </p>
      
      <div className="flex items-center gap-1">
        <button 
          className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed" 
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          <i className="fa-solid fa-chevron-left text-sm"></i>
        </button>
        {getPageNumbers().map((page, index) => (
          page === '...' ? (
            <span key={`ellipsis-${index}`} className="px-3 py-1 text-gray-500">...</span>
          ) : (
            <button 
              key={page}
              className={`px-3 py-1 border rounded-lg transition ${
                currentPage === page 
                  ? 'bg-blue-600 text-white border-blue-600' 
                  : 'border-gray-300 hover:bg-gray-50 text-gray-700'
              }`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          )
        ))}
        <button 
          className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed" 
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          <i className="fa-solid fa-chevron-right text-sm"></i>
        </button>
      </div>
    </div>
  );
};

export default CustomersPagination;
