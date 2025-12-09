import React, { useState } from 'react';

const MiniCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState('July 2024');
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const dates = [
    null, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31
  ];

  return (
    <div className="mini-calendar">
      <div className="mini-calendar-header">
        <p className="mini-month">{currentMonth}</p>
        <div className="mini-nav">
          <button className="mini-nav-btn">
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <button className="mini-nav-btn">
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>
      <div className="mini-calendar-grid">
        {days.map((day, index) => (
          <div key={index} className="mini-day-header">{day}</div>
        ))}
        {dates.map((date, index) => (
          <button 
            key={index} 
            className={`mini-date ${date === null ? 'empty' : ''} ${date === 22 ? 'today' : ''}`}
          >
            {date === 22 ? (
              <div className="mini-today-marker">{date}</div>
            ) : (
              date || ''
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MiniCalendar;
