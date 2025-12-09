import React from 'react';
import { useSettings } from '../../context/SettingsContext';
import { translate } from '../../utils/translations';
import { formatCurrency } from '../../utils/currency';

const TopProducts = ({ products }) => {
  const { settings } = useSettings();
  const t = (key) => translate(key, settings.language);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 h-full flex flex-col max-h-[280px]">
      <h5 className="text-lg font-semibold text-gray-900 mb-3">{t('Top Products')}</h5>
      <div className="flex-1">
        {products.slice(0, 3).map(product => (
          <div key={product.id} className="flex items-center gap-2 py-1 hover:bg-slate-50 transition-colors rounded-lg cursor-pointer">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-8 h-8 rounded object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate leading-tight">{product.name}</p>
              <p className="text-xs text-gray-500 leading-tight">{product.units}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProducts;
