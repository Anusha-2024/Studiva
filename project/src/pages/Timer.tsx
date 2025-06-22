import React, { useState, useEffect, useRef } from 'react';

declare global {
  namespace NodeJS {
    interface Timeout {}
  }
}
import { Play, Pause, RotateCcw, Coffee, Book, Music } from 'lucide-react';
import { User } from '../types/User';

interface TimerProps {
  currentUser: User | null;
}

const Timer: React.FC<TimerProps> = ({ currentUser }) => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [session, setSession] = useState(1);
  const [totalMinutes, setTotalMinutes] = useState(25);
  const intervalRef = useRef<number | null>(null);
  const endTimeRef = useRef<number | null>(null);

  const presets = [
    { name: 'Pomodoro', duration: 25, icon: '🍅' },
    { name: 'Short Break', duration: 5, icon: '☕' },
    { name: 'Long Break', duration: 15, icon: '🌸' },
    { name: 'Deep Focus', duration: 45, icon: '🎯' },
  ];

  const progress = ((totalMinutes * 60 - (minutes * 60 + seconds)) / (totalMinutes * 60)) * 100;

  useEffect(() => {
    if (isActive) {
      if (!endTimeRef.current) {
        endTimeRef.current = Date.now() + minutes * 60000 + seconds * 1000;
      }
      intervalRef.current = window.setInterval(() => {
        const now = Date.now();
        const distance = endTimeRef.current! - now;
        if (distance <= 0) {
          setIsActive(false);
          endTimeRef.current = null;
          if (!isBreak) {
            setSession(session + 1);
            setIsBreak(true);
            setMinutes(5);
            setTotalMinutes(5);
          } else {
            setIsBreak(false);
            setMinutes(25);
            setTotalMinutes(25);
          }
          setSeconds(0);
          setMinutes(0);
        } else {
          setMinutes(Math.floor(distance / 60000));
          setSeconds(Math.floor((distance % 60000) / 1000));
        }
      }, 1000);
    } else if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      endTimeRef.current = null;
    }

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, isBreak, session]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(totalMinutes);
    setSeconds(0);
    endTimeRef.current = null;
  };

  const setPreset = (duration: number) => {
    setIsActive(false);
    setMinutes(duration);
    setSeconds(0);
    setTotalMinutes(duration);
    endTimeRef.current = null;
  };

  const formatTime = (mins: number, secs: number) => {
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2 flex items-center justify-center">
            ⏱️ Aesthetic Timer
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {isBreak ? 'Time to relax and recharge ☕' : 'Focus time! You\'ve got this ✨'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Timer Display */}
          <div className="lg:col-span-2">
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-3xl p-8 border border-pink-200/30 dark:border-purple-700/30 shadow-lg text-center">
              {/* Standard Circular Progress Timer */}
              <div className="relative mb-8 flex justify-center items-center">
                <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 120 120">
                  <circle
                    className={`text-gray-300 dark:text-gray-700`}
                    strokeWidth="10"
                    stroke="currentColor"
                    fill="transparent"
                    r="54"
                    cx="60"
                    cy="60"
                  />
                  <circle
                    className={isBreak ? 'text-green-400' : 'text-pink-400'}
                    strokeWidth="10"
                    strokeDasharray={2 * Math.PI * 54}
                    strokeDashoffset={((100 - progress) / 100) * 2 * Math.PI * 54}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="54"
                    cx="60"
                    cy="60"
                  />
                </svg>
                <div className="absolute text-center">
                  <div className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
                    {formatTime(minutes, seconds)}
                  </div>
                  <div className={`text-sm font-medium ${
                    isBreak ? 'text-green-600 dark:text-green-400' : 'text-pink-600 dark:text-pink-400'
                  }`}>
                    {isBreak ? 'Break Time' : 'Focus Time'}
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex justify-center space-x-4 mb-6">
                <button
                  onClick={toggleTimer}
                  className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                    isActive
                      ? 'bg-red-400 hover:bg-red-500'
                      : isBreak
                      ? 'bg-green-400 hover:bg-green-500'
                      : 'bg-pink-400 hover:bg-pink-500'
                  }`}
                >
                  {isActive ? <Pause size={24} /> : <Play size={24} />}
                </button>
                
                <button
                  onClick={resetTimer}
                  className="w-16 h-16 rounded-full bg-gray-400 hover:bg-gray-500 flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <RotateCcw size={24} />
                </button>
              </div>

              {/* Session Counter */}
              <div className="text-center">
                <p className="text-gray-600 dark:text-gray-400 mb-2">Session</p>
                <div className="flex justify-center space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-full ${
                        i < session
                          ? 'bg-pink-400'
                          : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Presets */}
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl p-6 border border-purple-200/30 dark:border-purple-700/30 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">⚡ Quick Presets</h3>
              <div className="space-y-3">
                {presets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => setPreset(preset.duration)}
                    className="w-full bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 py-3 px-4 rounded-xl hover:bg-purple-200 dark:hover:bg-purple-800 transition-all duration-200 flex items-center space-x-3"
                  >
                    <span className="text-xl">{preset.icon}</span>
                    <div className="text-left">
                      <div className="font-medium">{preset.name}</div>
                      <div className="text-sm opacity-75">{preset.duration} min</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Study Playlists */}
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl p-6 border border-blue-200/30 dark:border-purple-700/30 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                🎧 Study Vibes
              </h3>
              <div className="space-y-3">
                <button className="w-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 py-3 px-4 rounded-xl hover:bg-blue-200 dark:hover:bg-blue-800 transition-all duration-200 flex items-center space-x-3">
                  <Music size={20} />
                  <span>Lofi Chill</span>
                </button>
                <button className="w-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 py-3 px-4 rounded-xl hover:bg-green-200 dark:hover:bg-green-800 transition-all duration-200 flex items-center space-x-3">
                  <Coffee size={20} />
                  <span>Coffee Shop</span>
                </button>
                <button className="w-full bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 py-3 px-4 rounded-xl hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-all duration-200 flex items-center space-x-3">
                  <Book size={20} />
                  <span>Nature Sounds</span>
                </button>
              </div>
            </div>

            {/* Today's Stats */}
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl p-6 border border-pink-200/30 dark:border-purple-700/30 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">📊 Today's Focus</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Sessions</span>
                  <span className="font-semibold text-pink-500">{session - 1}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Focus Time</span>
                  <span className="font-semibold text-purple-500">2h 15m</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Streak</span>
                  <span className="font-semibold text-blue-500">{currentUser?.studyStreak || 0} days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;