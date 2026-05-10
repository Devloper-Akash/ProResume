import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Plus, X } from 'lucide-react';

const SkillsForm = () => {
  const { resumeData, updateSection } = useResume();
  const { skills } = resumeData;
  const [inputValue, setInputValue] = useState('');

  const handleAddSkill = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      e.preventDefault();
      const newSkill = inputValue.trim();
      if (newSkill && !skills.includes(newSkill)) {
        updateSection('skills', [...skills, newSkill]);
        setInputValue('');
      }
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    updateSection('skills', skills.filter(skill => skill !== skillToRemove));
  };

  return (
    <div className="form-section">
      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--primary-color)', marginBottom: '1.5rem' }}>Skills</h3>
      
      <div className="form-group" style={{ position: 'relative' }}>
        <label className="form-label">Add a skill</label>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input 
            type="text" 
            value={inputValue} 
            onChange={(e) => setInputValue(e.target.value)} 
            onKeyDown={handleAddSkill}
            placeholder="e.g. React, JavaScript, Project Management" 
          />
          <button 
            onClick={handleAddSkill}
            className="btn btn-primary" 
            style={{ padding: '0.5rem 1rem' }}
          >
            Add
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1.5rem' }}>
        {skills.map((skill, index) => (
          <div 
            key={index} 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              backgroundColor: '#eef2ff', 
              color: 'var(--primary-color)', 
              padding: '0.5rem 1rem', 
              borderRadius: '2rem',
              fontWeight: 500,
              fontSize: '0.875rem'
            }}
          >
            {skill}
            <button 
              onClick={() => handleRemoveSkill(skill)}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6366f1', hover: { color: '#ef4444' } }}
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
      
      {skills.length === 0 && (
        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
          Add some skills to highlight your expertise.
        </div>
      )}
    </div>
  );
};

export default SkillsForm;
