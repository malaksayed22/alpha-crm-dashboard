import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import CustomersHeader from './CustomersHeader';
import CustomersFilters from './CustomersFilters';
import CustomersTable from './CustomersTable';
import AddCustomerModal from './AddCustomerModal';

const CustomersPage = ({ onNavigate, currentPage: activePage }) => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    // Filter customers based on search and status
    let filtered = customers;

    if (searchQuery) {
      filtered = filtered.filter(customer =>
        customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.company.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter !== 'All') {
      filtered = filtered.filter(customer => customer.status === statusFilter);
    }

    setFilteredCustomers(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, statusFilter, customers]);

  const fetchCustomers = async () => {
    // Get current user once
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const userId = currentUser.id || 'guest';
    
    try {
      setLoading(true);
      
      // Check if user has saved data
      const savedCustomers = localStorage.getItem(`customers_${userId}`);
      
      if (savedCustomers) {
        // Load from localStorage
        setCustomers(JSON.parse(savedCustomers));
        setLoading(false);
        return;
      }
      
      // Fetch customers from users API only if no saved data
      const response = await fetch('https://jsonplaceholder.typicode.com/users?_limit=50');
      const data = await response.json();
      
      const formattedCustomers = data.map(user => ({
        id: user.id,
        name: user.name,
        company: user.company.name,
        email: user.email,
        phone: user.phone,
        status: user.id % 3 === 0 ? 'Churned' : user.id % 2 === 0 ? 'Lead' : 'Active',
        statusColor: user.id % 3 === 0 ? 'danger' : user.id % 2 === 0 ? 'primary' : 'success',
        lastContact: user.id % 2 === 0 ? '2 days ago' : '1 week ago'
      }));
      
      setCustomers(formattedCustomers);
      
      // Save to localStorage
      localStorage.setItem(`customers_${userId}`, JSON.stringify(formattedCustomers));
    } catch (error) {
      console.error('Error fetching customers, using fallback:', error);
      // Fallback mock data - 30 customers
      const mockCustomers = [
        { id: 1, name: 'John Doe', company: 'Tech Corp', email: 'john@techcorp.com', phone: '555-0101', status: 'Active', statusColor: 'success', lastContact: '1 week ago' },
        { id: 2, name: 'Jane Smith', company: 'Design Co', email: 'jane@designco.com', phone: '555-0102', status: 'Lead', statusColor: 'primary', lastContact: '2 days ago' },
        { id: 3, name: 'Mike Johnson', company: 'Sales Inc', email: 'mike@salesinc.com', phone: '555-0103', status: 'Churned', statusColor: 'danger', lastContact: '1 week ago' },
        { id: 4, name: 'Sarah Williams', company: 'Marketing Ltd', email: 'sarah@marketing.com', phone: '555-0104', status: 'Lead', statusColor: 'primary', lastContact: '2 days ago' },
        { id: 5, name: 'Tom Brown', company: 'Dev Studio', email: 'tom@devstudio.com', phone: '555-0105', status: 'Active', statusColor: 'success', lastContact: '1 week ago' },
        { id: 6, name: 'Emily Davis', company: 'Cloud Systems', email: 'emily@cloud.com', phone: '555-0106', status: 'Churned', statusColor: 'danger', lastContact: '2 days ago' },
        { id: 7, name: 'David Miller', company: 'Data Analytics', email: 'david@data.com', phone: '555-0107', status: 'Active', statusColor: 'success', lastContact: '1 week ago' },
        { id: 8, name: 'Lisa Wilson', company: 'AI Solutions', email: 'lisa@ai.com', phone: '555-0108', status: 'Lead', statusColor: 'primary', lastContact: '2 days ago' },
        { id: 9, name: 'James Moore', company: 'Cyber Security', email: 'james@cyber.com', phone: '555-0109', status: 'Churned', statusColor: 'danger', lastContact: '1 week ago' },
        { id: 10, name: 'Anna Taylor', company: 'Web Services', email: 'anna@web.com', phone: '555-0110', status: 'Lead', statusColor: 'primary', lastContact: '2 days ago' },
        { id: 11, name: 'Robert Anderson', company: 'Fintech Plus', email: 'robert@fintech.com', phone: '555-0111', status: 'Active', statusColor: 'success', lastContact: '3 days ago' },
        { id: 12, name: 'Maria Garcia', company: 'Health Innovate', email: 'maria@health.com', phone: '555-0112', status: 'Active', statusColor: 'success', lastContact: '1 day ago' },
        { id: 13, name: 'Chris Lee', company: 'EduTech', email: 'chris@edutech.com', phone: '555-0113', status: 'Lead', statusColor: 'primary', lastContact: '5 days ago' },
        { id: 14, name: 'Patricia Martinez', company: 'Green Energy', email: 'patricia@green.com', phone: '555-0114', status: 'Active', statusColor: 'success', lastContact: '2 weeks ago' },
        { id: 15, name: 'Daniel Thompson', company: 'Travel Hub', email: 'daniel@travel.com', phone: '555-0115', status: 'Churned', statusColor: 'danger', lastContact: '3 weeks ago' },
        { id: 16, name: 'Linda White', company: 'Fashion Forward', email: 'linda@fashion.com', phone: '555-0116', status: 'Active', statusColor: 'success', lastContact: '4 days ago' },
        { id: 17, name: 'Michael Harris', company: 'Food Delivery', email: 'michael@food.com', phone: '555-0117', status: 'Lead', statusColor: 'primary', lastContact: '1 week ago' },
        { id: 18, name: 'Jennifer Clark', company: 'PropTech', email: 'jennifer@prop.com', phone: '555-0118', status: 'Active', statusColor: 'success', lastContact: '6 days ago' },
        { id: 19, name: 'William Lewis', company: 'AutoMotive Inc', email: 'william@auto.com', phone: '555-0119', status: 'Churned', statusColor: 'danger', lastContact: '1 month ago' },
        { id: 20, name: 'Elizabeth Walker', company: 'Media Group', email: 'elizabeth@media.com', phone: '555-0120', status: 'Lead', statusColor: 'primary', lastContact: '2 days ago' },
        { id: 21, name: 'Richard Hall', company: 'Sports Analytics', email: 'richard@sports.com', phone: '555-0121', status: 'Active', statusColor: 'success', lastContact: '1 week ago' },
        { id: 22, name: 'Barbara Allen', company: 'Pet Care Pro', email: 'barbara@pet.com', phone: '555-0122', status: 'Active', statusColor: 'success', lastContact: '3 days ago' },
        { id: 23, name: 'Joseph Young', company: 'Gaming Studios', email: 'joseph@gaming.com', phone: '555-0123', status: 'Lead', statusColor: 'primary', lastContact: '5 days ago' },
        { id: 24, name: 'Susan King', company: 'Legal Services', email: 'susan@legal.com', phone: '555-0124', status: 'Active', statusColor: 'success', lastContact: '1 day ago' },
        { id: 25, name: 'Thomas Wright', company: 'Construction Co', email: 'thomas@construct.com', phone: '555-0125', status: 'Churned', statusColor: 'danger', lastContact: '2 weeks ago' },
        { id: 26, name: 'Jessica Lopez', company: 'Beauty Brands', email: 'jessica@beauty.com', phone: '555-0126', status: 'Lead', statusColor: 'primary', lastContact: '4 days ago' },
        { id: 27, name: 'Charles Hill', company: 'Insurance Plus', email: 'charles@insurance.com', phone: '555-0127', status: 'Active', statusColor: 'success', lastContact: '2 days ago' },
        { id: 28, name: 'Nancy Scott', company: 'Retail Chain', email: 'nancy@retail.com', phone: '555-0128', status: 'Active', statusColor: 'success', lastContact: '1 week ago' },
        { id: 29, name: 'Steven Green', company: 'Logistics Pro', email: 'steven@logistics.com', phone: '555-0129', status: 'Lead', statusColor: 'primary', lastContact: '3 days ago' },
        { id: 30, name: 'Karen Adams', company: 'Consulting Group', email: 'karen@consulting.com', phone: '555-0130', status: 'Active', statusColor: 'success', lastContact: '5 days ago' }
      ];
      setCustomers(mockCustomers);
      
      // Save to localStorage
      localStorage.setItem(`customers_${userId}`, JSON.stringify(mockCustomers));
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
  };

  const handleAddCustomer = (newCustomer) => {
    const updatedCustomers = [newCustomer, ...customers];
    setCustomers(updatedCustomers);
    
    // Save to localStorage
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const uid = user.id || 'guest';
    localStorage.setItem(`customers_${uid}`, JSON.stringify(updatedCustomers));
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(filteredCustomers, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `customers-${new Date().toISOString().split('T')[0]}.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar onNavigate={onNavigate} currentPage={activePage} />
      
      <main className="flex-1 overflow-y-auto md:ml-0">
        <div className="mx-auto max-w-7xl p-4 pt-16 md:pt-6 md:p-6">
          <CustomersHeader 
            onAddCustomer={() => setShowAddModal(true)}
            onExport={handleExport}
          />
          
          <div className="bg-white rounded-xl shadow-sm border border-slate-200">
            <CustomersFilters 
              searchQuery={searchQuery}
              onSearch={handleSearch}
              statusFilter={statusFilter}
              onStatusFilter={handleStatusFilter}
            />
            
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : (
              <>
                <CustomersTable 
                  customers={currentCustomers} 
                  totalItems={filteredCustomers.length}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            )}
          </div>
        </div>
      </main>
      
      <AddCustomerModal 
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddCustomer}
      />
    </div>
  );
};

export default CustomersPage;
