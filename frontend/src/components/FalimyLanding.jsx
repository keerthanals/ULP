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

  const styles = {
    container: {
      minHeight: '100vh',
      transition: 'all 0.5s ease',
      backgroundColor: isDarkMode ? '#111827' : '#ffffff',
      color: isDarkMode ? '#ffffff' : '#111827',
      position: 'relative'
    },
    themeToggle: {
      position: 'absolute',
      top: '2rem',
      right: '2rem'
    },
    themeButton: {
      padding: '1rem',
      borderRadius: '0.75rem',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      border: 'none',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
      color: isDarkMode ? '#fbbf24' : '#374151',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: isDarkMode ? '#374151' : '#e5e7eb'
    },
    title: {
      position: 'absolute',
      top: '4rem',
      left: '50%',
      transform: 'translateX(-50%)'
    },
    titleText: {
      fontSize: 'clamp(3rem, 8vw, 6rem)',
      fontWeight: 'bold',
      transition: 'color 0.3s ease',
      color: isDarkMode ? '#ffffff' : '#111827',
      fontFamily: 'Comic Sans MS, cursive, system-ui',
      textShadow: isDarkMode ? '0 0 30px rgba(255,255,255,0.1)' : '0 0 30px rgba(0,0,0,0.1)',
      letterSpacing: '-0.02em',
      margin: 0
    },
    mainContent: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      minHeight: '100vh',
      padding: '0 2rem',
      paddingTop: '8rem'
    },
    leftSide: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center'
    },
    parentSticker: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1.5rem'
    },
    stickerCard: {
      position: 'relative',
      width: 'clamp(16rem, 20vw, 20rem)',
      height: 'clamp(16rem, 20vw, 20rem)',
      borderRadius: '1.5rem',
      transition: 'all 0.7s ease',
      backgroundColor: isDarkMode ? '#1f2937' : 'linear-gradient(to bottom right, #f9fafb, #f3f4f6)',
      background: isDarkMode ? '#1f2937' : 'linear-gradient(to bottom right, #f9fafb, #f3f4f6)',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: isDarkMode ? '#374151' : '#e5e7eb',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      cursor: 'pointer'
    },
    parentContent: {
      textAlign: 'center'
    },
    parentEmoji: {
      fontSize: 'clamp(3rem, 6vw, 4.5rem)',
      marginBottom: '1rem'
    },
    parentLabel: {
      fontWeight: 'bold',
      fontSize: 'clamp(1.5rem, 3vw, 2rem)',
      color: selectedParent === 'MOM' 
        ? (isDarkMode ? '#f9a8d4' : '#db2777')
        : (isDarkMode ? '#93c5fd' : '#2563eb')
    },
    rightSide: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '3rem'
    },
    parentToggleSection: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1rem'
    },
    toggleButton: {
      padding: '1.5rem 4rem',
      borderRadius: '1rem',
      fontWeight: 'bold',
      fontSize: 'clamp(1.5rem, 3vw, 2rem)',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      border: 'none',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      background: selectedParent === 'MOM'
        ? (isDarkMode 
          ? 'linear-gradient(to right, #db2777, #e11d48)' 
          : 'linear-gradient(to right, #ec4899, #f43f5e)')
        : (isDarkMode
          ? 'linear-gradient(to right, #2563eb, #4f46e5)'
          : 'linear-gradient(to right, #3b82f6, #6366f1)'),
      color: '#ffffff',
      borderWidth: isDarkMode ? '1px' : '0',
      borderStyle: 'solid',
      borderColor: selectedParent === 'MOM' 
        ? (isDarkMode ? '#ec4899' : 'transparent')
        : (isDarkMode ? '#3b82f6' : 'transparent')
    },
    toggleHint: {
      fontSize: '0.875rem',
      fontWeight: '500',
      opacity: 0.6,
      color: isDarkMode ? '#9ca3af' : '#6b7280'
    },
    recordSection: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1rem'
    },
    recordButton: {
      position: 'relative',
      width: 'clamp(7rem, 8vw, 8rem)',
      height: 'clamp(7rem, 8vw, 8rem)',
      borderRadius: '50%',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      border: isRecording ? 'none' : (isDarkMode ? '1px solid #4b5563' : '2px solid #e5e7eb'),
      backgroundColor: isRecording 
        ? '#ef4444'
        : (isDarkMode ? '#1f2937' : '#ffffff'),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      animation: isRecording ? 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' : 'none'
    },
    recordIcon: {
      color: isRecording ? '#ffffff' : (isDarkMode ? '#d1d5db' : '#374151')
    },
    recordPing: {
      position: 'absolute',
      inset: 0,
      borderRadius: '50%',
      backgroundColor: '#ef4444',
      animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
      opacity: 0.25,
      display: isRecording ? 'block' : 'none'
    },
    recordText: {
      textAlign: 'center'
    },
    recordTitle: {
      fontSize: 'clamp(1.125rem, 2vw, 1.25rem)',
      fontWeight: '600',
      color: isDarkMode ? '#d1d5db' : '#374151'
    },
    recordHint: {
      fontSize: '0.875rem',
      opacity: 0.6,
      color: isDarkMode ? '#9ca3af' : '#6b7280'
    }
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes pulse {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: .5;
            }
          }
          
          @keyframes ping {
            75%, 100% {
              transform: scale(2);
              opacity: 0;
            }
          }

          .theme-button:hover {
            transform: scale(1.05);
          }

          .sticker-card:hover {
            transform: scale(1.02);
          }

          .toggle-button:hover {
            filter: brightness(1.1);
            transform: scale(1.05);
          }

          .toggle-button:active {
            transform: scale(0.95);
          }

          .record-button:hover {
            transform: scale(1.1);
          }

          .record-button:active {
            transform: scale(0.95);
          }

          @media (min-width: 1024px) {
            .main-content {
              padding: 0 4rem;
              padding-top: 8rem;
            }
            
            .left-side {
              justify-content: flex-start;
            }
            
            .right-side {
              align-items: flex-end;
            }
          }
        `}
      </style>

      {/* Theme Toggle - Top Right */}
      <div style={styles.themeToggle}>
        <button
          onClick={toggleTheme}
          style={styles.themeButton}
          className="theme-button"
        >
          {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </div>

      {/* FALIMY Title - Top Center */}
      <div style={styles.title}>
        <h1 style={styles.titleText}>
          FALIMY
        </h1>
      </div>

      {/* Main Content Container */}
      <div style={styles.mainContent} className="main-content">
        
        {/* Left Side - Parent Sticker */}
        <div style={styles.leftSide} className="left-side">
          <div style={styles.parentSticker}>
            <div style={styles.stickerCard} className="sticker-card">
              {selectedParent === 'MOM' ? (
                <div style={styles.parentContent}>
                  <div style={styles.parentEmoji}>👩‍💼</div>
                  <span style={styles.parentLabel}>
                    MOM
                  </span>
                </div>
              ) : (
                <div style={styles.parentContent}>
                  <div style={styles.parentEmoji}>👨‍💼</div>
                  <span style={styles.parentLabel}>
                    DAD
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side - All Controls */}
        <div style={styles.rightSide} className="right-side">
          
          {/* Parent Toggle Button */}
          <div style={styles.parentToggleSection}>
            <button
              onClick={toggleParent}
              style={styles.toggleButton}
              className="toggle-button"
            >
              {selectedParent}
            </button>
            <p style={styles.toggleHint}>
              Switch Parent
            </p>
          </div>

          {/* Record Button */}
          <div style={styles.recordSection}>
            <button
              onClick={handleRecord}
              style={styles.recordButton}
              className="record-button"
            >
              <Mic size={40} style={styles.recordIcon} />
              {isRecording && (
                <div style={styles.recordPing}></div>
              )}
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