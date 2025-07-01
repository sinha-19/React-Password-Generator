import React from 'react';

export default function CheckBox({ checked, onChange, label }) {
  return (
    <label className="checkbox-label">
      <input
        type="checkbox"
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        className="checkbox"
      />
      {label}
    </label>
  );
}