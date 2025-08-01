import React, { useState } from 'react';
import { Sun, Moon, Mic } from 'lucide-react';
import MomSticker from '../assets/mom_sticker.png';
import DadSticker from '../assets/dad_sticker.png';
import './FamilyLanding.css';

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

  const parentImageSrc = selectedParent === 'MOM' ? MomSticker : DadSticker;
  const themeClass = isDarkMode ? 'dark' : 'light';

  return (
    <div className={`falimy-container ${themeClass}`}>
      {/* Theme Toggle - Top Right */}
      <div className="theme-toggle">
        <button
          onClick={toggleTheme}
          className={`theme-button ${themeClass}`}
        >
          {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </div>

      {/* FALIMY Title - Top Center */}
      <div className="title">
        <h1 className="title-text">FALIMY</h1>
      </div>

      {/* Main Content Container */}
      <div className="main-content">
        
        {/* Left Side - Parent Sticker */}
        <div className="left-side">
          <img 
            src={parentImageSrc} 
            alt={selectedParent} 
            className="parent-image" 
          />
        </div>

        {/* Right Side - All Controls */}
        <div className="right-side">
          
          {/* Parent Toggle Button */}
          <div className="parent-toggle-section">
            <button
              onClick={toggleParent}
              className={`toggle-button ${themeClass}`}
            >
              {selectedParent}
            </button>
          </div>

          {/* Record Button */}
          <div className="record-section">
            <button
              onClick={handleRecord}
              className={`record-button ${isRecording ? 'recording' : `idle ${themeClass}`}`}
            >
              <Mic 
                size={40} 
                className={`record-icon ${isRecording ? 'recording' : `idle ${themeClass}`}`}
              />
              {isRecording && <div className="record-ping"></div>}
            </button>
            <div className="record-text">
              <p className={`record-title ${themeClass}`}>
                {isRecording ? 'Recording...' : 'Record'}
              </p>
              <p className={`record-hint ${themeClass}`}>
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