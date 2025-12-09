import React, { useState, useEffect } from 'react';
import Sidebar from '../../Sidebar/Sidebar';
import Header from '../Header/Header';
import StatsCards from '../StatsCards/StatsCards';
import CustomerChart from '../CustomerChart/CustomerChart';
import SaleReport from '../SaleReport/SaleReport';
import LeadsReport from '../LeadsReport/LeadsReport';
import TopMentors from '../TopMentors/TopMentors';

const CRMDashboard = () => {
  const [stats, setStats] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [leads, setLeads] = useState([]);
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setStats([
      { id: 1, title: 'Total Customers', value: '23.4K', change: '+5.03%', positive: true, color: '#4B6BFB', icon: 'fa-users' },
      { id: 2, title: 'Active Customers', value: '13.4K', change: '-6.05%', positive: false, color: '#FF5757', icon: 'fa-user-plus' },
      { id: 3, title: 'Total Profit', value: '54.9K', change: '+8.04%', positive: true, color: '#FF8A57', icon: 'fa-arrow-trend-down' },
      { id: 4, title: 'Total Expense', value: '28.7K', change: '-3.03%', positive: false, color: '#4ADE80', icon: 'fa-arrow-up-right-from-square' }
    ]);

    setChartData([
      { month: 'Jan', profit: 35, expense: 25 },
      { month: 'Feb', profit: 38, expense: 28 },
      { month: 'Mar', profit: 20, expense: 18 },
      { month: 'Apr', profit: 42, expense: 32 },
      { month: 'May', profit: 18, expense: 15 },
      { month: 'Jun', profit: 28, expense: 22 },
      { month: 'Jul', profit: 22, expense: 18 }
    ]);

    setLeads([
      { id: 1, name: 'Guy Hawkins', email: 'electra@gmail.com', company: 'Partmaster Ltd', status: 'Completed', statusColor: 'success' },
      { id: 2, name: 'Jacob Jones', email: 'binhan@gmail.com', company: 'CDL Auto Parts', status: 'Follow Up', statusColor: 'danger' },
      { id: 3, name: 'Jenny Wilson', email: 'electra@gmail.com', company: 'Repco Grey Lynn', status: 'New Lead', statusColor: 'primary' }
    ]);

    setMentors([
      { id: 1, name: 'Wade Warren', role: 'UI/UX Designer' },
      { id: 2, name: 'Annette Black', role: 'UI/UX Designer' },
      { id: 3, name: 'Devon Lane', role: 'UI/UX Designer' },
      { id: 4, name: 'Jerome Bell', role: 'UI/UX Designer' }
    ]);
  };

  return (
    <div className="crm-container">
      <Sidebar />
      
      <div className="main-content">
        <Header />
        <StatsCards stats={stats} />
        
        <div className="row">
          <div className="col-lg-8 mb-4">
            <CustomerChart chartData={chartData} />
          </div>
          <div className="col-lg-4 mb-4">
            <SaleReport />
          </div>
        </div>

        <div className="row">
          <div className="col-lg-8 mb-4">
            <LeadsReport leads={leads} />
          </div>
          <div className="col-lg-4 mb-4">
            <TopMentors mentors={mentors} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CRMDashboard;
