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
      <h3>Skills</h3>
      
      <div className="form-group">
        <label className="form-label">Add a skill</label>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input 
            type="text" 
            value={inputValue} 
            onChange={(e) => setInputValue(e.target.value)} 
            onKeyDown={handleAddSkill}
            placeholder="e.g. React, JavaScript, Project Management" 
            className="form-input"
          />
          <button 
            onClick={handleAddSkill}
            className="btn btn-primary" 
          >
            Add
          </button>
        </div>
      </div>

      <div className="tags-pills-list">
        {skills.map((skill, index) => (
          <div 
            key={index} 
            className="pill-tag"
          >
            {skill}
            <button 
              onClick={() => handleRemoveSkill(skill)}
              className="pill-tag-remove-btn"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
      
      {skills.length === 0 && (
        <div className="empty-state" style={{ padding: '2.5rem 1.5rem', borderStyle: 'dashed' }}>
          Add some skills to highlight your expertise.
        </div>
      )}
    </div>
  );
};

export default SkillsForm;
