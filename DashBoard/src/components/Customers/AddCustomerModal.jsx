import React, { useState } from 'react';
import { useSettings } from '../../context/SettingsContext';
import { translate } from '../../utils/translations';

const AddCustomerModal = ({ show, onClose, onAdd }) => {
  const { settings } = useSettings();
  const t = (key) => translate(key, settings.language);
  const [customerData, setCustomerData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    status: 'Lead'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (customerData.name && customerData.email) {
      const newCustomer = {
        id: Date.now(),
        name: customerData.name,
        company: customerData.company || 'N/A',
        email: customerData.email,
        phone: customerData.phone || 'N/A',
        status: customerData.status,
        statusColor: customerData.status === 'Active' ? 'success' : customerData.status === 'Lead' ? 'primary' : 'danger',
        lastContact: 'Just now'
      };
      onAdd(newCustomer);
      setCustomerData({ name: '', company: '', email: '', phone: '', status: 'Lead' });
      onClose();
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h5 className="text-lg font-semibold text-gray-900">{t('Add New Customer')}</h5>
          <button type="button" className="text-gray-400 hover:text-gray-600 text-2xl leading-none" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="px-6 py-4 overflow-y-auto">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('Customer Name')} *</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={customerData.name}
                onChange={(e) => setCustomerData({...customerData, name: e.target.value})}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('Company')}</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={customerData.company}
                onChange={(e) => setCustomerData({...customerData, company: e.target.value})}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('Email')} *</label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={customerData.email}
                onChange={(e) => setCustomerData({...customerData, email: e.target.value})}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('Phone')}</label>
              <input
                type="tel"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={customerData.phone}
                onChange={(e) => setCustomerData({...customerData, phone: e.target.value})}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('Status')}</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                value={customerData.status}
                onChange={(e) => setCustomerData({...customerData, status: e.target.value})}
              >
                <option value="Lead">{t('Lead')}</option>
                <option value="Active">{t('Active')}</option>
                <option value="Churned">{t('Churned')}</option>
              </select>
            </div>
          </div>
          <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
            <button type="button" className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition" onClick={onClose}>
              {t('Cancel')}
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition shadow-sm">
              {t('Add Customer')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCustomerModal;
