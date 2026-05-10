import React from 'react';
import { useResume } from '../../context/ResumeContext';

const ModernTemplate = () => {
  const { resumeData } = useResume();
  const { personalInfo, experience, education, skills, projects, settings } = resumeData;
  const primaryColor = settings.primaryColor || '#4F46E5';

  return (
    <div style={{ fontFamily: `var(--font-${settings.fontFamily.toLowerCase()}), sans-serif`, color: '#333' }}>
      
      {/* Header */}
      <header style={{ borderBottom: `2px solid ${primaryColor}`, paddingBottom: '20px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {personalInfo.photo && (
            <img 
              src={personalInfo.photo} 
              alt="Profile" 
              style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: `2px solid ${primaryColor}` }} 
            />
          )}
          <div>
            <h1 style={{ fontSize: '32px', margin: 0, color: primaryColor, textTransform: 'uppercase', letterSpacing: '1px' }}>
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            <p style={{ fontSize: '18px', margin: '5px 0 0 0', fontWeight: 500 }}>{personalInfo.summary ? personalInfo.summary.substring(0, 100) + '...' : ''}</p>
          </div>
        </div>
        <div style={{ textAlign: 'right', fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.address && <span>{personalInfo.address}</span>}
          {personalInfo.linkedin && <a href={`https://${personalInfo.linkedin}`} style={{ color: primaryColor }}>{personalInfo.linkedin}</a>}
          {personalInfo.portfolio && <a href={`https://${personalInfo.portfolio}`} style={{ color: primaryColor }}>{personalInfo.portfolio}</a>}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section style={{ marginBottom: '24px' }}>
          <p style={{ margin: 0, lineHeight: 1.6 }}>{personalInfo.summary}</p>
        </section>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
        {/* Left Column */}
        <div>
          {/* Experience */}
          {experience.length > 0 && (
            <section style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '18px', color: primaryColor, textTransform: 'uppercase', borderBottom: '1px solid #ccc', paddingBottom: '5px', marginBottom: '15px' }}>
                Experience
              </h2>
              {experience.map(exp => (
                <div key={exp.id} style={{ marginBottom: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>{exp.title}</h3>
                    <span style={{ fontSize: '14px', color: '#666', fontStyle: 'italic' }}>{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 500, color: '#555', marginBottom: '8px' }}>
                    {exp.company}{exp.location ? `, ${exp.location}` : ''}
                  </div>
                  <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.5 }}>{exp.description}</p>
                </div>
              ))}
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '18px', color: primaryColor, textTransform: 'uppercase', borderBottom: '1px solid #ccc', paddingBottom: '5px', marginBottom: '15px' }}>
                Projects
              </h2>
              {projects.map(proj => (
                <div key={proj.id} style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>{proj.title}</h3>
                    {proj.link && <a href={`https://${proj.link}`} style={{ fontSize: '14px', color: primaryColor }}>{proj.link}</a>}
                  </div>
                  <p style={{ margin: '4px 0 0 0', fontSize: '14px', lineHeight: 1.5 }}>{proj.description}</p>
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Right Column */}
        <div>
          {/* Education */}
          {education.length > 0 && (
            <section style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '18px', color: primaryColor, textTransform: 'uppercase', borderBottom: '1px solid #ccc', paddingBottom: '5px', marginBottom: '15px' }}>
                Education
              </h2>
              {education.map(edu => (
                <div key={edu.id} style={{ marginBottom: '12px' }}>
                  <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 600 }}>{edu.degree}</h3>
                  <div style={{ fontSize: '14px', color: '#555', margin: '4px 0' }}>{edu.school}</div>
                  <div style={{ fontSize: '13px', color: '#777' }}>
                    {edu.startDate} - {edu.endDate}
                    {edu.cgpa && <span style={{ marginLeft: '10px', color: primaryColor, fontWeight: 500 }}>CGPA/Score: {edu.cgpa}</span>}
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <section style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '18px', color: primaryColor, textTransform: 'uppercase', borderBottom: '1px solid #ccc', paddingBottom: '5px', marginBottom: '15px' }}>
                Skills
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {skills.map((skill, index) => (
                  <span key={index} style={{ 
                    backgroundColor: `${primaryColor}15`, 
                    color: primaryColor, 
                    padding: '4px 10px', 
                    borderRadius: '4px', 
                    fontSize: '13px',
                    fontWeight: 500
                  }}>
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;
