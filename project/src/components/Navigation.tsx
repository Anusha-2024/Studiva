import React, { useState } from 'react';
import { Moon, Sun, User, LogIn, LogOut, Home, BarChart3, FileText, Timer, Calendar, Heart, Settings } from 'lucide-react';
import type { PageType } from '../App';
import { User as UserType } from '../types/User';

interface NavigationProps {
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
  currentUser: UserType | null;
}

const Navigation: React.FC<NavigationProps> = ({
  currentPage,
  onPageChange,
  isDarkMode,
  onToggleDarkMode,
  isLoggedIn,
  onLogin,
  onLogout,
  currentUser
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navItems = [
    { id: 'home' as PageType, label: 'Home', icon: Home },
    { id: 'dashboard' as PageType, label: 'Dashboard', icon: BarChart3 },
    { id: 'notes' as PageType, label: '📒 Notes', icon: FileText },
    { id: 'timer' as PageType, label: '⏱️ Timer', icon: Timer },
    { id: 'calendar' as PageType, label: '📅 Calendar', icon: Calendar },
    { id: 'visionboard' as PageType, label: '🌈 Vision Board', icon: Heart },
    { id: 'settings' as PageType, label: 'Settings', icon: Settings },
  ];

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <nav className={`sticky top-0 z-50 backdrop-blur-md transition-all duration-300 ${
      isDarkMode 
        ? 'bg-slate-900/80 border-purple-800/30' 
        : 'bg-white/80 border-pink-200/30'
    } border-b`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              isDarkMode ? 'bg-purple-600' : 'bg-pink-400'
            }`}>
              <span className="text-white font-bold text-sm">AS</span>
            </div>
            <span className={`font-bold text-lg ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
              AestheticStudy
            </span>
          </div>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  currentPage === item.id
                    ? isDarkMode
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-pink-400 text-white shadow-lg'
                    : isDarkMode
                    ? 'text-gray-300 hover:text-white hover:bg-purple-700/50'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-pink-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              className={`p-2 rounded-full transition-all duration-300 ${
                isDarkMode
                  ? 'bg-yellow-400 text-yellow-900 hover:bg-yellow-300'
                  : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
              }`}
            >
              {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* User Menu */}
            <div className="relative">
              {isLoggedIn && currentUser ? (
                <>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className={`p-2 rounded-full transition-all duration-200 flex items-center space-x-2 ${
                      isDarkMode
                        ? 'bg-purple-600 text-white hover:bg-purple-700'
                        : 'bg-pink-400 text-white hover:bg-pink-500'
                    }`}
                  >
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-semibold">
                      {getInitials(currentUser.name)}
                    </div>
                  </button>
                  
                  {showUserMenu && (
                    <div className={`absolute right-0 mt-2 w-64 rounded-xl shadow-lg border transition-all duration-200 ${
                      isDarkMode 
                        ? 'bg-slate-800 border-purple-700' 
                        : 'bg-white border-pink-200'
                    }`}>
                      <div className="p-4">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
                            isDarkMode ? 'bg-purple-600' : 'bg-pink-400'
                          }`}>
                            {getInitials(currentUser.name)}
                          </div>
                          <div>
                            <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                              {currentUser.name}
                            </p>
                            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              {currentUser.email}
                            </p>
                          </div>
                        </div>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-sm">
                            <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Study Streak</span>
                            <span className={`font-semibold ${isDarkMode ? 'text-pink-400' : 'text-pink-500'}`}>
                              {currentUser.studyStreak} days
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Total Hours</span>
                            <span className={`font-semibold ${isDarkMode ? 'text-purple-400' : 'text-purple-500'}`}>
                              {currentUser.totalStudyTime}h
                            </span>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => {
                            onLogout();
                            setShowUserMenu(false);
                          }}
                          className={`w-full flex items-center space-x-2 text-sm transition-colors p-2 rounded-lg ${
                            isDarkMode 
                              ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                          }`}
                        >
                          <LogOut size={14} />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <button
                  onClick={onLogin}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    isDarkMode
                      ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-lg'
                      : 'bg-pink-400 text-white hover:bg-pink-500 shadow-lg'
                  }`}
                >
                  <LogIn size={14} />
                  <span>Sign In</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-pink-200/30">
        <div className="px-2 py-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                currentPage === item.id
                  ? isDarkMode
                    ? 'bg-purple-600 text-white'
                    : 'bg-pink-400 text-white'
                  : isDarkMode
                  ? 'text-gray-300 hover:text-white hover:bg-purple-700/50'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-pink-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;