import React, { useEffect, useState } from 'react';
import { Sparkles, BookOpen, Target, Clock } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
  onLearnMore: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetStarted, onLearnMore }) => {
  const [animatedText, setAnimatedText] = useState('');
  const fullText = 'Study Smart. Stay Aesthetic.';

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setAnimatedText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-pink-300/20 rounded-full animate-bounce"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-purple-300/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-blue-300/20 rounded-full animate-bounce delay-300"></div>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Main Hero Text */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 bg-clip-text text-transparent mb-4">
            {animatedText}
            <span className="animate-pulse">✨</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-light">
            Your personalized study companion for a beautiful learning journey
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl p-6 border border-pink-200/30 dark:border-purple-700/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-pink-400 rounded-full flex items-center justify-center mb-4 mx-auto">
              <BookOpen className="text-white" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Smart Organization</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Organize your subjects, notes, and goals in one beautiful space
            </p>
          </div>

          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl p-6 border border-purple-200/30 dark:border-purple-700/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mb-4 mx-auto">
              <Clock className="text-white" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Focus Sessions</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Cute Pomodoro timer to keep you focused and productive
            </p>
          </div>

          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl p-6 border border-blue-200/30 dark:border-purple-700/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center mb-4 mx-auto">
              <Target className="text-white" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Vision Board</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Visualize your dreams and stay motivated with mood boards
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={onGetStarted}
            className="group bg-gradient-to-r from-pink-400 to-purple-500 text-white font-semibold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex items-center space-x-2"
          >
            <span>Get Started</span>
            <Sparkles className="group-hover:animate-spin" size={20} />
          </button>
          
          <button
            onClick={onLearnMore}
            className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md text-gray-700 dark:text-gray-300 font-semibold py-4 px-8 rounded-full border border-gray-200/30 dark:border-gray-700/30 hover:bg-white/90 dark:hover:bg-slate-800/90 transition-all duration-300 hover:-translate-y-1"
          >
            Learn More
          </button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-md mx-auto">
          <div className="text-center">
            <div className="text-2xl font-bold text-pink-500 dark:text-pink-400">10K+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Happy Students</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-500 dark:text-purple-400">50K+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Study Sessions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-500 dark:text-blue-400">98%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Success Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;