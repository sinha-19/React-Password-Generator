import React from 'react';

export default function Button({ children, onClick, disabled, className, style }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={style}
    >
      {children}
    </button>
  );
}