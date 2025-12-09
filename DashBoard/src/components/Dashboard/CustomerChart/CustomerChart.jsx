import React from 'react';

const CustomerChart = ({ chartData }) => {
  const maxValue = Math.max(...chartData.map(d => Math.max(d.profit, d.expense)));

  return (
    <div className="card chart-card">
      <div className="card-body">
        <div className="chart-header">
          <h5>Customer Habbits</h5>
          <select className="form-select form-select-sm chart-select">
            <option>This Month</option>
          </select>
        </div>
        
        <div className="chart-legend">
          <small className="chart-legend-item">
            <span className="legend-dot profit-dot">●</span> Profit
          </small>
          <small className="chart-legend-item">
            <span className="legend-dot expense-dot">●</span> Expense
          </small>
        </div>

        <div className="chart-wrapper">
          <div className="chart-y-axis">
            <span>40K</span>
            <span>30K</span>
            <span>20K</span>
            <span>10K</span>
            <span>0K</span>
          </div>
          <div className="chart-container">
            {chartData.map((data, index) => (
              <div key={index} className="chart-bar-group">
                <div className="chart-bars">
                  <div 
                    className="chart-bar expense-bar" 
                    style={{ height: `${(data.expense / maxValue) * 100}%` }}
                  ></div>
                  <div 
                    className="chart-bar profit-bar" 
                    style={{ height: `${(data.profit / maxValue) * 100}%` }}
                  ></div>
                </div>
                <small className="chart-label">{data.month}</small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerChart;
