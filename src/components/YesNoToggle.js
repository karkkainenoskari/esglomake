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
        type="button"
        style={{
          flex: 1,
          padding: '10px',
          backgroundColor: value === 'Kyllä' ? themeColor : '#fff',
          color: value === 'Kyllä' ? '#fff' : themeColor,
          border: 'none',
          cursor: 'pointer',
          borderRight: `2px solid ${themeColor}` 
        }}
        onClick={() => onChange('Kyllä')}
      >
        Kyllä
      </button>
      <button
        type="button"
        style={{
          flex: 1,
          padding: '10px',
          backgroundColor: value === 'Ei' ? themeColor : '#fff',
          color: value === 'Ei' ? '#fff' : themeColor,
          border: 'none',
          cursor: 'pointer'
        }}
        onClick={() => onChange('Ei')}
      >
        Ei
      </button>
    </div>
  );
};

export default YesNoToggle;
