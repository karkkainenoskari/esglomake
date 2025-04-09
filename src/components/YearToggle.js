import React from 'react';

const YearToggle = ({ value, onChange, themeColor = '#007acc' }) => {
  const displayValue = value || '';

  const options = [
    { label: '1-vuosi', value: '1' },
    { label: '2-vuotta', value: '2' },
    { label: '3-vuotta', value: '3' }
  ];

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-evenly',
        width: '400px',
        border: `2px solid ${themeColor}`,
        borderRadius: '5px',
        overflow: 'hidden'
      }}
    >
      {options.map((option, index) => (
        <button
          key={option.value}
          type="button"
          style={{
            flex: 1,
            padding: '10px 20px',
            backgroundColor: displayValue === option.value ? themeColor : '#fff',
            color: displayValue === option.value ? '#fff' : themeColor,
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
            // Lisätään erottava viiva kaikille paitsi viimeiselle napille
            borderRight: index < options.length - 1 ? `2px solid ${themeColor}` : 'none'
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
