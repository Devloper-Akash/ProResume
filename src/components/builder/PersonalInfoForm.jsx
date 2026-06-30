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
      <h3>Personal Information</h3>
      
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
            className="form-input"
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
            className="form-input"
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="photo">Profile Photo (Optional)</label>
        <div className="photo-upload-container">
          {personalInfo.photo ? (
            <div className="photo-preview-wrapper">
              <img src={personalInfo.photo} alt="Profile" />
              <button 
                onClick={removePhoto} 
                className="btn-photo-delete"
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
            className="photo-input-file"
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
            className="form-input"
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
            className="form-input"
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
          className="form-input"
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
            className="form-input"
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
            className="form-input"
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
          className="form-textarea"
        />
      </div>
    </div>
  );
};

export default PersonalInfoForm;
