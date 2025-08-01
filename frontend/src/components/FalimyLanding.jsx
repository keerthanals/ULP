import React, { useState } from 'react';
import { Sun, Moon, Mic } from 'lucide-react';
import MomSticker from '../assets/mom_sticker.png';
import DadSticker from '../assets/dad_sticker.png';

// ... rest of your component
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

  const styles = {
    container: {
      minHeight: '100vh',
      transition: 'all 0.5s ease',
      backgroundColor: isDarkMode ? '#111827' : '#ffffff',
      color: isDarkMode ? '#ffffff' : '#111827',
      position: 'relative',
      fontFamily: 'system-ui, sans-serif'
    },
    themeToggle: {
      position: 'absolute',
      top: '2rem',
      right: '2rem',
      zIndex: 10,
    },
    themeButton: {
      padding: '0.75rem',
      borderRadius: '50%',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      border: 'none',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
      color: isDarkMode ? '#fbbf24' : '#374151',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      position: 'absolute',
      top: '2rem',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 1,
    },
    titleText: {
      fontSize: '3rem',
      fontWeight: 'bold',
      fontFamily: 'Comic Sans MS, cursive, system-ui',
      margin: 0,
    },
    mainContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-around',
      minHeight: '100vh',
      padding: '2rem',
      paddingTop: '8rem', // Space for the title and toggle button
      '@media (min-width: 768px)': {
        flexDirection: 'row',
        justifyContent: 'center',
      },
    },
    leftSide: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '2rem',
      '@media (min-width: 768px)': {
        marginBottom: 0,
      },
    },
    parentImage: {
      width: 'clamp(200px, 50vw, 400px)',
      height: 'auto',
    },
    rightSide: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '2rem',
      '@media (min-width: 768px)': {
        alignItems: 'flex-start',
      },
    },
    parentToggleSection: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.5rem',
      '@media (min-width: 768px)': {
        alignItems: 'flex-start',
      },
    },
    toggleButton: {
      padding: '0.75rem 2rem',
      borderRadius: '2rem',
      fontWeight: 'bold',
      fontSize: '1.5rem',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      border: '1px solid #d1d5db',
      backgroundColor: isDarkMode ? '#1f2937' : '#f9fafb',
      color: isDarkMode ? '#e5e7eb' : '#374151',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    },
    recordSection: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1rem',
    },
    recordButton: {
      position: 'relative',
      width: '6rem',
      height: '6rem',
      borderRadius: '50%',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      border: isRecording ? 'none' : '2px solid #e5e7eb',
      backgroundColor: isRecording ? '#ef4444' : (isDarkMode ? '#1f2937' : '#ffffff'),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      animation: isRecording ? 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' : 'none',
    },
    recordIcon: {
      color: isRecording ? '#ffffff' : (isDarkMode ? '#d1d5db' : '#374151'),
    },
    recordPing: {
      position: 'absolute',
      inset: 0,
      borderRadius: '50%',
      backgroundColor: '#ef4444',
      animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
      opacity: 0.25,
      display: isRecording ? 'block' : 'none',
    },
    recordText: {
      textAlign: 'center',
    },
    recordTitle: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: isDarkMode ? '#d1d5db' : '#374151',
      margin: 0,
    },
    recordHint: {
      fontSize: '0.875rem',
      opacity: 0.6,
      color: isDarkMode ? '#9ca3af' : '#6b7280',
      margin: '0.25rem 0 0',
    },
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: .5; }
          }
          
          @keyframes ping {
            75%, 100% {
              transform: scale(2);
              opacity: 0;
            }
          }

          @media (min-width: 768px) {
            .mainContent {
              flex-direction: row;
              justify-content: space-around;
            }
            .rightSide {
              align-items: flex-start;
            }
          }
        `}
      </style>

      {/* Theme Toggle - Top Right */}
      <div style={styles.themeToggle}>
        <button
          onClick={toggleTheme}
          style={styles.themeButton}
        >
          {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </div>

      {/* FALIMY Title - Top Center */}
      <div style={styles.title}>
        <h1 style={styles.titleText}>FALIMY</h1>
      </div>

      {/* Main Content Container */}
      <div style={styles.mainContent}>
        
        {/* Left Side - Parent Sticker */}
        <div style={styles.leftSide}>
          <img 
            src={parentImageSrc} 
            alt={selectedParent} 
            style={styles.parentImage} 
          />
        </div>

        {/* Right Side - All Controls */}
        <div style={styles.rightSide}>
          
          {/* Parent Toggle Button */}
          <div style={styles.parentToggleSection}>
            <button
              onClick={toggleParent}
              style={styles.toggleButton}
            >
              {selectedParent}
            </button>
          </div>

          {/* Record Button */}
          <div style={styles.recordSection}>
            <button
              onClick={handleRecord}
              style={styles.recordButton}
            >
              <Mic size={40} style={styles.recordIcon} />
              {isRecording && <div style={styles.recordPing}></div>}
            </button>
            <div style={styles.recordText}>
              <p style={styles.recordTitle}>
                {isRecording ? 'Recording...' : 'Record'}
              </p>
              <p style={styles.recordHint}>
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