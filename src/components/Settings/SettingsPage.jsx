import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import SettingsHeader from './SettingsHeader';
import ApplicationDefaultsCard from './ApplicationDefaultsCard';
import { useSettings } from '../../context/SettingsContext';

const SettingsPage = ({ onNavigate, currentPage }) => {
  const { settings, updateSettings } = useSettings();

  const handleSettingChange = (field, value) => {
    const updatedSettings = { ...settings, [field]: value };
    updateSettings(updatedSettings);
  };

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar onNavigate={onNavigate} currentPage={currentPage} />
      
      <main className="flex-1 overflow-y-auto bg-slate-50">
        <div className="mx-auto max-w-7xl p-6">
          <SettingsHeader />
          
          <div className="mt-6">
            <ApplicationDefaultsCard 
              defaultSettings={settings}
              onSettingChange={handleSettingChange}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
