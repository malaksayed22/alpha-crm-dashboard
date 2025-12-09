import React from 'react';

const StatsCards = ({ stats }) => {
  return (
    <div className="row mb-4">
      {stats.map(stat => (
        <div key={stat.id} className="col-md-3 mb-3">
          <div className="card stat-card">
            <div className="card-body">
              <div className="stat-icon-wrapper">
                <div className="stat-icon-bg" style={{ backgroundColor: stat.color + '20' }}>
                  <div className="stat-icon" style={{ backgroundColor: stat.color }}>
                    <i className={`fa-solid ${stat.icon || 'fa-users'}`}></i>
                  </div>
                </div>
                <small className="stat-title">{stat.title}</small>
              </div>
              <h3 className="stat-value">{stat.value}</h3>
              <small className={`stat-change ${stat.positive ? 'text-success' : 'text-danger'}`}>
                {stat.change}
              </small>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
