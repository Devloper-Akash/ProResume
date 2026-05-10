import React from 'react';
import { useResume } from '../../context/ResumeContext';

const MinimalTemplate = () => {
  const { resumeData } = useResume();
  const { personalInfo, experience, education, skills, projects } = resumeData;

  return (
    <div style={{ fontFamily: 'Georgia, serif', color: '#000', maxWidth: '800px', margin: '0 auto', lineHeight: 1.6 }}>
      
      {/* Header */}
      <header style={{ textAlign: 'center', marginBottom: '30px', borderBottom: '1px solid #000', paddingBottom: '20px' }}>
        {personalInfo.photo && (
          <img 
            src={personalInfo.photo} 
            alt="Profile" 
            style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', marginBottom: '10px' }} 
          />
        )}
        <h1 style={{ fontSize: '36px', margin: '0 0 10px 0', fontWeight: 'normal', letterSpacing: '2px' }}>
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <div style={{ fontSize: '14px', display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.address && <span>• {personalInfo.address}</span>}
          {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section style={{ marginBottom: '25px' }}>
          <p style={{ margin: 0 }}>{personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section style={{ marginBottom: '25px' }}>
          <h2 style={{ fontSize: '18px', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #eee', paddingBottom: '5px', marginBottom: '15px' }}>
            Experience
          </h2>
          {experience.map(exp => (
            <div key={exp.id} style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>{exp.title}</h3>
                <span style={{ fontSize: '14px' }}>{exp.startDate} - {exp.endDate}</span>
              </div>
              <div style={{ fontSize: '15px', fontStyle: 'italic', marginBottom: '8px' }}>
                {exp.company}{exp.location ? `, ${exp.location}` : ''}
              </div>
              <p style={{ margin: 0, fontSize: '14px' }}>{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section style={{ marginBottom: '25px' }}>
          <h2 style={{ fontSize: '18px', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #eee', paddingBottom: '5px', marginBottom: '15px' }}>
            Education
          </h2>
          {education.map(edu => (
            <div key={edu.id} style={{ marginBottom: '12px' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>{edu.school}</h3>
                <span style={{ fontSize: '14px' }}>{edu.startDate} - {edu.endDate}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', margin: '4px 0' }}>
                <div style={{ fontSize: '15px', fontStyle: 'italic' }}>{edu.degree}</div>
                {edu.cgpa && <div style={{ fontSize: '14px', fontWeight: 'bold' }}>CGPA/Score: {edu.cgpa}</div>}
              </div>
              {edu.description && <p style={{ margin: 0, fontSize: '14px' }}>{edu.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section style={{ marginBottom: '25px' }}>
          <h2 style={{ fontSize: '18px', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #eee', paddingBottom: '5px', marginBottom: '15px' }}>
            Projects
          </h2>
          {projects.map(proj => (
            <div key={proj.id} style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>{proj.title}</h3>
                {proj.link && <span style={{ fontSize: '14px' }}>{proj.link}</span>}
              </div>
              <p style={{ margin: '4px 0 0 0', fontSize: '14px' }}>{proj.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section style={{ marginBottom: '25px' }}>
          <h2 style={{ fontSize: '18px', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #eee', paddingBottom: '5px', marginBottom: '15px' }}>
            Skills
          </h2>
          <p style={{ margin: 0, fontSize: '14px' }}>
            {skills.join(' • ')}
          </p>
        </section>
      )}
    </div>
  );
};

export default MinimalTemplate;
