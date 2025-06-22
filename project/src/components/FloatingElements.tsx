import React from 'react';

const FloatingElements: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Sparkles */}
      <div className="absolute top-1/4 left-1/4 text-pink-300 animate-pulse">
        ✨
      </div>
      <div className="absolute top-1/3 right-1/4 text-purple-300 animate-bounce delay-1000">
        ⭐
      </div>
      <div className="absolute bottom-1/3 left-1/3 text-blue-300 animate-pulse delay-500">
        💫
      </div>
      
      {/* Hearts */}
      <div className="absolute top-1/2 right-1/3 text-pink-200 animate-bounce delay-700">
        💖
      </div>
      <div className="absolute bottom-1/4 right-1/4 text-purple-200 animate-pulse delay-300">
        💝
      </div>
      
      {/* Stars */}
      <div className="absolute top-3/4 left-1/4 text-yellow-300 animate-ping delay-1000">
        🌟
      </div>
      <div className="absolute top-1/4 right-1/3 text-blue-200 animate-bounce delay-1500">
        ⭐
      </div>
    </div>
  );
};

export default FloatingElements;