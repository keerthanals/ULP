import React from 'react';
import './Loading.css';
import loadingGif from '../assets/loading.gif'; // Adjust the path as necessary

const Loading = ({ message = "Loading..." }) => {
  return (
    <div className="loading-container">
      <div className="loading-content">
        <div className="loading-gif">
          <img 
            src={loadingGif}
            alt="Loading animation"
            className="loading-image"
          />
        </div>
        <p className="loading-text">{message}</p>
      </div>
    </div>
  );
};

export default Loading;