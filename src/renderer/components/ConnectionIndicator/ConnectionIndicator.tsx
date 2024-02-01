import React from 'react';
import './ConnectionIndicator.scss'; // Import the CSS file for styling

interface ConnectionIndicatorProps{
    connected: boolean
}

const ConnectionStatus: React.FC<ConnectionIndicatorProps> = ({connected}) => {

  return (
    <div className={`connection-status ${connected ? 'connected' : 'disconnected'}`}>
      <div className="circle" />
    </div>
  );
};

export default ConnectionStatus;
