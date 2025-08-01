import React, { useState } from 'react';
import { Sun, Moon, Mic, User } from 'lucide-react';

const FalimyLanding = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedParent, setSelectedParent] = useState('MOM');
  const [isRecording, setIsRecording] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleParent = () => {
    setSelectedParent(selectedParent === 'MOM' ? 'DAD' : 'MOM');
  };

  const handleRecord = () => {
    setIsRecording(!isRecording);
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDarkMode 
        ? 'bg-gray-900 text-white' 
        : 'bg-white text-gray-900'
    }`}>
      {/* Theme Toggle - Top Right */}
      <div className="absolute top-8 right-8">
        <button
          onClick={toggleTheme}
          className={`p-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg ${
            isDarkMode
              ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400 border border-gray-700'
              : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200'
          }`}
        >
          {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </div>

      {/* FALIMY Title - Top Center */}
      <div className="absolute top-16 left-1/2 transform -translate-x-1/2">
        <h1 
          className={`text-6xl lg:text-8xl font-bold transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`} 
          style={{ 
            fontFamily: 'Comic Sans MS, cursive, system-ui',
            textShadow: isDarkMode ? '0 0 30px rgba(255,255,255,0.1)' : '0 0 30px rgba(0,0,0,0.1)',
            letterSpacing: '-0.02em'
          }}
        >
          FALIMY
        </h1>
      </div>

      {/* Main Content Container */}
      <div className="flex items-center justify-between min-h-screen px-8 lg:px-16 pt-32">
        
        {/* Left Side - Parent Sticker */}
        <div className="flex-1 flex justify-center lg:justify-start">
          <div className="flex flex-col items-center space-y-6">
            <div className={`relative w-64 h-64 lg:w-80 lg:h-80 rounded-3xl transition-all duration-700 transform hover:scale-102 ${
              isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200'
            } flex items-center justify-center shadow-2xl`}>
              {selectedParent === 'MOM' ? (
                <div className="text-center">
                  <div className="text-6xl lg:text-7xl mb-4">👩‍💼</div>
                  <span className={`font-bold text-2xl lg:text-3xl ${isDarkMode ? 'text-pink-300' : 'text-pink-600'}`}>
                    MOM
                  </span>
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-6xl lg:text-7xl mb-4">👨‍💼</div>
                  <span className={`font-bold text-2xl lg:text-3xl ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                    DAD
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side - All Controls */}
        <div className="flex-1 flex flex-col items-center lg:items-end justify-center space-y-12">
          
          {/* Parent Toggle Button */}
          <div className="flex flex-col items-center space-y-4">
            <button
              onClick={toggleParent}
              className={`px-16 py-6 rounded-2xl font-bold text-2xl lg:text-3xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-2xl ${
                selectedParent === 'MOM'
                  ? isDarkMode
                    ? 'bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white border border-pink-500'
                    : 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white'
                  : isDarkMode
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white border border-blue-500'
                    : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 text-white'
              }`}
            >
              {selectedParent}
            </button>
            <p className={`text-sm font-medium opacity-60 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Switch Parent
            </p>
          </div>

          {/* Record Button */}
          <div className="flex flex-col items-center space-y-4">
            <button
              onClick={handleRecord}
              className={`relative w-28 h-28 lg:w-32 lg:h-32 rounded-full transition-all duration-300 transform hover:scale-110 active:scale-95 ${
                isRecording
                  ? 'bg-red-500 hover:bg-red-400 animate-pulse shadow-2xl'
                  : isDarkMode
                    ? 'bg-gray-800 hover:bg-gray-700 border border-gray-600 shadow-2xl'
                    : 'bg-white hover:bg-gray-50 border-2 border-gray-200 shadow-2xl'
              } flex items-center justify-center`}
            >
              <Mic size={40} className={isRecording ? 'text-white' : isDarkMode ? 'text-gray-300' : 'text-gray-700'} />
              {isRecording && (
                <div className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-25"></div>
              )}
            </button>
            <div className="text-center">
              <p className={`text-lg lg:text-xl font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {isRecording ? 'Recording...' : 'Record'}
              </p>
              <p className={`text-sm opacity-60 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Share your voice
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FalimyLanding;