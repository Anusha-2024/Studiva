import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { User } from '../types/User';

interface CalendarProps {
  currentUser: User | null;
}

const Calendar: React.FC<CalendarProps> = ({ currentUser }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const [events, setEvents] = useState([
    { id: 1, date: '2024-01-15', title: 'Physics Exam', type: 'exam', mood: '😰', userId: currentUser?.id || '1' },
    { id: 2, date: '2024-01-16', title: 'Math Assignment Due', type: 'assignment', mood: '📝', userId: currentUser?.id || '1' },
    { id: 3, date: '2024-01-18', title: 'Study Session - Chemistry', type: 'study', mood: '🧪', userId: currentUser?.id || '1' },
    { id: 4, date: '2024-01-20', title: 'Review Notes', type: 'review', mood: '📚', userId: currentUser?.id || '1' },
    { id: 5, date: '2024-01-22', title: 'Group Study', type: 'social', mood: '👥', userId: currentUser?.id || '1' },
  ]);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventMood, setNewEventMood] = useState('😊');
  const [todayMood, setTodayMood] = useState<string | null>(null);
  const [moods, setMoods] = useState<Record<string, string>>({});

  // Filter events by current user
  const userEvents = events.filter(event => event.userId === (currentUser?.id || '1'));

  const moodColors = {
    '😰': 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300',
    '📝': 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300',
    '🧪': 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300',
    '📚': 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300',
    '👥': 'bg-pink-100 text-pink-600 dark:bg-pink-900 dark:text-pink-300',
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const getEventsForDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return userEvents.filter(event => event.date === dateStr);
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-20"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = getEventsForDate(day);
      const isToday = new Date().getDate() === day && 
                     new Date().getMonth() === currentDate.getMonth() && 
                     new Date().getFullYear() === currentDate.getFullYear();

      days.push(
          <div
            key={day}
            className={`h-20 p-2 border border-gray-200/30 dark:border-gray-700/30 cursor-pointer transition-all duration-200 hover:bg-white/70 dark:hover:bg-slate-800/70 ${
              isToday ? 'bg-pink-100 dark:bg-pink-900/30 border-pink-400' : ''
            } ${selectedDate && selectedDate.getDate() === day && selectedDate.getMonth() === currentDate.getMonth() && selectedDate.getFullYear() === currentDate.getFullYear() ? 'bg-pink-300 dark:bg-pink-700/50 border-pink-600' : ''}
            `}
            onClick={() => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
          >
            <div className={`text-sm font-medium mb-1 ${
              isToday ? 'text-pink-600 dark:text-pink-400' : 'text-gray-800 dark:text-white'
            }`}>
              {day}
            </div>
          <div className="space-y-1">
            {dayEvents.slice(0, 2).map((event) => (
              <div
                key={event.id}
                className={`text-xs px-2 py-1 rounded-full truncate ${moodColors[event.mood as keyof typeof moodColors]}`}
              >
                {event.mood} {event.title}
              </div>
            ))}
            {dayEvents.length > 2 && (
              <div className="text-xs text-gray-500 dark:text-gray-400">
                +{dayEvents.length - 2} more
              </div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2 flex items-center">
            📅 My Study Calendar
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Plan your study sessions and track your academic journey
          </p>
        </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Calendar */}
            <div className="lg:col-span-3">
              <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl border border-pink-200/30 dark:border-purple-700/30 shadow-lg">
                {/* Calendar Header */}
                <div className="flex items-center justify-between p-6 border-b border-pink-200/30 dark:border-purple-700/30">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </h2>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => navigateMonth('prev')}
                      className="p-2 rounded-full bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-400 hover:bg-pink-200 dark:hover:bg-pink-800 transition-all duration-200"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={() => navigateMonth('next')}
                      className="p-2 rounded-full bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-400 hover:bg-pink-200 dark:hover:bg-pink-800 transition-all duration-200"
                    >
                      <ChevronRight size={20} />
                    </button>
                    <button
                      onClick={() => setCurrentDate(new Date())}
                      className="p-2 rounded-full bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-400 hover:bg-pink-200 dark:hover:bg-pink-800 transition-all duration-200"
                      title="Go to Today"
                    >
                      Today
                    </button>
                  </div>
                </div>

              {/* Day Headers */}
              <div className="grid grid-cols-7 border-b border-pink-200/30 dark:border-purple-700/30">
                {dayNames.map((day) => (
                  <div key={day} className="p-4 text-center text-sm font-semibold text-gray-600 dark:text-gray-400">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7">
                {renderCalendarDays()}
              </div>
            </div>
          </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Add Event */}
              <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl p-6 border border-purple-200/30 dark:border-purple-700/30 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">✨ Quick Add</h3>
                <button
                  onClick={() => {
                    if (!selectedDate) {
                      alert('Please select a date on the calendar first.');
                      return;
                    }
                    setShowAddEvent(true);
                  }}
                  className="w-full bg-gradient-to-r from-pink-400 to-purple-500 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex items-center justify-center space-x-2"
                >
                  <Plus size={20} />
                  <span>New Event</span>
                </button>
              </div>
              {/* Mood Tracker */}
              <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl p-6 border border-blue-200/30 dark:border-purple-700/30 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">😊 Today's Mood</h3>
                <div className="grid grid-cols-3 gap-2">
                {['😊', '😐', '😰', '🤩', '😴', '🔥'].map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => {
                      if (!selectedDate) {
                        alert('Please select a date on the calendar first.');
                        return;
                      }
                      const dateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
                      setMoods(prev => ({ ...prev, [dateStr]: emoji }));
                      if (dateStr === `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}`) {
                        setTodayMood(emoji);
                      }
                    }}
                    className={`text-2xl p-3 rounded-xl transition-all duration-200 ${
                      todayMood === emoji
                        ? 'bg-pink-200 dark:bg-pink-800'
                        : 'bg-gray-100 dark:bg-gray-700 hover:bg-pink-200 dark:hover:bg-pink-800'
                    }`}
                    title={`Set mood to ${emoji}`}
                  >
                    {emoji}
                  </button>
                ))}
                </div>
              </div>

              {/* Upcoming Events */}
              <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl p-6 border border-green-200/30 dark:border-purple-700/30 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">🔜 Upcoming</h3>
                <div className="space-y-3">
                  {userEvents.slice(0, 4).map((event) => (
                    <div key={event.id} className="flex items-center space-x-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                      <span className="text-xl">{event.mood}</span>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800 dark:text-white text-sm">{event.title}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{event.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            {/* Study Streak */}
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl p-6 border border-yellow-200/30 dark:border-purple-700/30 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">🔥 Study Streak</h3>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-500 mb-2">{currentUser?.studyStreak || 0}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Days in a row!</div>
                <div className="mt-3 flex justify-center space-x-1">
                  {[...Array(7)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-full ${
                        i < (currentUser?.studyStreak || 0) % 7 ? 'bg-yellow-400' : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add Event Modal */}
        {showAddEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Add New Event</h3>
              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
                Event Title
              </label>
              <input
                type="text"
                value={newEventTitle}
                onChange={(e) => setNewEventTitle(e.target.value)}
                className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="Enter event title"
              />
              <label className="block mt-4 mb-2 font-medium text-gray-700 dark:text-gray-200">
                Mood
              </label>
              <select
                value={newEventMood}
                onChange={(e) => setNewEventMood(e.target.value)}
                className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                {Object.keys(moodColors).map((mood) => (
                  <option key={mood} value={mood}>
                    {mood}
                  </option>
                ))}
              </select>
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => {
                    if (!newEventTitle.trim() || !selectedDate) {
                      alert('Please select a date and enter an event title.');
                      return;
                    }
                    const newEvent = {
                      id: events.length + 1,
                      date: `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`,
                      title: newEventTitle,
                      type: 'custom',
                      mood: newEventMood,
                      userId: currentUser?.id || '1',
                    };
                    setEvents(prev => [...prev, newEvent]);
                    setShowAddEvent(false);
                    setNewEventTitle('');
                  }}
                  className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition"
                >
                  Add
                </button>
                <button
                  onClick={() => setShowAddEvent(false)}
                  className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Calendar;