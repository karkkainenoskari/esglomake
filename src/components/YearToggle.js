// YearToggle.js
import React from 'react';

const YearToggle = ({ value, onChange, themeColor = '#007acc' }) => {
  // Jos arvoa ei ole asetettu, näytetään tyhjä
  const displayValue = value || '';

  // Määritellään valittavat vaihtoehdot
  const options = [
    { label: '1-vuosi', value: '1' },
    { label: '2-vuotta', value: '2' },
    { label: '3-vuotta', value: '3' }
  ];

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-evenly', // tai 'space-around', 'center' jne.
        width: '400px',                 // voit säätää tätä haluamaasi leveyteen
        border: `2px solid ${themeColor}`,
        borderRadius: '5px',
        overflow: 'hidden'
      }}
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          style={{
            flex: 1,
            padding: '10px 20px',          // lisää napin korkeutta ja leveyttä
            backgroundColor: displayValue === option.value ? themeColor : '#fff',
            color: displayValue === option.value ? '#fff' : themeColor,
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px'              // voit säätää fonttikokoa
          }}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default YearToggle;
