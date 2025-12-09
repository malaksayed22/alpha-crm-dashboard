import React from 'react';

const LeadsReport = ({ leads }) => {
  return (
    <div className="card leads-card">
      <div className="card-body">
        <div className="section-header">
          <h5>Leads Report</h5>
          <select className="form-select form-select-sm leads-select">
            <option>This Month</option>
          </select>
        </div>

        <table className="leads-table table table-borderless">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Company</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {leads.map(lead => (
              <tr key={lead.id}>
                <td>
                  <div className="lead-user">
                    <div className="lead-avatar"></div>
                    {lead.name}
                  </div>
                </td>
                <td className="text-muted">{lead.email}</td>
                <td className="text-muted">{lead.company}</td>
                <td>
                  <span className={`badge bg-${lead.statusColor}`}>{lead.status}</span>
                </td>
                <td>⋮</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadsReport;
