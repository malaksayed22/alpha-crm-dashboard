import React, { useState } from 'react';
import { useSettings } from '../../context/SettingsContext';
import { translate, translateRelativeDate } from '../../utils/translations';
import CustomersPagination from './CustomersPagination';

const CustomersTable = ({ customers, totalItems, currentPage, totalPages, onPageChange }) => {
  const { settings } = useSettings();
  const t = (key) => translate(key, settings.language);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedCustomers, setSelectedCustomers] = useState([]);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedCustomers([]);
    } else {
      setSelectedCustomers(customers.map(c => c.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectCustomer = (id) => {
    if (selectedCustomers.includes(id)) {
      setSelectedCustomers(selectedCustomers.filter(cid => cid !== id));
    } else {
      setSelectedCustomers([...selectedCustomers, id]);
    }
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
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">{t('Customer Name')}</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">{t('Company')}</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">{t('Email')}</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">{t('Phone')}</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">{t('Status')}</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">{t('Last Contact')}</th>
              <th className="w-12 px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {customers.map(customer => (
              <tr key={customer.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3 text-center">
                  <input 
                    type="checkbox"
                    className="w-4 h-4 text-primary border-slate-300 rounded focus:ring-primary"
                    checked={selectedCustomers.includes(customer.id)}
                    onChange={() => handleSelectCustomer(customer.id)}
                  />
                </td>
                <td className="px-4 py-3 font-medium text-slate-900">{customer.name}</td>
                <td className="px-4 py-3 text-slate-500">{customer.company}</td>
                <td className="px-4 py-3 text-slate-500">{customer.email}</td>
                <td className="px-4 py-3 text-slate-500">{customer.phone}</td>
                <td className="px-4 py-3">
                  <span className={getBadgeClass(customer.statusColor)}>
                    {t(customer.status)}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-500">{translateRelativeDate(customer.lastContact, settings.language)}</td>
                <td className="px-4 py-3 text-center">
                  <button className="p-1 text-slate-400 hover:text-slate-600 transition-colors">
                    <i className="fa-solid fa-ellipsis-vertical"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CustomersPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        totalItems={totalItems}
        itemsPerPage={10}
      />
    </>
  );
};

export default CustomersTable;
