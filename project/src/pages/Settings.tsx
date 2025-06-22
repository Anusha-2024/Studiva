import React, { useState } from 'react';
import { Moon, Sun, Bell, Palette, User, Shield, Download, Trash2 } from 'lucide-react';
import { User as UserType } from '../types/User';

interface SettingsProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  currentUser: UserType | null;
  selectedTheme: { name: string; colors: string[]; primary: string } | null;
  onSelectTheme: (theme: { name: string; colors: string[]; primary: string } | null) => void;
}

const Settings: React.FC<SettingsProps> = ({ isDarkMode, onToggleDarkMode, currentUser, selectedTheme, onSelectTheme }) => {
  const [notifications, setNotifications] = useState(
    currentUser?.preferences.notifications || {
      studyReminders: true,
      breakReminders: true,
      goalDeadlines: true,
      weeklyReports: false,
    }
  );

  const [profile, setProfile] = useState({
    name: currentUser?.name || 'Aesthetic Learner',
    email: currentUser?.email || 'hello@aestheticstudy.com',
    studyGoal: currentUser?.studyGoal || 4,
    favoriteSubject: currentUser?.favoriteSubject || 'Mathematics',
  });

  const themes = [
    { name: 'Soft Pink', colors: ['#fdf2f8', '#fce7f3', '#fbcfe8'], primary: '#ec4899' },
    { name: 'Lavender Dream', colors: ['#f3f4f6', '#e5e7eb', '#d1d5db'], primary: '#8b5cf6' },
    { name: 'Sky Blue', colors: ['#f0f9ff', '#e0f2fe', '#bae6fd'], primary: '#0ea5e9' },
    { name: 'Mint Fresh', colors: ['#f0fdf4', '#dcfce7', '#bbf7d0'], primary: '#10b981' },
  ];

  // Function to export user data as JSON file
  const exportData = () => {
    if (!currentUser) {
      alert('No user data to export.');
      return;
    }
    const dataStr = JSON.stringify(currentUser, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'aestheticstudy_user_data.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Function to handle privacy settings (placeholder)
  const privacySettings = () => {
    alert('Privacy Settings feature is coming soon.');
  };

  // Function to handle account deletion (placeholder)
  const deleteAccount = () => {
    const confirmed = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
    if (confirmed) {
      alert('Account deletion feature is not implemented yet.');
      // Here you would add actual account deletion logic
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2 flex items-center">
            ⚙️ Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Customize your AestheticStudy experience
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Appearance */}
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl p-6 border border-pink-200/30 dark:border-purple-700/30 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center">
                <Palette className="mr-3" size={24} />
                Appearance
              </h3>

              {/* Dark Mode Toggle */}
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl mb-4">
                <div className="flex items-center space-x-3">
                  {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">Dark Mode</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Switch between light and dark themes
                    </p>
                  </div>
                </div>
                <button
                  onClick={onToggleDarkMode}
                  className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                    isDarkMode ? 'bg-purple-500' : 'bg-gray-300'
                  }`}
                >
                  <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
                    isDarkMode ? 'translate-x-6' : 'translate-x-0'
                  }`}></div>
                </button>
              </div>

              {/* Theme Selection */}
              <div>
                <p className="font-medium text-gray-800 dark:text-white mb-3">Color Theme</p>
                <div className="grid grid-cols-2 gap-3">
                {themes.map((theme) => (
                  <button
                    key={theme.name}
                    onClick={() => onSelectTheme(theme)}
                    className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                      selectedTheme?.name === theme.name
                        ? 'border-pink-400 dark:border-purple-500'
                        : 'border-gray-200 dark:border-gray-700 hover:border-pink-400 dark:hover:border-purple-500'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex space-x-1">
                        {theme.colors.map((color, index) => (
                          <div
                            key={index}
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: color }}
                          ></div>
                        ))}
                      </div>
                      <span className="text-sm font-medium text-gray-800 dark:text-white">
                        {theme.name}
                      </span>
                    </div>
                  </button>
                ))}
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl p-6 border border-purple-200/30 dark:border-purple-700/30 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center">
                <Bell className="mr-3" size={24} />
                Notifications
              </h3>

              <div className="space-y-4">
                {Object.entries(notifications).map(([key, enabled]) => (
                  <div key={key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Get notified about {key.toLowerCase()}
                      </p>
                    </div>
                    <button
                      onClick={() => setNotifications(prev => ({ ...prev, [key]: !enabled }))}
                      className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                        enabled ? 'bg-pink-500' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
                        enabled ? 'translate-x-6' : 'translate-x-0'
                      }`}></div>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Study Preferences */}
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl p-6 border border-blue-200/30 dark:border-purple-700/30 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
                📚 Study Preferences
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-800 dark:text-white mb-2">
                    Daily Study Goal (hours)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="12"
                    value={profile.studyGoal}
                    onChange={(e) => setProfile(prev => ({ ...prev, studyGoal: parseInt(e.target.value) }))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-1">
                    <span>1 hour</span>
                    <span className="font-medium">{profile.studyGoal} hours</span>
                    <span>12 hours</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-800 dark:text-white mb-2">
                    Favorite Subject
                  </label>
                  <select
                    value={profile.favoriteSubject}
                    onChange={(e) => setProfile(prev => ({ ...prev, favoriteSubject: e.target.value }))}
                    className="w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:focus:ring-purple-500 text-gray-800 dark:text-white"
                  >
                    <option>Mathematics</option>
                    <option>Physics</option>
                    <option>Chemistry</option>
                    <option>Biology</option>
                    <option>Computer Science</option>
                    <option>Literature</option>
                    <option>History</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile */}
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl p-6 border border-pink-200/30 dark:border-purple-700/30 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                <User className="mr-2" size={20} />
                Profile
              </h3>
              
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold text-xl">
                  {getInitials(profile.name)}
                </div>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                  className="text-center font-semibold bg-transparent border-none focus:outline-none text-gray-800 dark:text-white"
                />
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{profile.email}</p>
              </div>

              <div className="space-y-3">
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Study Streak</p>
                  <p className="text-xl font-bold text-pink-500">{currentUser?.studyStreak || 0} days</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Study Time</p>
                  <p className="text-xl font-bold text-purple-500">{currentUser?.totalStudyTime || 0} hours</p>
                </div>
              </div>
            </div>

            {/* Account Actions */}
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl p-6 border border-gray-200/30 dark:border-purple-700/30 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Account</h3>
              
              <div className="space-y-3">
                <button
                  onClick={exportData}
                  className="w-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 py-3 px-4 rounded-xl hover:bg-blue-200 dark:hover:bg-blue-800 transition-all duration-200 flex items-center space-x-3"
                >
                  <Download size={20} />
                  <span>Export Data</span>
                </button>

                <button
                  onClick={privacySettings}
                  className="w-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 flex items-center space-x-3"
                >
                  <Shield size={20} />
                  <span>Privacy Settings</span>
                </button>

                <button
                  onClick={deleteAccount}
                  className="w-full bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 py-3 px-4 rounded-xl hover:bg-red-200 dark:hover:bg-red-800 transition-all duration-200 flex items-center space-x-3"
                >
                  <Trash2 size={20} />
                  <span>Delete Account</span>
                </button>
              </div>
            </div>

            {/* Version Info */}
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl p-6 border border-green-200/30 dark:border-purple-700/30 shadow-lg text-center">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                AestheticStudy
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Version 1.0.0</p>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                Made with 💖 by Anusha for beautiful learning!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;