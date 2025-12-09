import React from 'react';
import { useSettings } from '../../context/SettingsContext';
import { translate } from '../../utils/translations';

const ApplicationDefaultsCard = ({ defaultSettings, onSettingChange }) => {
  const { settings } = useSettings();
  const t = (key) => translate(key, settings.language);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="p-6 border-b border-slate-200">
        <h2 className="text-lg font-semibold text-slate-900">{t('Application Defaults')}</h2>
        <p className="text-sm text-slate-500 mt-1">Configure default settings for your workspace</p>
      </div>
      
      <div className="divide-y divide-slate-200">
        <div className="p-6 flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-900">{t('Language')}</p>
            <p className="text-sm text-slate-500 mt-1">Set the default language for the application.</p>
          </div>
          <div className="ml-6">
            <select 
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white text-sm min-w-[200px]"
              value={defaultSettings.language}
              onChange={(e) => onSettingChange('language', e.target.value)}
            >
              <option>English (US)</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
            </select>
          </div>
        </div>
        
        <div className="p-6 flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-900">{t('Timezone')}</p>
            <p className="text-sm text-slate-500 mt-1">Set the default timezone for dates and times.</p>
          </div>
          <div className="ml-6">
            <select 
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white text-sm min-w-[200px]"
              value={defaultSettings.timezone}
              onChange={(e) => onSettingChange('timezone', e.target.value)}
            >
              <option>Pacific Standard Time (PST)</option>
              <option>Mountain Standard Time (MST)</option>
              <option>Central Standard Time (CST)</option>
              <option>Eastern Standard Time (EST)</option>
            </select>
          </div>
        </div>
        
        <div className="p-6 flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-900">{t('Currency')}</p>
            <p className="text-sm text-slate-500 mt-1">Set the default currency for billing and reports.</p>
          </div>
          <div className="ml-6">
            <select 
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white text-sm min-w-[200px]"
              value={defaultSettings.currency}
              onChange={(e) => onSettingChange('currency', e.target.value)}
            >
              <option>USD ($)</option>
              <option>EUR (€)</option>
              <option>GBP (£)</option>
              <option>JPY (¥)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDefaultsCard;
