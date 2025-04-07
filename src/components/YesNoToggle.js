import React from 'react';

const YesNoToggle = ({ value, onChange, themeColor = '#007acc' }) => {
  return (
    <div
      style={{
        display: 'inline-flex',
        margin: '0 auto',
        width: '100px',
        border: `2px solid ${themeColor}`,
        borderRadius: '5px',
        overflow: 'hidden'
      }}
    >
      <button
        type="button" // Määritetään, ettei laukaise submitia
        style={{
          flex: 1,
          padding: '10px',
          backgroundColor: value === 'kylla' ? themeColor : '#fff',
          color: value === 'kylla' ? '#fff' : themeColor,
          border: 'none',
          cursor: 'pointer'
        }}
        onClick={() => onChange('kylla')}
      >
        Kyllä
      </button>
      <button
        type="button" // Määritetään, ettei laukaise submitia
        style={{
          flex: 1,
          padding: '10px',
          backgroundColor: value === 'ei' ? themeColor : '#fff',
          color: value === 'ei' ? '#fff' : themeColor,
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
