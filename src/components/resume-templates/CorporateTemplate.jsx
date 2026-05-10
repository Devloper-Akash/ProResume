import React from 'react';
import { useResume } from '../../context/ResumeContext';

const CorporateTemplate = () => {
  const { resumeData } = useResume();
  const { personalInfo, experience, education, skills, projects, settings } = resumeData;
  const primaryColor = settings.primaryColor || '#111827';

  return (
    <div style={{ fontFamily: `var(--font-${settings.fontFamily.toLowerCase()}), sans-serif`, color: '#1f2937', lineHeight: 1.6 }}>
      
      {/* Header */}
      <header style={{ display: 'flex', alignItems: 'center', gap: '20px', paddingBottom: '20px', borderBottom: `3px solid ${primaryColor}`, marginBottom: '20px' }}>
        {personalInfo.photo && (
          <img 
            src={personalInfo.photo} 
            alt="Profile" 
            style={{ width: '90px', height: '90px', objectFit: 'cover', border: '1px solid #d1d5db', padding: '2px' }} 
          />
        )}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '32px', margin: 0, fontWeight: 700, color: '#111827', textTransform: 'uppercase' }}>
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          <div style={{ display: 'flex', gap: '15px', fontSize: '13px', color: '#4b5563', marginTop: '10px', flexWrap: 'wrap' }}>
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>| {personalInfo.phone}</span>}
            {personalInfo.address && <span>| {personalInfo.address}</span>}
            {personalInfo.linkedin && <span>| {personalInfo.linkedin}</span>}
          </div>
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, color: primaryColor, textTransform: 'uppercase', marginBottom: '8px', borderBottom: '1px solid #e5e7eb', paddingBottom: '4px' }}>
            Professional Summary
          </h2>
          <p style={{ margin: 0, fontSize: '14px', textAlign: 'justify' }}>{personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, color: primaryColor, textTransform: 'uppercase', marginBottom: '12px', borderBottom: '1px solid #e5e7eb', paddingBottom: '4px' }}>
            Professional Experience
          </h2>
          {experience.map(exp => (
            <div key={exp.id} style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#111827' }}>{exp.title}</h3>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#4b5563' }}>{exp.startDate} – {exp.endDate}</span>
              </div>
              <div style={{ fontSize: '14px', fontStyle: 'italic', color: '#374151', marginBottom: '6px' }}>
                {exp.company}{exp.location ? `, ${exp.location}` : ''}
              </div>
              <p style={{ margin: 0, fontSize: '13px', textAlign: 'justify' }}>{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, color: primaryColor, textTransform: 'uppercase', marginBottom: '12px', borderBottom: '1px solid #e5e7eb', paddingBottom: '4px' }}>
            Education
          </h2>
          {education.map(edu => (
            <div key={edu.id} style={{ marginBottom: '12px' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#111827' }}>{edu.degree}</h3>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#4b5563' }}>{edu.startDate} – {edu.endDate}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: '2px' }}>
                <div style={{ fontSize: '14px', color: '#374151' }}>{edu.school}</div>
                {edu.cgpa && <div style={{ fontSize: '13px', fontWeight: 600, color: '#111827' }}>CGPA/Score: {edu.cgpa}</div>}
              </div>
              {edu.description && <p style={{ margin: '4px 0 0 0', fontSize: '13px' }}>{edu.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, color: primaryColor, textTransform: 'uppercase', marginBottom: '12px', borderBottom: '1px solid #e5e7eb', paddingBottom: '4px' }}>
            Key Projects
          </h2>
          {projects.map(proj => (
            <div key={proj.id} style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: '#111827' }}>{proj.title}</h3>
                {proj.link && <span style={{ fontSize: '13px', color: '#4b5563' }}>{proj.link}</span>}
              </div>
              <p style={{ margin: '4px 0 0 0', fontSize: '13px', textAlign: 'justify' }}>{proj.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, color: primaryColor, textTransform: 'uppercase', marginBottom: '8px', borderBottom: '1px solid #e5e7eb', paddingBottom: '4px' }}>
            Core Competencies
          </h2>
          <div style={{ fontSize: '14px' }}>
            {skills.join(', ')}
          </div>
        </section>
      )}
    </div>
  );
};

export default CorporateTemplate;
