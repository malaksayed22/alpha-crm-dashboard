import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import CalendarHeader from './CalendarHeader';
import CalendarControls from './CalendarControls';
import CalendarGrid from './CalendarGrid';
import AddEventModal from './AddEventModal';

const CalendarPage = ({ onNavigate, currentPage }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('Month');
  const [events, setEvents] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  // Get userId once
  const getUserId = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return currentUser.id || 'guest';
  };

  useEffect(() => {
    // Load events from localStorage with user-specific key
    const userId = getUserId();
    const storedEvents = localStorage.getItem(`calendarEvents_${userId}`);
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    // Save events to localStorage with user-specific key (only after initial load)
    if (isLoaded) {
      const userId = getUserId();
      localStorage.setItem(`calendarEvents_${userId}`, JSON.stringify(events));
    }
  }, [events, isLoaded]);

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const handlePrevMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
    setView('Month');
  };

  const handleAddEvent = (newEvent) => {
    setEvents(prev => [...prev, newEvent]);
  };

  const handleDateClick = (date) => {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(date).padStart(2, '0');
    setSelectedDate(`${year}-${month}-${day}`);
    setShowAddModal(true);
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  
  const currentMonthStr = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
  const today = new Date();
  const todayStr = `${monthNames[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar onNavigate={onNavigate} currentPage={currentPage} />
      
      <main className="flex-1 overflow-y-auto bg-slate-50">
        <div className="mx-auto max-w-7xl p-4 pt-20 md:pt-6 md:p-6">
          <CalendarHeader onAddEvent={() => setShowAddModal(true)} />
          
          <div className="space-y-6">
            <CalendarControls 
              currentMonth={currentMonthStr}
              currentDate={todayStr}
              view={view}
              onViewChange={handleViewChange}
              onPrevMonth={handlePrevMonth}
              onNextMonth={handleNextMonth}
              onToday={handleToday}
            />
            
            <CalendarGrid 
              events={events} 
              currentDate={currentDate}
              onDateClick={handleDateClick}
              view={view}
            />
          </div>
        </div>
      </main>

      <AddEventModal 
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddEvent}
        selectedDate={selectedDate}
      />
    </div>
  );
};

export default CalendarPage;
