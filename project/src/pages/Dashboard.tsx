import React, { useState } from 'react';
import { BookOpen, Clock, Target, TrendingUp, Calendar, Heart } from 'lucide-react';
import { User } from '../types/User';

interface DashboardProps {
  currentUser: User | null;
  onNavigate: (page: import("../App").PageType) => void;
}

interface Subject {
  id: string;
  icon: React.ReactNode;
  name: string;
  progress: number;
  color: string;
}

interface Session {
  subject: string;
  date: string;
  duration: string;
}

const Dashboard: React.FC<DashboardProps> = ({ currentUser, onNavigate }) => {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const [recentSessions, setRecentSessions] = useState<Session[]>([]);

  const userName = currentUser?.name || 'Aesthetic Learner';
  const studyStreak = currentUser?.studyStreak || 0;
  const totalStudyTime = currentUser?.totalStudyTime || 0;

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Good morning, {userName}! ✨
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Ready to make today beautifully productive?
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl p-6 border border-pink-200/30 dark:border-purple-700/30 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Study Streak</p>
                <p className="text-2xl font-bold text-pink-500">{studyStreak} days</p>
              </div>
              <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900 rounded-full flex items-center justify-center">
                <TrendingUp className="text-pink-500" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl p-6 border border-purple-200/30 dark:border-purple-700/30 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Today's Focus</p>
<p className="text-2xl font-bold text-purple-500">0 hrs</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                <Clock className="text-purple-500" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl p-6 border border-blue-200/30 dark:border-purple-700/30 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Subjects</p>
                <p className="text-2xl font-bold text-blue-500">{subjects.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <BookOpen className="text-blue-500" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl p-6 border border-green-200/30 dark:border-purple-700/30 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Hours</p>
                <p className="text-2xl font-bold text-green-500">{totalStudyTime}h</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <Target className="text-green-500" size={24} />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Subject Progress */}
          <div className="lg:col-span-2">
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl p-6 border border-pink-200/30 dark:border-purple-700/30 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center">
                📚 Subject Progress
              </h3>
              <div className="space-y-4">
                {subjects.map((subject) => (
                  <div key={subject.id} className="flex items-center space-x-4">
                    <div className="text-2xl">{subject.icon}</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-800 dark:text-white">{subject.name}</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{subject.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        <div 
                          className={`${subject.color} h-3 rounded-full transition-all duration-500`}
                          style={{ width: `${subject.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions & Recent Sessions */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl p-6 border border-purple-200/30 dark:border-purple-700/30 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">⚡ Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => onNavigate('timer')}
                  className="w-full bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-300 py-3 px-4 rounded-xl hover:bg-pink-200 dark:hover:bg-pink-800 transition-all duration-200 flex items-center space-x-3"
                >
                  <Clock size={20} />
                  <span>Start Timer</span>
                </button>
                <button
                  onClick={() => onNavigate('notes')}
                  className="w-full bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 py-3 px-4 rounded-xl hover:bg-purple-200 dark:hover:bg-purple-800 transition-all duration-200 flex items-center space-x-3"
                >
                  <BookOpen size={20} />
                  <span>Quick Note</span>
                </button>
                <button
                  onClick={() => onNavigate('calendar')}
                  className="w-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 py-3 px-4 rounded-xl hover:bg-blue-200 dark:hover:bg-blue-800 transition-all duration-200 flex items-center space-x-3"
                >
                  <Calendar size={20} />
                  <span>Schedule</span>
                </button>
              </div>
            </div>

            {/* Recent Sessions */}
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl p-6 border border-blue-200/30 dark:border-purple-700/30 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">🕐 Recent Sessions</h3>
              <div className="space-y-3">
                {recentSessions.map((session, index) => (
                  <div key={index} className="flex justify-between items-center py-2">
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white text-sm">{session.subject}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{session.date}</p>
                    </div>
                    <span className="text-sm text-purple-600 dark:text-purple-400 font-medium">{session.duration}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Motivation Quote */}
        <div className="mt-8 bg-gradient-to-r from-pink-400/20 to-purple-500/20 rounded-2xl p-6 border border-pink-200/30 dark:border-purple-700/30 text-center">
          <p className="text-lg font-medium text-gray-800 dark:text-white mb-2">
            "The beautiful thing about learning is that nobody can take it away from you." ✨
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">- B.B. King</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
