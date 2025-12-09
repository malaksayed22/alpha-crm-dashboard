import React, { useState } from 'react';
import { useSettings } from '../../context/SettingsContext';
import { translate } from '../../utils/translations';

const AddLeadModal = ({ show, onClose, onAdd }) => {
  const { settings } = useSettings();
  const t = (key) => translate(key, settings.language);
  const [leadData, setLeadData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    status: 'New'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (leadData.name && leadData.email) {
      // Get current user's avatar from localStorage
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      const userAvatar = currentUser.avatar || `https://i.pravatar.cc/150?img=1`;
      
      const newLead = {
        id: Date.now(),
        name: leadData.name,
        company: leadData.company || 'N/A',
        email: leadData.email,
        phone: leadData.phone || 'N/A',
        status: leadData.status,
        statusColor: leadData.status === 'Qualified' ? 'success' : leadData.status === 'Contacted' ? 'warning' : leadData.status === 'New' ? 'primary' : 'danger',
        assignedTo: userAvatar,
        lastContacted: new Date().toISOString().split('T')[0]
      };
      onAdd(newLead);
      setLeadData({ name: '', company: '', email: '', phone: '', status: 'New' });
      onClose();
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h5 className="text-lg font-semibold text-gray-900">{t('Add New Lead')}</h5>
          <button type="button" className="text-gray-400 hover:text-gray-600 text-2xl leading-none" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="px-6 py-4 overflow-y-auto">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('Lead Name')} *</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={leadData.name}
                onChange={(e) => setLeadData({...leadData, name: e.target.value})}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('Company')}</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={leadData.company}
                onChange={(e) => setLeadData({...leadData, company: e.target.value})}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('Email')} *</label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={leadData.email}
                onChange={(e) => setLeadData({...leadData, email: e.target.value})}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('Phone')}</label>
              <input
                type="tel"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={leadData.phone}
                onChange={(e) => setLeadData({...leadData, phone: e.target.value})}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('Status')}</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                value={leadData.status}
                onChange={(e) => setLeadData({...leadData, status: e.target.value})}
              >
                <option value="New">{t('New')}</option>
                <option value="Contacted">{t('Contacted')}</option>
                <option value="Qualified">{t('Qualified')}</option>
                <option value="Lost">{t('Lost')}</option>
              </select>
            </div>
          </div>
          <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
            <button type="button" className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition" onClick={onClose}>
              {t('Cancel')}
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition shadow-sm">
              {t('Add Lead')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLeadModal;
