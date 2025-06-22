import React from 'react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen p-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-gray-800 dark:text-white text-center">About AestheticStudy</h1>
      <div className="flex flex-col md:flex-row items-center md:space-x-8">
        <div className="md:w-1/2 mb-6 md:mb-0">
          <img
            src="https://i.pinimg.com/originals/b8/67/be/b867be3a913353809e5d4cfc34c9c6b8.jpg"
            alt="Study Aesthetic"
            className="rounded-2xl shadow-lg"
          />
        </div>
        <div className="md:w-1/2 text-gray-700 dark:text-gray-300 text-lg space-y-4">
          <p>
            AestheticStudy is your personalized study companion designed to help you organize your subjects, notes, and goals in a beautiful and motivating environment.
          </p>
          <p>
            With features like a cute Pomodoro timer, vision boards to visualize your dreams, and customizable themes, AestheticStudy makes learning enjoyable and productive.
          </p>
          <p>
            Whether you're a student aiming to improve focus or someone who loves to keep their study materials organized aesthetically, AestheticStudy is here to support your beautiful learning journey.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
