import { useState, useEffect, useCallback, useMemo, useRef } from 'react';

function usePasswordGenerator() {
  const [passwords, setPasswords] = useState([]);
  const [length, setLength] = useState(16);
  const [quantity, setQuantity] = useState(1);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(true);
  const [excludeSimilar, setExcludeSimilar] = useState(false);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);
  const [mustIncludeEach, setMustIncludeEach] = useState(true);
  const [customChars, setCustomChars] = useState('');
  const [excludeChars, setExcludeChars] = useState('');
  const [history, setHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [autoGenerate, setAutoGenerate] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState('');
  const [strengthAnalysis, setStrengthAnalysis] = useState({});
  const [exportFormat, setExportFormat] = useState('txt');

  const timerRef = useRef(null);

  const charsets = useMemo(() => ({
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers: '0123456789',
    special: '!@#$%^&*()_+-=[]{}|;:,.<>?~`',
    similar: 'il1Lo0O',
    ambiguous: '{}[]()/\\\'"`~,;.<>'
  }), []);

  const getCharset = useCallback(() => {
    let charset = '';
    
    if (includeLowercase) charset += charsets.lowercase;
    if (includeUppercase) charset += charsets.uppercase;
    if (includeNumbers) charset += charsets.numbers;
    if (includeSpecialChars) charset += charsets.special;
    if (customChars) charset += customChars;

    if (excludeSimilar) {
      charset = charset.replace(new RegExp(`[${charsets.similar}]`, 'g'), '');
    }
    
    if (excludeAmbiguous) {
      charset = charset.replace(
        new RegExp(`[${charsets.ambiguous.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`, 'g'), 
        ''
      );
    }
    
    if (excludeChars) {
      charset = charset.replace(
        new RegExp(`[${excludeChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`, 'g'), 
        ''
      );
    }

    return [...new Set(charset)].join('');
  }, [
    includeLowercase, includeUppercase, includeNumbers, includeSpecialChars,
    customChars, excludeSimilar, excludeAmbiguous, excludeChars, charsets
  ]);

  const analyzeStrength = useCallback((password) => {
    const analysis = { score: 0, feedback: [] };

    if (password.length >= 12) analysis.score += 25;
    else if (password.length >= 8) analysis.score += 15;
    else analysis.feedback.push('Too short');

    if (/[a-z]/.test(password)) analysis.score += 15;
    else analysis.feedback.push('Add lowercase');

    if (/[A-Z]/.test(password)) analysis.score += 15;
    else analysis.feedback.push('Add uppercase');

    if (/[0-9]/.test(password)) analysis.score += 15;
    else analysis.feedback.push('Add numbers');

    if (/[^a-zA-Z0-9]/.test(password)) analysis.score += 20;
    else analysis.feedback.push('Add symbols');

    const uniqueChars = new Set(password).size;
    if (uniqueChars / password.length > 0.7) analysis.score += 10;
    else analysis.feedback.push('More variety needed');

    if (analysis.score >= 90) analysis.level = 'Excellent';
    else if (analysis.score >= 75) analysis.level = 'Strong';
    else if (analysis.score >= 50) analysis.level = 'Medium';
    else if (analysis.score >= 25) analysis.level = 'Weak';
    else analysis.level = 'Very Weak';

    return analysis;
  }, []);

  const generateSinglePassword = useCallback(() => {
    const charset = getCharset();
    if (!charset) return '';

    let password = '';

    if (mustIncludeEach) {
      const required = [];
      
      if (includeLowercase) {
        required.push(charsets.lowercase[Math.floor(Math.random() * charsets.lowercase.length)]);
      }
      if (includeUppercase) {
        required.push(charsets.uppercase[Math.floor(Math.random() * charsets.uppercase.length)]);
      }
      if (includeNumbers) {
        required.push(charsets.numbers[Math.floor(Math.random() * charsets.numbers.length)]);
      }
      if (includeSpecialChars) {
        required.push(charsets.special[Math.floor(Math.random() * charsets.special.length)]);
      }

      for (let i = required.length; i < length; i++) {
        required.push(charset[Math.floor(Math.random() * charset.length)]);
      }

      password = required.sort(() => Math.random() - 0.5).join('');
    } else {
      for (let i = 0; i < length; i++) {
        password += charset[Math.floor(Math.random() * charset.length)];
      }
    }

    return password;
  }, [
    getCharset, length, mustIncludeEach, includeLowercase, 
    includeUppercase, includeNumbers, includeSpecialChars, charsets
  ]);

  const generatePasswords = useCallback(() => {
    const newPasswords = [];
    const newAnalysis = {};

    for (let i = 0; i < quantity; i++) {
      const password = generateSinglePassword();
      if (password) {
        newPasswords.push({
          id: Date.now() + i,
          value: password,
          timestamp: new Date().toLocaleString()
        });
        newAnalysis[password] = analyzeStrength(password);
      }
    }

    setPasswords(newPasswords);
    setStrengthAnalysis(newAnalysis);

    if (newPasswords.length > 0) {
      setHistory(prev => [...newPasswords, ...prev].slice(0, 50));
    }
  }, [generateSinglePassword, quantity, analyzeStrength]);

  const copyToClipboard = useCallback(async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyFeedback('Copied!');
      setTimeout(() => setCopyFeedback(''), 2000);
    } catch (err) {
      setCopyFeedback('Copy failed');
      setTimeout(() => setCopyFeedback(''), 2000);
    }
  }, []);

  const addToFavorites = useCallback((password) => {
    setFavorites(prev => {
      if (prev.find(fav => fav.value === password.value)) return prev;
      return [password, ...prev].slice(0, 20);
    });
  }, []);

  const removeFromFavorites = useCallback((id) => {
    setFavorites(prev => prev.filter(fav => fav.id !== id));
  }, []);

  const exportPasswords = useCallback(() => {
    const data = passwords.map(p => 
      `${p.value} (${strengthAnalysis[p.value]?.level}) - ${p.timestamp}`
    ).join('\n');
    
    const blob = new Blob([data], { 
      type: exportFormat === 'json' ? 'application/json' : 'text/plain' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `passwords.${exportFormat}`;
    a.click();
    URL.revokeObjectURL(url);
  }, [passwords, strengthAnalysis, exportFormat]);

  const clearAll = useCallback(() => {
    setPasswords([]);
    setHistory([]);
    setStrengthAnalysis({});
  }, []);

  useEffect(() => {
    if (autoGenerate) {
      timerRef.current = setInterval(generatePasswords, 3000);
      return () => clearInterval(timerRef.current);
    } else {
      clearInterval(timerRef.current);
    }
  }, [autoGenerate, generatePasswords]);

  useEffect(() => {
    const saved = localStorage.getItem('passwordGenSettings');
    if (saved) {
      const settings = JSON.parse(saved);
      setLength(settings.length || 16);
      setIncludeUppercase(settings.includeUppercase ?? true);
      setIncludeLowercase(settings.includeLowercase ?? true);
      setIncludeNumbers(settings.includeNumbers ?? true);
      setIncludeSpecialChars(settings.includeSpecialChars ?? true);
      setDarkMode(settings.darkMode ?? false);
    }
  }, []);

  useEffect(() => {
    const settings = {
      length,
      includeUppercase,
      includeLowercase,
      includeNumbers,
      includeSpecialChars,
      darkMode
    };
    localStorage.setItem('passwordGenSettings', JSON.stringify(settings));
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSpecialChars, darkMode]);

  return {
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
  };
}

export default usePasswordGenerator;