import React, { useState } from 'react';
import { useSettings } from '../../context/SettingsContext';
import { translate, translateRelativeDate } from '../../utils/translations';

const LeadsTable = ({ leads, currentPage, totalPages, onPageChange, onSort, sortBy }) => {
  const { settings } = useSettings();
  const t = (key) => translate(key, settings.language);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedLeads, setSelectedLeads] = useState([]);

  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLeads = leads.slice(indexOfFirstItem, indexOfLastItem);
  const totalItems = leads.length;

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedLeads([]);
    } else {
      setSelectedLeads(currentLeads.map(l => l.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectLead = (id) => {
    if (selectedLeads.includes(id)) {
      setSelectedLeads(selectedLeads.filter(lid => lid !== id));
    } else {
      setSelectedLeads([...selectedLeads, id]);
    }
  };

  const getSortIcon = (field) => {
    if (sortBy === field) {
      return <i className="fa-solid fa-sort-up ml-1"></i>;
    }
    return <i className="fa-solid fa-sort ml-1 text-slate-400"></i>;
  };

  const getBadgeClass = (statusColor) => {
    const badges = {
      success: 'px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800',
      warning: 'px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800',
      primary: 'px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800',
      danger: 'px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800'
    };
    return badges[statusColor] || 'px-2 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-800';
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="w-12 px-4 py-3 text-center">
                <input 
                  type="checkbox"
                  className="w-4 h-4 text-primary border-slate-300 rounded focus:ring-primary"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider cursor-pointer hover:text-slate-900" onClick={() => onSort('name')}>
                {t('Lead Name')} {getSortIcon('name')}
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider cursor-pointer hover:text-slate-900" onClick={() => onSort('company')}>
                {t('Company')} {getSortIcon('company')}
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider cursor-pointer hover:text-slate-900" onClick={() => onSort('status')}>
                {t('Status')} {getSortIcon('status')}
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">{t('Assigned To')}</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider cursor-pointer hover:text-slate-900" onClick={() => onSort('date')}>
                {t('Last Contacted')} {getSortIcon('date')}
              </th>
              <th className="w-20 px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider">{t('Actions')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {currentLeads.map(lead => (
              <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3 text-center">
                  <input 
                    type="checkbox"
                    className="w-4 h-4 text-primary border-slate-300 rounded focus:ring-primary"
                    checked={selectedLeads.includes(lead.id)}
                    onChange={() => handleSelectLead(lead.id)}
                  />
                </td>
                <td className="px-4 py-3 font-medium text-slate-900">{lead.name}</td>
                <td className="px-4 py-3 text-slate-500">{lead.company}</td>
                <td className="px-4 py-3">
                  <span className={getBadgeClass(lead.statusColor)}>
                    {t(lead.status)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <img 
                    src={lead.assignedTo} 
                    alt="Assigned to"
                    className="rounded-full"
                    style={{ width: '32px', height: '32px', objectFit: 'cover' }}
                  />
                </td>
                <td className="px-4 py-3 text-slate-500">{translateRelativeDate(lead.lastContacted, settings.language)}</td>
                <td className="px-4 py-3 text-center">
                  <button className="p-1 text-slate-400 hover:text-slate-600 transition-colors">
                    <i className="fa-solid fa-ellipsis"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="flex items-center justify-between px-4 py-3 border-t border-slate-200">
        <p className="text-sm text-slate-500">
          {t('Showing')} {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, totalItems)} {t('of')} {totalItems} {t('leads')}
        </p>
        <div className="flex gap-1">
          <button 
            className="px-3 py-1 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {t('Previous')}
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
            <button
              key={pageNum}
              className={`px-3 py-1 text-sm font-medium rounded-lg transition-colors ${
                pageNum === currentPage 
                  ? 'bg-primary text-white' 
                  : 'text-slate-700 bg-white border border-slate-300 hover:bg-slate-50'
              }`}
              onClick={() => onPageChange(pageNum)}
            >
              {pageNum}
            </button>
          ))}
          <button 
            className="px-3 py-1 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            {t('Next')}
          </button>
        </div>
      </div>
    </>
  );
};

export default LeadsTable;
