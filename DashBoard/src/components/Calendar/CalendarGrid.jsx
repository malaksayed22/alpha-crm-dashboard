import React from 'react';

const CalendarGrid = ({ events, currentDate, onDateClick, view }) => {
  const days = view === 'Week' ? ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'] : view === 'Day' ? ['TIME'] : ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
  
  // Calculate calendar days
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const today = new Date();
  const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year;
  const todayDate = today.getDate();
  
  const calendarDays = [];
  
  if (view === 'Day') {
    // Show only today in day view
    calendarDays.push({
      date: isCurrentMonth ? todayDate : currentDate.getDate(),
      currentMonth: true,
      isToday: isCurrentMonth
    });
  } else if (view === 'Week') {
    // Show current week (7 days from today)
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    
    for (let i = 0; i < 7; i++) {
      const weekDay = new Date(startOfWeek);
      weekDay.setDate(startOfWeek.getDate() + i);
      calendarDays.push({
        date: weekDay.getDate(),
        currentMonth: weekDay.getMonth() === month,
        isToday: isCurrentMonth && weekDay.getDate() === todayDate
      });
    }
  } else {
    // Month view - Empty cells before month starts
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push({
        date: null,
        currentMonth: false,
        isEmpty: true
      });
    }
    
    // Current month days only
    for (let i = 1; i <= daysInMonth; i++) {
      calendarDays.push({
        date: i,
        currentMonth: true,
        isToday: isCurrentMonth && i === todayDate
      });
    }
  }

  const getEventsForDate = (date) => {
    if (!date) return [];
    // Filter events for current month and specific date
    return events.filter(event => {
      if (!event.date) return event.day === date;
      const eventDate = new Date(event.date);
      return eventDate.getDate() === date && 
             eventDate.getMonth() === month && 
             eventDate.getFullYear() === year;
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="grid grid-cols-7 gap-px bg-slate-200">
        {days.map((day, index) => (
          <div key={index} className="bg-slate-50 px-3 py-2 text-center">
            <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">{day}</span>
          </div>
        ))}
        
        {calendarDays.map((day, index) => {
          if (day.isEmpty) {
            return <div key={index} className="bg-white min-h-24"></div>;
          }
          
          const dayEvents = getEventsForDate(day.date);
          return (
            <div 
              key={index} 
              className={`bg-white min-h-24 p-2 cursor-pointer hover:bg-slate-50 transition-colors ${
                day.isToday ? 'bg-blue-50' : ''
              }`}
              onClick={() => onDateClick(day.date)}
            >
              <span className={`inline-flex items-center justify-center w-7 h-7 text-sm font-medium rounded-full ${
                day.isToday 
                  ? 'bg-primary text-white' 
                  : 'text-slate-700'
              }`}>
                {day.date}
              </span>
              {dayEvents.length > 0 && (
                <div className="mt-1 space-y-1">
                  {dayEvents.map(event => (
                    <div 
                      key={event.id} 
                      className={`text-xs px-2 py-1 rounded truncate ${
                        event.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                        event.color === 'green' ? 'bg-green-100 text-green-800' :
                        event.color === 'red' ? 'bg-red-100 text-red-800' :
                        event.color === 'purple' ? 'bg-purple-100 text-purple-800' :
                        'bg-slate-100 text-slate-800'
                      }`}
                    >
                      {event.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;
