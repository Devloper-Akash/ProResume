import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Plus, Trash2 } from 'lucide-react';

const EducationForm = () => {
  const { resumeData, updateSection } = useResume();
  const { education } = resumeData;

  const handleChange = (id, field, value) => {
    const updatedEducation = education.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    updateSection('education', updatedEducation);
  };

  const handleAdd = () => {
    const newEdu = {
      id: Date.now().toString(),
      degree: '',
      school: '',
      startDate: '',
      endDate: '',
      cgpa: '',
      description: ''
    };
    updateSection('education', [...education, newEdu]);
  };

  const handleDelete = (id) => {
    updateSection('education', education.filter(edu => edu.id !== id));
  };

  return (
    <div className="form-section">
      <div className="form-section-header">
        <h3>Education</h3>
        <button onClick={handleAdd} className="btn btn-secondary">
          <Plus size={15} /> Add Education
        </button>
      </div>

      {education.map((edu, index) => (
        <div key={edu.id} className="item-card">
          <button 
            onClick={() => handleDelete(edu.id)}
            className="btn-delete-item"
            title="Remove"
          >
            <Trash2 size={16} />
          </button>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Degree / Program</label>
              <input 
                type="text" 
                value={edu.degree} 
                onChange={(e) => handleChange(edu.id, 'degree', e.target.value)} 
                placeholder="Bachelor of Science in Computer Science" 
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">School / University</label>
              <input 
                type="text" 
                value={edu.school} 
                onChange={(e) => handleChange(edu.id, 'school', e.target.value)} 
                placeholder="University of Technology" 
                className="form-input"
              />
            </div>
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Start Date</label>
              <input 
                type="text" 
                value={edu.startDate} 
                onChange={(e) => handleChange(edu.id, 'startDate', e.target.value)} 
                placeholder="Sep 2015" 
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">End Date</label>
              <input 
                type="text" 
                value={edu.endDate} 
                onChange={(e) => handleChange(edu.id, 'endDate', e.target.value)} 
                placeholder="May 2019" 
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">CGPA / Percentage (Optional)</label>
            <input 
              type="text" 
              value={edu.cgpa || ''} 
              onChange={(e) => handleChange(edu.id, 'cgpa', e.target.value)} 
              placeholder="e.g. 3.8/4.0 or 85%" 
              className="form-input"
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Description (Optional)</label>
            <textarea 
              value={edu.description} 
              onChange={(e) => handleChange(edu.id, 'description', e.target.value)} 
              placeholder="Relevant coursework, honors, GPA..."
              rows={2}
              className="form-textarea"
            />
          </div>
        </div>
      ))}
      
      {education.length === 0 && (
        <div className="empty-state" style={{ padding: '2.5rem 1.5rem', borderStyle: 'dashed' }}>
          No education added yet.
        </div>
      )}
    </div>
  );
};

export default EducationForm;
