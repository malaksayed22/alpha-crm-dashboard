import React from 'react';
import { useSettings } from '../../context/SettingsContext';
import { translate } from '../../utils/translations';

const PasswordCard = ({ passwordData, setPasswordData, onUpdate, message }) => {
  const { settings } = useSettings();
  const t = (key) => translate(key, settings.language);

  const handleChange = (field, value) => {
    setPasswordData({ ...passwordData, [field]: value });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="p-6 border-b border-slate-200">
        <h2 className="text-lg font-semibold text-slate-900">{t('Password Management')}</h2>
        <p className="text-sm text-slate-500 mt-1">Update your password to keep your account secure</p>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">{t('New Password')}</label>
            <input 
              type="password"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter new password (min 6 characters)"
              value={passwordData.newPassword}
              onChange={(e) => handleChange('newPassword', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">{t('Confirm New Password')}</label>
            <input 
              type="password"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Confirm new password"
              value={passwordData.confirmPassword}
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
            />
          </div>
        </div>
      </div>
      
      <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 rounded-b-xl">
        <div className="flex items-center gap-3">
          {message.text && (
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm ${
              message.type === 'success' 
                ? 'bg-green-50 text-green-800 border border-green-200' 
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              <i className={`fa-solid fa-${message.type === 'success' ? 'check-circle' : 'exclamation-circle'}`}></i>
              {message.text}
            </div>
          )}
          <button className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors" onClick={onUpdate}>
            {t('Update Password')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordCard;
