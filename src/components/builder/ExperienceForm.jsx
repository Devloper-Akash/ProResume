import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Plus, Trash2 } from 'lucide-react';

const ExperienceForm = () => {
  const { resumeData, updateSection } = useResume();
  const { experience } = resumeData;

  const handleChange = (id, field, value) => {
    const updatedExperience = experience.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    updateSection('experience', updatedExperience);
  };

  const handleAdd = () => {
    const newExp = {
      id: Date.now().toString(),
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      description: ''
    };
    updateSection('experience', [...experience, newExp]);
  };

  const handleDelete = (id) => {
    updateSection('experience', experience.filter(exp => exp.id !== id));
  };

  return (
    <div className="form-section">
      <div className="form-section-header">
        <h3>Work Experience</h3>
        <button onClick={handleAdd} className="btn btn-secondary">
          <Plus size={15} /> Add Experience
        </button>
      </div>

      {experience.map((exp, index) => (
        <div key={exp.id} className="item-card">
          <button 
            onClick={() => handleDelete(exp.id)}
            className="btn-delete-item"
            title="Remove"
          >
            <Trash2 size={16} />
          </button>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Job Title</label>
              <input 
                type="text" 
                value={exp.title} 
                onChange={(e) => handleChange(exp.id, 'title', e.target.value)} 
                placeholder="Software Engineer" 
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Company</label>
              <input 
                type="text" 
                value={exp.company} 
                onChange={(e) => handleChange(exp.id, 'company', e.target.value)} 
                placeholder="Google" 
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Location</label>
            <input 
              type="text" 
              value={exp.location} 
              onChange={(e) => handleChange(exp.id, 'location', e.target.value)} 
              placeholder="Mountain View, CA" 
              className="form-input"
            />
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Start Date</label>
              <input 
                type="text" 
                value={exp.startDate} 
                onChange={(e) => handleChange(exp.id, 'startDate', e.target.value)} 
                placeholder="Jan 2020" 
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">End Date</label>
              <input 
                type="text" 
                value={exp.endDate} 
                onChange={(e) => handleChange(exp.id, 'endDate', e.target.value)} 
                placeholder="Present" 
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Description</label>
            <textarea 
              value={exp.description} 
              onChange={(e) => handleChange(exp.id, 'description', e.target.value)} 
              placeholder="Describe your responsibilities and achievements..."
              rows={4}
              className="form-textarea"
            />
          </div>
        </div>
      ))}
      
      {experience.length === 0 && (
        <div className="empty-state" style={{ padding: '2.5rem 1.5rem', borderStyle: 'dashed' }}>
          No work experience added yet.
        </div>
      )}
    </div>
  );
};

export default ExperienceForm;
