// YesNoToggle.js
import React from 'react';

const YesNoToggle = ({ value, onChange }) => {
  return (
    <div
      style={{
        display: 'flex',
        border: '1px solid #007acc',
        borderRadius: '5px',
        overflow: 'hidden',
        width: '200px' // Säädä halutessasi
      }}
    >
      <button
        style={{
          flex: 1,
          padding: '10px',
          backgroundColor: value === 'kylla' ? '#007acc' : '#fff',
          color: value === 'kylla' ? '#fff' : '#007acc',
          border: 'none',
          cursor: 'pointer'
        }}
        onClick={() => onChange('kylla')}
      >
        Kyllä
      </button>
      <button
        style={{
          flex: 1,
          padding: '10px',
          backgroundColor: value === 'ei' ? '#007acc' : '#fff',
          color: value === 'ei' ? '#fff' : '#007acc',
          border: 'none',
          cursor: 'pointer'
        }}
        onClick={() => onChange('ei')}
      >
        Ei
      </button>
    </div>
  );
};

export default YesNoToggle;
