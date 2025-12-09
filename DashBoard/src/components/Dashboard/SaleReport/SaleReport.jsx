import React from 'react';

const SaleReport = () => {
  return (
    <div className="card sale-card">
      <div className="card-body">
        <h5 className="fw-bold mb-4">Sale Report</h5>
        
        <div className="donut-chart-container">
          <div className="donut-chart">
            <svg viewBox="0 0 100 100" className="donut-svg">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#E5E7EB" strokeWidth="10"/>
              <circle cx="50" cy="50" r="40" fill="none" stroke="#4B6BFB" strokeWidth="10" 
                strokeDasharray="175.9" strokeDashoffset="52.8" strokeLinecap="round"/>
              <circle cx="50" cy="50" r="40" fill="none" stroke="#FF5757" strokeWidth="10" 
                strokeDasharray="175.9" strokeDashoffset="-123" strokeLinecap="round"/>
              <circle cx="50" cy="50" r="40" fill="none" stroke="#4ADE80" strokeWidth="10" 
                strokeDasharray="175.9" strokeDashoffset="-158.4" strokeLinecap="round"/>
            </svg>
            <div className="donut-center">
              <h3>70%</h3>
              <small>Trends</small>
            </div>
          </div>
        </div>

        <div>
          <div className="sale-legend-item">
            <div><span className="sale-dot blue-dot">●</span> Sale</div>
            <strong>60%</strong>
          </div>
          <div className="sale-legend-item">
            <div><span className="sale-dot red-dot">●</span> Distribute</div>
            <strong>20%</strong>
          </div>
          <div className="sale-legend-item">
            <div><span className="sale-dot green-dot">●</span> Return</div>
            <strong>20%</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleReport;
