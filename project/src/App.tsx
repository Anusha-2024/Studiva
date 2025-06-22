import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Dashboard from './pages/Dashboard';
import Notes from './pages/Notes';
import Timer from './pages/Timer';
import Calendar from './pages/Calendar';
import VisionBoard from './pages/VisionBoard';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import FloatingElements from './components/FloatingElements';
import { User } from './types/User';

export type PageType = 'home' | 'dashboard' | 'notes' | 'timer' | 'calendar' | 'visionboard' | 'settings' | 'login' | 'signup' | 'about';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(() => {
    const savedTheme = localStorage.getItem('selectedTheme');
    return savedTheme ? JSON.parse(savedTheme) : null;
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (selectedTheme) {
      document.documentElement.style.setProperty('--primary-color', selectedTheme.primary);
    } else {
      document.documentElement.style.removeProperty('--primary-color');
    }
    localStorage.setItem('selectedTheme', JSON.stringify(selectedTheme));
  }, [selectedTheme]);

  // Check for existing session on app load
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setIsLoggedIn(true);
    localStorage.setItem('currentUser', JSON.stringify(user));
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('currentUser');
    setCurrentPage('home');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Hero onGetStarted={() => setCurrentPage('dashboard')} onLearnMore={() => setCurrentPage('about')} />;
      case 'dashboard':
        return <Dashboard currentUser={currentUser} onNavigate={setCurrentPage} />;
      case 'notes':
        return <Notes currentUser={currentUser} />;
      case 'timer':
        return <Timer currentUser={currentUser} />;
      case 'calendar':
        return <Calendar currentUser={currentUser} />;
      case 'visionboard':
        return <VisionBoard currentUser={currentUser} />;
      case 'settings':
        return (
          <Settings
            isDarkMode={isDarkMode}
            onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
            currentUser={currentUser}
            selectedTheme={selectedTheme}
            onSelectTheme={setSelectedTheme}
          />
        );
      case 'login':
        return <Login onLogin={handleLogin} onSwitchToSignup={() => setCurrentPage('signup')} />;
      case 'signup':
        return <Signup onSignup={handleLogin} onSwitchToLogin={() => setCurrentPage('login')} />;
      case 'about':
        return <About />;
      default:
        return <Hero onGetStarted={() => setCurrentPage('dashboard')} onLearnMore={() => setCurrentPage('about')} />;
    }
  };

  return (
    <div
      className={`min-h-screen transition-all duration-700 ${
        isDarkMode ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' : ''
      }`}
      style={{
        background: !isDarkMode
          ? selectedTheme
            ? selectedTheme.primary
            : 'linear-gradient(to bottom right, #fdf2f8, #fce7f3, #fbcfe8)'
          : undefined,
      }}
    >
      <FloatingElements />

      {currentPage !== 'login' && currentPage !== 'signup' && (
        <Navigation
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          isDarkMode={isDarkMode}
          onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          isLoggedIn={isLoggedIn}
          onLogin={() => setCurrentPage('login')}
          onLogout={handleLogout}
          currentUser={currentUser}
        />
      )}

      <main className="relative z-10">{renderPage()}</main>
    </div>
  );
}

export default App;
