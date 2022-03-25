import React from 'react';
import './alert.css';

function Alert ({ alertData }) {
  return (
    <div className={`alertmsg ${alertData.type}`} style={{ right: `${alertData.position}` }}>
      {alertData.message}
    </div>
  );
}

export default Alert;
