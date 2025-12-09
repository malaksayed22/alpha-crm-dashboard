import React, { useState, useEffect } from 'react';
import { useSettings } from '../../context/SettingsContext';
import { translate } from '../../utils/translations';

const AddEventModal = ({ show, onClose, onAdd, selectedDate }) => {
  const { settings } = useSettings();
  const t = (key) => translate(key, settings.language);
  const [formData, setFormData] = useState({
    title: '',
    date: selectedDate || '',
    time: '',
    description: '',
    color: 'purple'
  });

  useEffect(() => {
    if (selectedDate) {
      setFormData(prev => ({ ...prev, date: selectedDate }));
    }
  }, [selectedDate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.date) {
      alert('Please fill in title and date');
      return;
    }

    const newEvent = {
      id: Date.now(),
      ...formData,
      day: new Date(formData.date).getDate()
    };

    onAdd(newEvent);
    setFormData({
      title: '',
      date: '',
      time: '',
      description: '',
      color: 'purple'
    });
    onClose();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h5 className="text-lg font-semibold text-slate-900">{t('Add New Event')}</h5>
          <button className="text-slate-400 hover:text-slate-600 text-2xl leading-none" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">{t('Event Title')} *</label>
              <input
                type="text"
                name="title"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={formData.title}
                onChange={handleChange}
                placeholder={t('Enter event title')}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">{t('Date')} *</label>
                <input
                  type="date"
                  name="date"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">{t('Time')}</label>
                <input
                  type="time"
                  name="time"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={formData.time}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">{t('Description')}</label>
              <textarea
                name="description"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                placeholder={t('Event details...')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">{t('Color')}</label>
              <select
                name="color"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
                value={formData.color}
                onChange={handleChange}
              >
                <option value="purple">{t('Purple')}</option>
                <option value="blue">{t('Blue')}</option>
                <option value="green">{t('Green')}</option>
                <option value="red">{t('Red')}</option>
                <option value="orange">{t('Orange')}</option>
              </select>
            </div>
          </div>
          <div className="flex items-center justify-end gap-3 px-6 py-4 bg-slate-50 border-t border-slate-200 rounded-b-xl">
            <button type="button" className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors" onClick={onClose}>
              {t('Cancel')}
            </button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-blue-700 transition-colors">
              {t('Add Event')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEventModal;
