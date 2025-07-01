import React, { useState, useEffect } from 'react';
import usePasswordGenerator from './Hooks/use-password-generator';
import Button from './components/Button';
import CheckBox from './components/CheckBox';
import StrengthChecker from './components/strengthChecker';

function App() {
  const {
    passwords,
    length, setLength,
    quantity, setQuantity,
    includeUppercase, setIncludeUppercase,
    includeLowercase, setIncludeLowercase,
    includeNumbers, setIncludeNumbers,
    includeSpecialChars, setIncludeSpecialChars,
    excludeSimilar, setExcludeSimilar,
    excludeAmbiguous, setExcludeAmbiguous,
    mustIncludeEach, setMustIncludeEach,
    customChars, setCustomChars,
    excludeChars, setExcludeChars,
    history,
    favorites,
    showHistory, setShowHistory,
    showFavorites, setShowFavorites,
    darkMode, setDarkMode,
    autoGenerate, setAutoGenerate,
    copyFeedback,
    strengthAnalysis,
    exportFormat, setExportFormat,
    generatePasswords,
    copyToClipboard,
    addToFavorites,
    removeFromFavorites,
    exportPasswords,
    clearAll
  } = usePasswordGenerator();

  const [theme, setTheme] = useState({});

  useEffect(() => {
    setTheme({
      bg: darkMode ? '#1a1a1a' : '#f5f5f5',
      cardBg: darkMode ? '#2d2d2d' : '#ffffff',
      text: darkMode ? '#ffffff' : '#333333',
      border: darkMode ? '#444444' : '#dddddd',
      accent: '#ff6b35',
      success: '#28a745',
      warning: '#ffc107',
      danger: '#dc3545'
    });
  }, [darkMode]);

  const containerStyle = { 
    background: theme.bg, 
    color: theme.text 
  };

  const cardStyle = { 
    background: theme.cardBg, 
    boxShadow: darkMode ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 20px rgba(0,0,0,0.1)', 
    borderColor: theme.border 
  };

  const inputStyle = { 
    background: theme.cardBg, 
    color: theme.text, 
    borderColor: theme.border 
  };

  const sliderStyle = { 
    background: theme.border 
  };

  const buttonStyle = { 
    background: theme.accent, 
    color: 'white' 
  };

  const actionButtonStyle = { 
    borderColor: theme.border, 
    color: theme.text 
  };

  const tabButtonStyle = (active) => ({
    background: active ? theme.accent : theme.border,
    color: active ? 'white' : theme.text
  });

  const strengthBadgeStyle = (level) => ({
    background: level === 'Excellent' ? theme.success : 
                level === 'Strong' ? '#17a2b8' : 
                level === 'Medium' ? theme.warning : theme.danger
  });

  const passwordItemStyle = { 
    background: theme.bg, 
    borderColor: theme.border 
  };

  return (
    <div className="container" style={containerStyle}>
      <div className="header">
        <h1 className="title" style={{ color: theme.accent }}>
          Advanced Password Generator
        </h1>
        <Button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            background: theme.accent,
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </Button>
      </div>

      <div className="main-grid">
        <div className="card" style={cardStyle}>
          <h3>Generator Settings</h3>

          <div className="control-group">
            <label className="label">Length: {length}</label>
            <input
              type="range"
              min="4"
              max="128"
              value={length}
              onChange={e => setLength(parseInt(e.target.value))}
              className="slider"
              style={sliderStyle}
            />
          </div>

          <div className="control-group">
            <label className="label">Quantity: {quantity}</label>
            <input
              type="range"
              min="1"
              max="10"
              value={quantity}
              onChange={e => setQuantity(parseInt(e.target.value))}
              className="slider"
              style={sliderStyle}
            />
          </div>

          <div className="checkbox-group">
            <CheckBox
              checked={includeUppercase}
              onChange={setIncludeUppercase}
              label="Uppercase (A-Z)"
            />
            <CheckBox
              checked={includeLowercase}
              onChange={setIncludeLowercase}
              label="Lowercase (a-z)"
            />
            <CheckBox
              checked={includeNumbers}
              onChange={setIncludeNumbers}
              label="Numbers (0-9)"
            />
            <CheckBox
              checked={includeSpecialChars}
              onChange={setIncludeSpecialChars}
              label="Special (!@#$%)"
            />
            <CheckBox
              checked={excludeSimilar}
              onChange={setExcludeSimilar}
              label="Exclude Similar"
            />
            <CheckBox
              checked={excludeAmbiguous}
              onChange={setExcludeAmbiguous}
              label="Exclude Ambiguous"
            />
            <CheckBox
              checked={mustIncludeEach}
              onChange={setMustIncludeEach}
              label="Must Include Each Type"
            />
            <CheckBox
              checked={autoGenerate}
              onChange={setAutoGenerate}
              label="Auto Generate (3s)"
            />
          </div>

          <div className="control-group">
            <label className="label">Custom Characters</label>
            <input
              type="text"
              value={customChars}
              onChange={e => setCustomChars(e.target.value)}
              placeholder="Add custom characters"
              className="input"
              style={inputStyle}
            />
          </div>

          <div className="control-group">
            <label className="label">Exclude Characters</label>
            <input
              type="text"
              value={excludeChars}
              onChange={e => setExcludeChars(e.target.value)}
              placeholder="Characters to exclude"
              className="input"
              style={inputStyle}
            />
          </div>

          <Button
            onClick={generatePasswords}
            className="button"
            style={buttonStyle}
          >
            Generate Passwords
          </Button>

          {copyFeedback && (
            <div className="feedback" style={{ color: theme.success }}>
              {copyFeedback}
            </div>
          )}
        </div>

        <div className="card" style={cardStyle}>
          <div className="tab">
            <button
              className="tab-button"
              style={tabButtonStyle(!showHistory && !showFavorites)}
              onClick={() => {
                setShowHistory(false);
                setShowFavorites(false);
              }}
            >
              Generated
            </button>
            <button
              className="tab-button"
              style={tabButtonStyle(showHistory)}
              onClick={() => {
                setShowHistory(true);
                setShowFavorites(false);
              }}
            >
              History
            </button>
            <button
              className="tab-button"
              style={tabButtonStyle(showFavorites)}
              onClick={() => {
                setShowHistory(false);
                setShowFavorites(true);
              }}
            >
              Favorites
            </button>
          </div>

          <div className="export-controls">
            <select
              value={exportFormat}
              onChange={e => setExportFormat(e.target.value)}
              className="input select"
              style={inputStyle}
            >
              <option value="txt">TXT</option>
              <option value="json">JSON</option>
            </select>
            <Button
              onClick={exportPasswords}
              disabled={passwords.length === 0}
              className="action-button"
              style={{
                ...actionButtonStyle,
                opacity: passwords.length === 0 ? 0.5 : 1
              }}
            >
              Export
            </Button>
            <Button
              onClick={clearAll}
              className="action-button"
              style={actionButtonStyle}
            >
              Clear All
            </Button>
          </div>

          <div className="password-list">
            {(!showHistory && !showFavorites ? passwords : 
             showHistory ? history : favorites).map(password => (
              <div
                key={password.id}
                className="password-item"
                style={passwordItemStyle}
              >
                <div className="password-text">
                  {password.value}
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}>
                  <StrengthChecker
                    password={password.value}
                    analysis={strengthAnalysis[password.value]}
                    badgeStyle={strengthBadgeStyle}
                  />
                  <Button
                    onClick={() => copyToClipboard(password.value)}
                    className="action-button"
                    style={actionButtonStyle}
                  >
                    Copy
                  </Button>
                  {!showFavorites && (
                    <Button
                      onClick={() => addToFavorites(password)}
                      className="action-button"
                      style={actionButtonStyle}
                    >
                      ★
                    </Button>
                  )}
                  {showFavorites && (
                    <Button
                      onClick={() => removeFromFavorites(password.id)}
                      className="action-button"
                      style={actionButtonStyle}
                    >
                      ✕
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;