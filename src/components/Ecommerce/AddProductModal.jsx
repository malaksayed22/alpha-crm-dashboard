import React, { useState } from 'react';
import { useSettings } from '../../context/SettingsContext';
import { translate } from '../../utils/translations';

const AddProductModal = ({ show, onClose, onAdd }) => {
  const { settings } = useSettings();
  const t = (key) => translate(key, settings.language);
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    units: '',
    category: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (productData.name && productData.price) {
      const newProduct = {
        id: Date.now(),
        name: productData.name,
        units: `${productData.units || 0} units sold`,
        revenue: `$${productData.price}`,
        image: `https://picsum.photos/200?random=${Date.now()}`
      };
      onAdd(newProduct);
      setProductData({ name: '', price: '', units: '', category: '' });
      onClose();
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h5 className="text-lg font-semibold text-gray-900">{t('Add New Product')}</h5>
          <button type="button" className="text-gray-400 hover:text-gray-600 text-2xl leading-none" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="px-6 py-4 overflow-y-auto">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('Product Name')} *</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={productData.name}
                onChange={(e) => setProductData({...productData, name: e.target.value})}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('Price')} *</label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={productData.price}
                onChange={(e) => setProductData({...productData, price: e.target.value})}
                required
                step="0.01"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('Units Sold')}</label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={productData.units}
                onChange={(e) => setProductData({...productData, units: e.target.value})}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('Category')}</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                value={productData.category}
                onChange={(e) => setProductData({...productData, category: e.target.value})}
              >
                <option value="">{t('Select Category')}</option>
                <option value="electronics">{t('Electronics')}</option>
                <option value="clothing">{t('Clothing')}</option>
                <option value="food">{t('Food & Beverage')}</option>
                <option value="home">{t('Home & Garden')}</option>
              </select>
            </div>
          </div>
          <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
            <button type="button" className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition" onClick={onClose}>
              {t('Cancel')}
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition shadow-sm">
              {t('Add Product')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
