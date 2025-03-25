import React, { useRef, useEffect } from 'react';

const AutoResizeTextArea = ({ value, onChange, style, ...props }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={onChange}
      {...props}
      style={{ resize: 'none', overflow: 'hidden', ...style }}
    />
  );
};

export default AutoResizeTextArea;
