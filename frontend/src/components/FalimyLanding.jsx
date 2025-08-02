import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Sun, Moon, Mic } from 'lucide-react';
import MomSticker from '../assets/mom_sticker.png';
import DadSticker from '../assets/dad_sticker.png';
import './FamilyLanding.css';
import Loading from './Loading';

const FalimyLanding = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedParent, setSelectedParent] = useState('MOM');
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [finalTranscript, setFinalTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [apiResponse, setApiResponse] = useState('');
  
  const recognitionRef = useRef(null);
  const isInitialized = useRef(false);

  // API call function
  const makeApiCall = useCallback(async (text) => {
    if (!text.trim()) return;
    
    setIsProcessing(true);
    setError('');
    
    try {
      console.log('Making API call with text:', text);
      const response = await fetch('https://ulp-1.onrender.com/generate-scolding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          scenario: text,
          character: selectedParent.toLowerCase(),
        }),
      });

      if (!response.ok) {
        throw new Error(`API call failed: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log('API Response:', result);
      setApiResponse(result.response || 'Response received successfully');
      
    } catch (error) {
      console.error('API call error:', error);
      setError(`Failed to process speech: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  }, [selectedParent]);

  // Initialize Speech Recognition
  useEffect(() => {
    if (isInitialized.current) return;
    
    // Check for speech recognition support
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setError('Speech recognition not supported in this browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    
    // Configure speech recognition
    recognitionRef.current.continuous = true; // <-- This is the main fix
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = 'en-US';
    recognitionRef.current.maxAlternatives = 1;

    recognitionRef.current.onstart = () => {
      console.log('Speech recognition started');
      setError('');
      setTranscript('');
      setFinalTranscript('');
      setApiResponse('');
    };

    recognitionRef.current.onresult = (event) => {
      let interimTranscript = '';
      let finalText = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptPart = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalText += transcriptPart + ' '; // Add space for better formatting
        } else {
          interimTranscript += transcriptPart;
        }
      }
      
      setTranscript(interimTranscript);
      if (finalText) {
        setFinalTranscript(prev => prev + finalText);
      }
    };

    recognitionRef.current.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      let errorMessage = 'Speech recognition error occurred';
      
      switch (event.error) {
        case 'no-speech':
          errorMessage = 'No speech detected. Please try again.';
          break;
        case 'audio-capture':
          errorMessage = 'Microphone access denied or not available.';
          break;
        case 'not-allowed':
          errorMessage = 'Microphone permission denied. Please allow microphone access.';
          break;
        case 'network':
          errorMessage = 'Network error occurred. Please check your connection.';
          break;
        default:
          errorMessage = `Speech recognition error: ${event.error}`;
      }
      
      setError(errorMessage);
      setIsRecording(false);
      recognitionRef.current.stop(); // Ensure it's stopped on error
    };

    recognitionRef.current.onend = () => {
      console.log('Speech recognition ended');
      setIsRecording(false);
      
      // Use the final transcript for API call
      const textToSend = finalTranscript.trim();
      if (textToSend) {
        console.log('Sending to API:', textToSend);
        makeApiCall(textToSend);
      } else {
        setError('No speech detected. Please try speaking again.');
      }
    };

    isInitialized.current = true;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [makeApiCall, finalTranscript]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleParent = () => {
    setSelectedParent(selectedParent === 'MOM' ? 'DAD' : 'MOM');
  };

  const handleRecord = async () => {
    if (!recognitionRef.current) {
      setError('Speech recognition not available');
      return;
    }

    if (isRecording) {
      // Stop recording
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.error('Error stopping recognition:', error);
      }
      setIsRecording(false);
    } else {
      // Request microphone permission first
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
      } catch (error) {
        setError('Microphone permission denied. Please allow access to use voice recording.');
        return;
      }

      // Start recording
      setTranscript('');
      setFinalTranscript('');
      setError('');
      setApiResponse('');
      
      try {
        recognitionRef.current.start();
        setIsRecording(true);
      } catch (error) {
        console.error('Failed to start recording:', error);
        setError('Failed to start recording. Please try again.');
      }
    }
  };

  const parentImageSrc = selectedParent === 'MOM' ? MomSticker : DadSticker;
  const themeClass = isDarkMode ? 'dark' : 'light';

  return (
    <div className={`falimy-container ${themeClass}`}>
      {isProcessing && <Loading />}
      
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
              disabled={isRecording || isProcessing}
            >
              {selectedParent}
            </button>
          </div>

          {/* Record Button */}
          <div className="record-section">
            <button
              onClick={handleRecord}
              className={`record-button ${isRecording ? 'recording' : `idle ${themeClass}`}`}
              disabled={isProcessing}
            >
              <Mic 
                size={40} 
                className={`record-icon ${isRecording ? 'recording' : `idle ${themeClass}`}`}
              />
              {isRecording && <div className="record-ping"></div>}
            </button>
            <div className="record-text">
              <p className={`record-title ${themeClass}`}>
                {isProcessing ? 'Processing...' : isRecording ? 'Listening...' : 'Record'}
              </p>
              <p className={`record-hint ${themeClass}`}>
                {isRecording ? 'Speak now' : 'Share your voice'}
              </p>
            </div>
          </div>

          {/* Live Transcript Display */}
          {(transcript || finalTranscript) && (
            <div className={`transcript-section ${themeClass}`}>
              <h3>Speech to Text:</h3>
              <p className="final-transcript">{finalTranscript}</p>
              {transcript && <p className="interim-transcript">{transcript}</p>}
            </div>
          )}

          {/* API Response Display */}
          {apiResponse && (
            <div className={`response-section ${themeClass}`}>
              <h3>Response:</h3>
              <p>{apiResponse}</p>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className={`error-section ${themeClass}`}>
              <p className="error-text">{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FalimyLanding;