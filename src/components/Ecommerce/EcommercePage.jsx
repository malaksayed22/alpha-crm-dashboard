import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import EcommerceHeader from './EcommerceHeader';
import EcommerceStats from './EcommerceStats';
import SalesChart from './SalesChart';
import TopProducts from './TopProducts';
import RecentOrders from './RecentOrders';
import AddProductModal from './AddProductModal';

const EcommercePage = ({ onNavigate, currentPage }) => {
  const [stats, setStats] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState('This Month');
  const [showAddProductModal, setShowAddProductModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, [selectedMonth]);

  const fetchData = async () => {
    // Get current user once
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const userId = currentUser.id || 'guest';
    
    try {
      setLoading(true);
      
      // Check if user has saved data
      const savedProducts = localStorage.getItem(`products_${userId}`);
      const savedOrders = localStorage.getItem(`orders_${userId}`);
      
      if (savedProducts && savedOrders) {
        // Load from localStorage
        setProducts(JSON.parse(savedProducts));
        setOrders(JSON.parse(savedOrders));
        const multiplier = selectedMonth === 'This Month' ? 1 : selectedMonth === 'Last Month' ? 0.9 : selectedMonth === 'Last 3 Months' ? 2.5 : selectedMonth === 'Last 6 Months' ? 5 : 10;
        setStats([
        { id: 1, title: 'Total Sales', value: `$${(12450.50 * multiplier).toFixed(2)}`, change: '+12.5% vs last month', positive: true },
        { id: 2, title: 'Total Orders', value: Math.floor(JSON.parse(savedOrders).length * multiplier).toString(), change: '-2.1% vs last month', positive: false },
        { id: 3, title: 'Average Order Value', value: '$10.09', change: '+5.3% vs last month', positive: true },
        { id: 4, title: 'New Customers', value: Math.floor(87 * multiplier).toString(), change: '-1.0% vs last month', positive: false }
        ]);
        setLoading(false);
        return;
      }
      
      // Fetch products from API
      const productsResponse = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=4');
      const productsData = await productsResponse.json();
      
      // Fetch orders (using albums as orders)
      const ordersResponse = await fetch('https://jsonplaceholder.typicode.com/albums?_limit=4');
      const ordersData = await ordersResponse.json();
      
      // Format products
      const formattedProducts = productsData.map((item, index) => ({
        id: item.id,
        name: item.title.substring(0, 20),
        units: `${Math.floor(Math.random() * 300) + 100} units sold`,
        revenue: `$${(Math.random() * 5000 + 1000).toFixed(2)}`,
        image: `https://picsum.photos/200?random=${item.id}`
      }));
      
      // Format orders
      const formattedOrders = ordersData.map((album, index) => ({
        id: `#${12548 - index}`,
        customer: `Customer ${album.userId}`,
        date: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        total: `$${(Math.random() * 150 + 20).toFixed(2)}`,
        status: ['Shipped', 'Processing', 'Cancelled'][index % 3],
        statusColor: ['success', 'warning', 'danger'][index % 3]
      }));
      
      setProducts(formattedProducts);
      setOrders(formattedOrders);
      
      // Save to localStorage
      localStorage.setItem(`products_${userId}`, JSON.stringify(formattedProducts));
      localStorage.setItem(`orders_${userId}`, JSON.stringify(formattedOrders));
      
      // Set stats based on selected month
      const multiplier = selectedMonth === 'This Month' ? 1 : selectedMonth === 'Last Month' ? 0.9 : selectedMonth === 'Last 3 Months' ? 2.5 : selectedMonth === 'Last 6 Months' ? 5 : 10;
      setStats([
        { id: 1, title: 'Total Sales', value: `$${(12450.50 * multiplier).toFixed(2)}`, change: '+12.5% vs last month', positive: true },
        { id: 2, title: 'Total Orders', value: Math.floor(ordersData.length * 100 * multiplier).toString(), change: '-2.1% vs last month', positive: false },
        { id: 3, title: 'Average Order Value', value: '$10.09', change: '+5.3% vs last month', positive: true },
        { id: 4, title: 'New Customers', value: Math.floor(87 * multiplier).toString(), change: '-1.0% vs last month', positive: false }
      ]);
    } catch (error) {
      console.error('Error fetching data, using fallback:', error);
      // Fallback mock data
      const mockProducts = [
        { id: 1, name: 'Wireless Headphones', units: '234 units sold', revenue: '$3,450.00', image: 'https://picsum.photos/200?random=1' },
        { id: 2, name: 'Smart Watch Pro', units: '189 units sold', revenue: '$5,670.00', image: 'https://picsum.photos/200?random=2' },
        { id: 3, name: 'Laptop Stand', units: '156 units sold', revenue: '$2,340.00', image: 'https://picsum.photos/200?random=3' },
        { id: 4, name: 'USB-C Hub', units: '298 units sold', revenue: '$1,490.00', image: 'https://picsum.photos/200?random=4' }
      ];
      
      const mockOrders = [
        { id: '#12548', customer: 'John Smith', date: '2024-12-08', total: '$145.99', status: 'Shipped', statusColor: 'success' },
        { id: '#12547', customer: 'Sarah Johnson', date: '2024-12-07', total: '$89.50', status: 'Processing', statusColor: 'warning' },
        { id: '#12546', customer: 'Mike Brown', date: '2024-12-06', total: '$234.00', status: 'Cancelled', statusColor: 'danger' },
        { id: '#12545', customer: 'Emily Davis', date: '2024-12-05', total: '$67.25', status: 'Shipped', statusColor: 'success' }
      ];
      
      setProducts(mockProducts);
      setOrders(mockOrders);
      
      // Save to localStorage
      localStorage.setItem(`products_${userId}`, JSON.stringify(mockProducts));
      localStorage.setItem(`orders_${userId}`, JSON.stringify(mockOrders));
      
      const multiplier = selectedMonth === 'This Month' ? 1 : selectedMonth === 'Last Month' ? 0.9 : selectedMonth === 'Last 3 Months' ? 2.5 : selectedMonth === 'Last 6 Months' ? 5 : 10;
      setStats([
        { id: 1, title: 'Total Sales', value: `$${(12450.50 * multiplier).toFixed(2)}`, change: '+12.5% vs last month', positive: true },
        { id: 2, title: 'Total Orders', value: Math.floor(400 * multiplier).toString(), change: '-2.1% vs last month', positive: false },
        { id: 3, title: 'Average Order Value', value: '$10.09', change: '+5.3% vs last month', positive: true },
        { id: 4, title: 'New Customers', value: Math.floor(87 * multiplier).toString(), change: '-1.0% vs last month', positive: false }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = (newProduct) => {
    const updatedProducts = [newProduct, ...products];
    setProducts(updatedProducts);
    
    // Save to localStorage
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const uid = user.id || 'guest';
    localStorage.setItem(`products_${uid}`, JSON.stringify(updatedProducts));
  };

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar onNavigate={onNavigate} currentPage={currentPage} />
      
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-7xl p-6">
        <EcommerceHeader 
          selectedMonth={selectedMonth}
          onMonthChange={setSelectedMonth}
          onAddProduct={() => setShowAddProductModal(true)}
          onExport={() => {
            const dataStr = JSON.stringify({ stats, products, orders }, null, 2);
            const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
            const exportFileDefaultName = 'ecommerce-data.json';
            const linkElement = document.createElement('a');
            linkElement.setAttribute('href', dataUri);
            linkElement.setAttribute('download', exportFileDefaultName);
            linkElement.click();
          }}
        />
        
        <div>
          {loading ? (
            <div className="flex justify-center items-center" style={{ minHeight: '400px' }}>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              <EcommerceStats stats={stats} />
              
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mt-4">
                <div className="lg:col-span-4">
                  <SalesChart />
                </div>
                <div className="lg:col-span-1">
                  <TopProducts products={products} />
                </div>
              </div>

              <div className="mt-4">
                <RecentOrders orders={orders} />
              </div>
            </>
          )}
        </div>
        </div>
      </main>
      
      <AddProductModal 
        show={showAddProductModal}
        onClose={() => setShowAddProductModal(false)}
        onAdd={handleAddProduct}
      />
    </div>
  );
};

export default EcommercePage;
