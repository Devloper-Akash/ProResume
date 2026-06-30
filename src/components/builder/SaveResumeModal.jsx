import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

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

  const modalContent = (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-decor-glow" />

        <div className="modal-header">
          <h2>Save Resume</h2>
          <button onClick={onClose} className="modal-close-x">&times;</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '1.75rem' }}>
            <label className="form-label">Resume Name</label>
            <input 
              type="text" 
              required 
              value={resumeName}
              onChange={(e) => setResumeName(e.target.value)}
              placeholder="e.g. Software Engineer Resume"
              className="form-input"
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

  return createPortal(modalContent, document.body);
};

export default SaveResumeModal;
