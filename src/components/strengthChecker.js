import React from 'react';

export default function StrengthChecker({ password, analysis, badgeStyle }) {
  if (!analysis) return null;

  return (
    <span
      className="strength-badge"
      style={badgeStyle(analysis.level)}
    >
      {analysis.level}
    </span>
  );
}