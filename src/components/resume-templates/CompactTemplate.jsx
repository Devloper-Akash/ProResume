import React from 'react';
import { useResume } from '../../context/ResumeContext';

const CompactTemplate = () => {
  const { resumeData } = useResume();
  const { personalInfo, experience, education, skills, projects, settings } = resumeData;
  const primaryColor = settings.primaryColor || '#059669';

  return (
    <div style={{ fontFamily: `var(--font-${settings.fontFamily.toLowerCase()}), sans-serif`, color: '#27272a', fontSize: '13px', lineHeight: 1.4 }}>

      {/* Header */}
      <header style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px', paddingBottom: '10px', borderBottom: '2px solid #e4e4e7' }}>
        {personalInfo.photo && (
          <img
            src={personalInfo.photo}
            alt="Profile"
            style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '4px' }}
          />
        )}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '24px', margin: '0 0 4px 0', fontWeight: 700, color: primaryColor }}>
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', fontSize: '12px', color: '#52525b' }}>
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>• {personalInfo.phone}</span>}
            {personalInfo.address && <span>• {personalInfo.address}</span>}
            {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
          </div>
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section style={{ marginBottom: '12px' }}>
          <p style={{ margin: 0, textAlign: 'justify' }}>{personalInfo.summary}</p>
        </section>
      )}

      {/* Grid Layout for compact view */}
      <div style={{ display: 'flex', gap: '20px' }}>

        {/* Left Column (Wider) */}
        <div style={{ flex: 2 }}>
          {/* Experience */}
          {experience.length > 0 && (
            <section style={{ marginBottom: '15px' }}>
              <h2 style={{ fontSize: '14px', fontWeight: 700, color: primaryColor, textTransform: 'uppercase', marginBottom: '8px', borderBottom: `1px solid ${primaryColor}40` }}>
                Experience
              </h2>
              {experience.map(exp => (
                <div key={exp.id} style={{ marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>{exp.title}</h3>
                    <span style={{ fontSize: '12px', color: '#71717a' }}>{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <div style={{ fontSize: '13px', color: '#3f3f46', marginBottom: '2px' }}>
                    {exp.company}{exp.location ? `, ${exp.location}` : ''}
                  </div>
                  <p style={{ margin: 0, fontSize: '12px', color: '#52525b' }}>{exp.description}</p>
                </div>
              ))}
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section style={{ marginBottom: '15px' }}>
              <h2 style={{ fontSize: '14px', fontWeight: 700, color: primaryColor, textTransform: 'uppercase', marginBottom: '8px', borderBottom: `1px solid ${primaryColor}40` }}>
                Projects
              </h2>
              {projects.map(proj => (
                <div key={proj.id} style={{ marginBottom: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h3 style={{ margin: 0, fontSize: '13px', fontWeight: 600 }}>{proj.title}</h3>
                  </div>
                  <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#52525b' }}>{proj.description}</p>
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Right Column (Narrower) */}
        <div style={{ flex: 1 }}>
          {/* Education */}
          {education.length > 0 && (
            <section style={{ marginBottom: '15px' }}>
              <h2 style={{ fontSize: '14px', fontWeight: 700, color: primaryColor, textTransform: 'uppercase', marginBottom: '8px', borderBottom: `1px solid ${primaryColor}40` }}>
                Education
              </h2>
              {education.map(edu => (
                <div key={edu.id} style={{ marginBottom: '10px' }}>
                  <h3 style={{ margin: 0, fontSize: '13px', fontWeight: 600 }}>{edu.degree}</h3>
                  <div style={{ fontSize: '12px', color: '#52525b', margin: '2px 0' }}>{edu.school}</div>
                  <div style={{ fontSize: '12px', color: '#71717a' }}>{edu.startDate} - {edu.endDate}</div>
                  {edu.cgpa && <div style={{ fontSize: '12px', fontWeight: 600, marginTop: '2px', color: primaryColor }}>CGPA: {edu.cgpa}</div>}
                </div>
              ))}
            </section>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <section style={{ marginBottom: '15px' }}>
              <h2 style={{ fontSize: '14px', fontWeight: 700, color: primaryColor, textTransform: 'uppercase', marginBottom: '8px', borderBottom: `1px solid ${primaryColor}40` }}>
                Skills
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {skills.map((skill, index) => (
                  <span key={index} style={{
                    backgroundColor: '#f4f4f5',
                    padding: '2px 6px',
                    borderRadius: '2px',
                    fontSize: '11px',
                    border: '1px solid #e4e4e7'
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

export default CompactTemplate;
