import React, { useState, useEffect } from 'react';

const SaveResumeModal = ({ isOpen, onClose, onSave, defaultName }) => {
  const [resumeName, setResumeName] = useState(defaultName);

  useEffect(() => {
    if (isOpen) {
      setResumeName(defaultName);
    }
  }, [isOpen, defaultName]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (resumeName.trim()) {
      onSave(resumeName.trim());
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'var(--surface-color)', padding: '2rem', borderRadius: 'var(--radius-lg)',
        width: '100%', maxWidth: '400px', boxShadow: 'var(--shadow-lg)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)' }}>
            Save Resume
          </h2>
          <button onClick={onClose} style={{ fontSize: '1.5rem', lineHeight: 1, color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}>&times;</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-main)', fontSize: '0.9rem', fontWeight: 500 }}>Resume Name</label>
            <input 
              type="text" 
              required 
              value={resumeName}
              onChange={(e) => setResumeName(e.target.value)}
              placeholder="e.g. Software Engineer Resume"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-color)',
                color: 'var(--text-main)',
                fontSize: '1rem',
                outline: 'none'
              }}
              autoFocus
            />
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button type="button" onClick={onClose} className="btn btn-outline" style={{ flex: 1 }}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
              Save to Dashboard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SaveResumeModal;
