import React from 'react';
import { useResume } from '../../context/ResumeContext';

const PersonalInfoForm = () => {
  const { resumeData, updatePersonalInfo } = useResume();
  const { personalInfo } = resumeData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    updatePersonalInfo({ [name]: value });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatePersonalInfo({ photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    updatePersonalInfo({ photo: '' });
  };

  return (
    <div className="form-section">
      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem', color: 'var(--primary-color)' }}>Personal Information</h3>
      
      <div className="grid-2">
        <div className="form-group">
          <label className="form-label" htmlFor="firstName">First Name</label>
          <input 
            type="text" 
            id="firstName" 
            name="firstName" 
            value={personalInfo.firstName} 
            onChange={handleChange} 
            placeholder="John" 
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="lastName">Last Name</label>
          <input 
            type="text" 
            id="lastName" 
            name="lastName" 
            value={personalInfo.lastName} 
            onChange={handleChange} 
            placeholder="Doe" 
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="photo">Profile Photo (Optional)</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {personalInfo.photo ? (
            <div style={{ position: 'relative', width: '60px', height: '60px' }}>
              <img src={personalInfo.photo} alt="Profile" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
              <button 
                onClick={removePhoto} 
                style={{ position: 'absolute', top: '-5px', right: '-5px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '50%', width: '20px', height: '20px', cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                ×
              </button>
            </div>
          ) : null}
          <input 
            type="file" 
            id="photo" 
            accept="image/*"
            onChange={handlePhotoUpload}
            style={{ flex: 1 }}
          />
        </div>
      </div>

      <div className="grid-2">
        <div className="form-group">
          <label className="form-label" htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={personalInfo.email} 
            onChange={handleChange} 
            placeholder="john.doe@example.com" 
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="phone">Phone</label>
          <input 
            type="tel" 
            id="phone" 
            name="phone" 
            value={personalInfo.phone} 
            onChange={handleChange} 
            placeholder="+1 234 567 8900" 
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="address">Address</label>
        <input 
          type="text" 
          id="address" 
          name="address" 
          value={personalInfo.address} 
          onChange={handleChange} 
          placeholder="New York, NY" 
        />
      </div>

      <div className="grid-2">
        <div className="form-group">
          <label className="form-label" htmlFor="linkedin">LinkedIn</label>
          <input 
            type="text" 
            id="linkedin" 
            name="linkedin" 
            value={personalInfo.linkedin} 
            onChange={handleChange} 
            placeholder="linkedin.com/in/johndoe" 
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="portfolio">Portfolio / Website</label>
          <input 
            type="text" 
            id="portfolio" 
            name="portfolio" 
            value={personalInfo.portfolio} 
            onChange={handleChange} 
            placeholder="johndoe.dev" 
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="summary">Professional Summary</label>
        <textarea 
          id="summary" 
          name="summary" 
          value={personalInfo.summary} 
          onChange={handleChange} 
          placeholder="Brief overview of your experience and goals..."
          rows={4}
        />
      </div>
    </div>
  );
};

export default PersonalInfoForm;
