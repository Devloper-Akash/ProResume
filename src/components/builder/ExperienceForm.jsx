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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--primary-color)', margin: 0 }}>Work Experience</h3>
        <button onClick={handleAdd} className="btn" style={{ backgroundColor: '#eef2ff', color: 'var(--primary-color)', padding: '0.5rem 1rem' }}>
          <Plus size={16} /> Add Experience
        </button>
      </div>

      {experience.map((exp, index) => (
        <div key={exp.id} style={{ 
          backgroundColor: '#f8fafc', 
          padding: '1.5rem', 
          borderRadius: 'var(--radius-md)', 
          border: '1px solid var(--border-color)',
          marginBottom: '1.5rem',
          position: 'relative'
        }}>
          <button 
            onClick={() => handleDelete(exp.id)}
            style={{ position: 'absolute', top: '1rem', right: '1rem', color: '#ef4444' }}
            title="Remove"
          >
            <Trash2 size={18} />
          </button>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Job Title</label>
              <input 
                type="text" 
                value={exp.title} 
                onChange={(e) => handleChange(exp.id, 'title', e.target.value)} 
                placeholder="Software Engineer" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Company</label>
              <input 
                type="text" 
                value={exp.company} 
                onChange={(e) => handleChange(exp.id, 'company', e.target.value)} 
                placeholder="Google" 
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
              />
            </div>
            <div className="form-group">
              <label className="form-label">End Date</label>
              <input 
                type="text" 
                value={exp.endDate} 
                onChange={(e) => handleChange(exp.id, 'endDate', e.target.value)} 
                placeholder="Present" 
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
            />
          </div>
        </div>
      ))}
      
      {experience.length === 0 && (
        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-md)', border: '1px dashed var(--border-color)' }}>
          No work experience added yet.
        </div>
      )}
    </div>
  );
};

export default ExperienceForm;
