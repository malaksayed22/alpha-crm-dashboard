import React from 'react';
import { useSettings } from '../../context/SettingsContext';
import { translate } from '../../utils/translations';

const LeadsStats = ({ stats }) => {
  const { settings } = useSettings();
  const t = (key) => translate(key, settings.language);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map(stat => (
        <div key={stat.id}>
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <p className="text-sm font-medium text-gray-500 mb-2">{t(stat.title)}</p>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
            <p className={`text-sm font-semibold ${
              stat.positive === null ? 'text-gray-500' : 
              stat.positive ? 'text-green-600' : 'text-red-600'
            }`}>
              {stat.change}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LeadsStats;
