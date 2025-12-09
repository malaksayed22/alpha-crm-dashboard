import React from 'react';

const TopMentors = ({ mentors }) => {
  return (
    <div className="card mentors-card">
      <div className="card-body">
        <div className="section-header">
          <h5>Top Mentors</h5>
          <a href="#" className="text-decoration-none">View All</a>
        </div>

        {mentors.map(mentor => (
          <div key={mentor.id} className="mentor-item">
            <div className="mentor-info">
              <div className="mentor-avatar"></div>
              <div className="mentor-details">
                <div className="mentor-name">{mentor.name}</div>
                <small className="mentor-role">{mentor.role}</small>
              </div>
            </div>
            <button className="btn btn-link text-dark">⋮</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopMentors;
