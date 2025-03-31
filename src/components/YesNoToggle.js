// YesNoToggle.js
import React from 'react';

const YesNoToggle = ({ value, onChange, themeColor = '#007acc' }) => {
  return (
    <div style={{ display: 'flex', width: '200px', border: `1px solid ${themeColor}`, borderRadius: '5px', overflow: 'hidden' }}>
      <button
        style={{
          flex: 1,
          backgroundColor: value === 'kylla' ? themeColor : '#fff',
          color: value === 'kylla' ? '#fff' : themeColor,
          border: 'none',
          cursor: 'pointer',
          padding: '10px'
        }}
        onClick={() => onChange('kylla')}
      >
        Kyllä
      </button>
      <button
        style={{
          flex: 1,
          backgroundColor: value === 'ei' ? themeColor : '#fff',
          color: value === 'ei' ? '#fff' : themeColor,
          border: 'none',
          cursor: 'pointer',
          padding: '10px'
        }}
        onClick={() => onChange('ei')}
      >
        Ei
      </button>
    </div>
  );
};

export default YesNoToggle;
