import React from 'react';
import { useSettings } from '../../context/SettingsContext';
import { translate } from '../../utils/translations';
import { formatCurrency } from '../../utils/currency';

const RecentOrders = ({ orders }) => {
  const { settings } = useSettings();
  const t = (key) => translate(key, settings.language);

  const getBadgeClass = (color) => {
    const badges = {
      success: 'bg-green-100 text-green-800',
      danger: 'bg-red-100 text-red-800',
      warning: 'bg-yellow-100 text-yellow-800',
      info: 'bg-blue-100 text-blue-800'
    };
    return badges[color] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h5 className="text-lg font-semibold text-gray-900 mb-4">{t('Recent Orders')}</h5>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Order ID</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Customer</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Date</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Total</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">{t('Status')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map(order => (
              <tr key={order.id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{order.id}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{order.customer}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{order.date}</td>
                <td className="px-4 py-3 text-sm font-semibold text-gray-900">{formatCurrency(order.total, settings.currency)}</td>
                <td className="px-4 py-3 text-sm">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getBadgeClass(order.statusColor)}`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;
