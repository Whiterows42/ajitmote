import React, { useState, useEffect } from 'react';
import './LoadingScreen.css';

const LoadingScreen = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  const messages = [
    "Initializing connection to Ajit's VMS...",
    "Establishing secure channel...",
    "Loading portfolio components...",
    "Connecting to terminal interface...",
    "Mounting 3D card renderer...",
    "Authentication successful!",
    "Welcome to Ajit's Portfolio System"
  ];

  useEffect(() => {
    // Cursor blinking effect
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => onLoadingComplete(), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 60);

    // Message cycling
    const messageInterval = setInterval(() => {
      setCurrentMessage(prev => {
        if (prev < messages.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 800);

    return () => {
      clearInterval(cursorInterval);
      clearInterval(progressInterval);
      clearInterval(messageInterval);
    };
  }, [onLoadingComplete]);

  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="vms-header">
          <pre>{`
 █████╗      ██╗██╗████████╗    ██╗   ██╗███╗   ███╗███████╗
██╔══██╗     ██║██║╚══██╔══╝    ██║   ██║████╗ ████║██╔════╝
███████║     ██║██║   ██║       ██║   ██║██╔████╔██║███████╗
██╔══██║██   ██║██║   ██║       ╚██╗ ██╔╝██║╚██╔╝██║╚════██║
██║  ██║╚█████╔╝██║   ██║        ╚████╔╝ ██║ ╚═╝ ██║███████║
╚═╝  ╚═╝ ╚════╝ ╚═╝   ╚═╝         ╚═══╝  ╚═╝     ╚═╝╚══════╝
          `}</pre>
        </div>

        <div className="system-info">
          <div className="info-line">Portfolio Terminal v4.0.1</div>
          <div className="info-line">Full Stack Developer Platform</div>
          <div className="info-line">Sangola, Solapur, India</div>
          <div className="info-line">──────────────────────────────────────</div>
        </div>

        <div className="connection-status">
          <div className="status-messages">
            {messages.slice(0, currentMessage + 1).map((message, index) => (
              <div key={index} className={`status-line ${index === currentMessage ? 'current' : ''}`}>
                <span className="prompt">ajit@vms:~$</span>
                <span className="message">{message}</span>
                {index === currentMessage && (
                  <span className={`cursor ${showCursor ? 'visible' : ''}`}>█</span>
                )}
              </div>
            ))}
          </div>

          <div className="progress-container">
            <div className="progress-label">
              Loading System Components... {progress}%
            </div>
            <div className="progress-bar">
              <div className="progress-track">
                <div 
                  className="progress-fill" 
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="progress-text">
                {'█'.repeat(Math.floor(progress / 2.5))}{'░'.repeat(40 - Math.floor(progress / 2.5))}
              </div>
            </div>
          </div>
        </div>

        <div className="loading-footer">
          <div className="footer-line">
            {progress < 100 ? 'Establishing connection...' : 'Connection established!'}
          </div>
          <div className="footer-line">
            Press any key to continue once loading is complete
          </div>
        </div>
      </div>

      <div className="scanlines"></div>
    </div>
  );
};

export default LoadingScreen; 