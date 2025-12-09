import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import LeadsHeader from './LeadsHeader';
import LeadsStats from './LeadsStats';
import LeadsFilters from './LeadsFilters';
import LeadsTable from './LeadsTable';
import AddLeadModal from './AddLeadModal';

const LeadsPage = ({ onNavigate, currentPage }) => {
  const [stats, setStats] = useState([]);
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [assignedFilter, setAssignedFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Filter and sort leads
    let filtered = leads;

    if (searchQuery) {
      filtered = filtered.filter(lead =>
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.company.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter !== 'All') {
      filtered = filtered.filter(lead => lead.status === statusFilter);
    }

    // Sort leads
    filtered = [...filtered].sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'company') return a.company.localeCompare(b.company);
      if (sortBy === 'status') return a.status.localeCompare(b.status);
      if (sortBy === 'date') return new Date(b.lastContacted) - new Date(a.lastContacted);
      return 0;
    });

    setFilteredLeads(filtered);
    setCurrentPageNum(1); // Reset to first page when filters change
  }, [searchQuery, statusFilter, assignedFilter, leads, sortBy]);

  const fetchData = async () => {
    // Get current user once
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const userId = currentUser.id || 'guest';
    
    try {
      setLoading(true);
      
      // Check if user has saved data
      const savedLeads = localStorage.getItem(`leads_${userId}`);
      
      if (savedLeads) {
        // Load from localStorage
        const leadsData = JSON.parse(savedLeads);
        setLeads(leadsData);
        setStats([
          { id: 1, title: 'Total Leads', value: leadsData.length.toString(), change: '+2.1%', positive: true },
          { id: 2, title: 'New Leads (This Week)', value: Math.floor(leadsData.length / 5).toString(), change: '-5.0%', positive: false },
          { id: 3, title: 'Conversion Rate', value: '15.3%', change: '+0.8%', positive: true },
          { id: 4, title: 'Leads Assigned to Me', value: Math.floor(leadsData.length / 3).toString(), change: '-', positive: null }
        ]);
        setLoading(false);
        return;
      }
      
      // Fetch leads from comments API
      const response = await fetch('https://jsonplaceholder.typicode.com/comments?_limit=50');
      const data = await response.json();
      
      const formattedLeads = data.map((comment, index) => ({
        id: comment.id,
        name: comment.name,
        company: comment.email.split('@')[1].split('.')[0] + ' Corp.',
        status: ['Qualified', 'Contacted', 'New', 'Lost'][index % 4],
        statusColor: ['success', 'warning', 'primary', 'danger'][index % 4],
        assignedTo: `https://i.pravatar.cc/150?img=${index + 1}`,
        lastContacted: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      }));
      
      setLeads(formattedLeads);
      
      // Save to localStorage
      localStorage.setItem(`leads_${userId}`, JSON.stringify(formattedLeads));
      
      // Set stats
      setStats([
        { id: 1, title: 'Total Leads', value: data.length * 100, change: '+2.1%', positive: true },
        { id: 2, title: 'New Leads (This Week)', value: Math.floor(data.length / 2), change: '-5.0%', positive: false },
        { id: 3, title: 'Conversion Rate', value: '15.3%', change: '+0.8%', positive: true },
        { id: 4, title: 'Leads Assigned to Me', value: Math.floor(data.length / 3), change: '-', positive: null }
      ]);
    } catch (error) {
      console.error('Error fetching leads, using fallback:', error);
      // Fallback mock data - 25 leads for pagination
      const mockLeads = [
        { id: 1, name: 'Alex Thompson', company: 'TechStart Corp.', status: 'New', statusColor: 'primary', assignedTo: 'https://i.pravatar.cc/150?img=1', lastContacted: '2024-12-09' },
        { id: 2, name: 'Maria Garcia', company: 'Innovation Corp.', status: 'Contacted', statusColor: 'warning', assignedTo: 'https://i.pravatar.cc/150?img=2', lastContacted: '2024-12-08' },
        { id: 3, name: 'Robert Chen', company: 'Global Corp.', status: 'Qualified', statusColor: 'success', assignedTo: 'https://i.pravatar.cc/150?img=3', lastContacted: '2024-12-07' },
        { id: 4, name: 'Sophie Martin', company: 'Digital Corp.', status: 'Lost', statusColor: 'danger', assignedTo: 'https://i.pravatar.cc/150?img=4', lastContacted: '2024-12-06' },
        { id: 5, name: 'Kevin Lee', company: 'Smart Corp.', status: 'New', statusColor: 'primary', assignedTo: 'https://i.pravatar.cc/150?img=5', lastContacted: '2024-12-09' },
        { id: 6, name: 'Emma White', company: 'Future Corp.', status: 'Contacted', statusColor: 'warning', assignedTo: 'https://i.pravatar.cc/150?img=6', lastContacted: '2024-12-08' },
        { id: 7, name: 'Daniel Kim', company: 'NextGen Corp.', status: 'Qualified', statusColor: 'success', assignedTo: 'https://i.pravatar.cc/150?img=7', lastContacted: '2024-12-07' },
        { id: 8, name: 'Olivia Brown', company: 'Prime Corp.', status: 'New', statusColor: 'primary', assignedTo: 'https://i.pravatar.cc/150?img=8', lastContacted: '2024-12-09' },
        { id: 9, name: 'Lucas Anderson', company: 'Quantum Corp.', status: 'Lost', statusColor: 'danger', assignedTo: 'https://i.pravatar.cc/150?img=9', lastContacted: '2024-12-05' },
        { id: 10, name: 'Sophia Rodriguez', company: 'Apex Corp.', status: 'Contacted', statusColor: 'warning', assignedTo: 'https://i.pravatar.cc/150?img=10', lastContacted: '2024-12-08' },
        { id: 11, name: 'James Wilson', company: 'Vision Corp.', status: 'New', statusColor: 'primary', assignedTo: 'https://i.pravatar.cc/150?img=11', lastContacted: '2024-12-09' },
        { id: 12, name: 'Isabella Martinez', company: 'Elite Corp.', status: 'Qualified', statusColor: 'success', assignedTo: 'https://i.pravatar.cc/150?img=12', lastContacted: '2024-12-07' },
        { id: 13, name: 'Michael Johnson', company: 'Strategic Corp.', status: 'Contacted', statusColor: 'warning', assignedTo: 'https://i.pravatar.cc/150?img=13', lastContacted: '2024-12-08' },
        { id: 14, name: 'Emily Davis', company: 'Pioneer Corp.', status: 'New', statusColor: 'primary', assignedTo: 'https://i.pravatar.cc/150?img=14', lastContacted: '2024-12-09' },
        { id: 15, name: 'William Taylor', company: 'Summit Corp.', status: 'Lost', statusColor: 'danger', assignedTo: 'https://i.pravatar.cc/150?img=15', lastContacted: '2024-12-05' },
        { id: 16, name: 'Ava Jackson', company: 'Horizon Corp.', status: 'Contacted', statusColor: 'warning', assignedTo: 'https://i.pravatar.cc/150?img=16', lastContacted: '2024-12-08' },
        { id: 17, name: 'Benjamin Moore', company: 'Venture Corp.', status: 'Qualified', statusColor: 'success', assignedTo: 'https://i.pravatar.cc/150?img=17', lastContacted: '2024-12-07' },
        { id: 18, name: 'Mia Thomas', company: 'Dynamic Corp.', status: 'New', statusColor: 'primary', assignedTo: 'https://i.pravatar.cc/150?img=18', lastContacted: '2024-12-09' },
        { id: 19, name: 'Ethan Harris', company: 'Velocity Corp.', status: 'Contacted', statusColor: 'warning', assignedTo: 'https://i.pravatar.cc/150?img=19', lastContacted: '2024-12-08' },
        { id: 20, name: 'Charlotte Clark', company: 'Zenith Corp.', status: 'Qualified', statusColor: 'success', assignedTo: 'https://i.pravatar.cc/150?img=20', lastContacted: '2024-12-07' },
        { id: 21, name: 'Alexander Lewis', company: 'Momentum Corp.', status: 'New', statusColor: 'primary', assignedTo: 'https://i.pravatar.cc/150?img=21', lastContacted: '2024-12-09' },
        { id: 22, name: 'Amelia Walker', company: 'Catalyst Corp.', status: 'Lost', statusColor: 'danger', assignedTo: 'https://i.pravatar.cc/150?img=22', lastContacted: '2024-12-06' },
        { id: 23, name: 'Sebastian Hall', company: 'Nexus Corp.', status: 'Contacted', statusColor: 'warning', assignedTo: 'https://i.pravatar.cc/150?img=23', lastContacted: '2024-12-08' },
        { id: 24, name: 'Harper Young', company: 'Synergy Corp.', status: 'Qualified', statusColor: 'success', assignedTo: 'https://i.pravatar.cc/150?img=24', lastContacted: '2024-12-07' },
        { id: 25, name: 'Henry King', company: 'Infinity Corp.', status: 'New', statusColor: 'primary', assignedTo: 'https://i.pravatar.cc/150?img=25', lastContacted: '2024-12-09' }
      ];
      setLeads(mockLeads);
      
      // Save to localStorage
      localStorage.setItem(`leads_${userId}`, JSON.stringify(mockLeads));
      
      setStats([
        { id: 1, title: 'Total Leads', value: '1000', change: '+2.1%', positive: true },
        { id: 2, title: 'New Leads (This Week)', value: '5', change: '-5.0%', positive: false },
        { id: 3, title: 'Conversion Rate', value: '15.3%', change: '+0.8%', positive: true },
        { id: 4, title: 'Leads Assigned to Me', value: '3', change: '-', positive: null }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleAddLead = (newLead) => {
    const updatedLeads = [newLead, ...leads];
    setLeads(updatedLeads);
    
    // Save to localStorage
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const uid = user.id || 'guest';
    localStorage.setItem(`leads_${uid}`, JSON.stringify(updatedLeads));
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(filteredLeads, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `leads-${new Date().toISOString().split('T')[0]}.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleClearFilters = () => {
    setStatusFilter('All');
    setAssignedFilter('All');
    setSearchQuery('');
  };

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar onNavigate={onNavigate} currentPage={currentPage} />
      
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-7xl p-6">
          <LeadsHeader 
            onSearch={handleSearch}
            onAddLead={() => setShowAddModal(true)}
            onExport={handleExport}
          />
          
          {loading ? (
            <div className="flex justify-content items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <LeadsStats stats={stats} />
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-slate-200">
                <LeadsFilters 
                  statusFilter={statusFilter}
                  onStatusFilter={setStatusFilter}
                  assignedFilter={assignedFilter}
                  onAssignedFilter={setAssignedFilter}
                  onClearFilters={handleClearFilters}
                />
                <LeadsTable 
                  leads={filteredLeads}
                  sortBy={sortBy}
                  onSort={setSortBy}
                  currentPage={currentPageNum}
                  totalPages={Math.ceil(filteredLeads.length / itemsPerPage)}
                  totalItems={filteredLeads.length}
                  itemsPerPage={itemsPerPage}
                  onPageChange={setCurrentPageNum}
                />
              </div>
            </>
          )}
        </div>
      </main>
      
      <AddLeadModal 
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddLead}
      />
    </div>
  );
};

export default LeadsPage;
