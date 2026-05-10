import React from 'react';
import { useResume } from '../../context/ResumeContext';

const CreativeTemplate = () => {
  const { resumeData } = useResume();
  const { personalInfo, experience, education, skills, projects, settings } = resumeData;
  const primaryColor = settings.primaryColor || '#4F46E5';

  return (
    <div style={{ fontFamily: `var(--font-${settings.fontFamily.toLowerCase()}), sans-serif`, color: '#333', display: 'flex', minHeight: '100%' }}>
      
      {/* Left Sidebar */}
      <div style={{ width: '35%', backgroundColor: primaryColor, color: '#fff', padding: '30px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          {personalInfo.photo ? (
            <img 
              src={personalInfo.photo} 
              alt="Profile" 
              style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 15px', display: 'block', border: '3px solid rgba(255,255,255,0.3)' }} 
            />
          ) : (
            <div style={{ width: '120px', height: '120px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', margin: '0 auto 15px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px', fontWeight: 'bold' }}>
              {personalInfo.firstName ? personalInfo.firstName[0] : ''}{personalInfo.lastName ? personalInfo.lastName[0] : ''}
            </div>
          )}
          <h1 style={{ fontSize: '24px', margin: 0, fontWeight: 700, letterSpacing: '1px' }}>
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          <p style={{ fontSize: '14px', margin: '5px 0 0 0', opacity: 0.8 }}>{experience.length > 0 ? experience[0].title : ''}</p>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '16px', textTransform: 'uppercase', letterSpacing: '2px', borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: '5px', marginBottom: '15px' }}>Contact</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
            {personalInfo.email && <div>{personalInfo.email}</div>}
            {personalInfo.phone && <div>{personalInfo.phone}</div>}
            {personalInfo.address && <div>{personalInfo.address}</div>}
            {personalInfo.linkedin && <div>{personalInfo.linkedin}</div>}
            {personalInfo.portfolio && <div>{personalInfo.portfolio}</div>}
          </div>
        </div>

        {skills.length > 0 && (
          <div>
            <h2 style={{ fontSize: '16px', textTransform: 'uppercase', letterSpacing: '2px', borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: '5px', marginBottom: '15px' }}>Skills</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {skills.map((skill, index) => (
                <div key={index} style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#fff' }}></div>
                  {skill}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Content */}
      <div style={{ width: '65%', padding: '40px', backgroundColor: '#fff' }}>
        
        {personalInfo.summary && (
          <section style={{ marginBottom: '30px' }}>
            <h2 style={{ fontSize: '18px', color: primaryColor, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ display: 'block', width: '30px', height: '2px', backgroundColor: primaryColor }}></span> Profile
            </h2>
            <p style={{ margin: 0, lineHeight: 1.6, fontSize: '14px', color: '#555' }}>{personalInfo.summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section style={{ marginBottom: '30px' }}>
            <h2 style={{ fontSize: '18px', color: primaryColor, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ display: 'block', width: '30px', height: '2px', backgroundColor: primaryColor }}></span> Experience
            </h2>
            <div style={{ position: 'relative', borderLeft: `2px solid ${primaryColor}40`, paddingLeft: '20px', marginLeft: '10px' }}>
              {experience.map(exp => (
                <div key={exp.id} style={{ marginBottom: '20px', position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '-26px', top: '5px', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: primaryColor }}></div>
                  <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>{exp.title}</h3>
                  <div style={{ fontSize: '14px', color: primaryColor, fontWeight: 500, margin: '2px 0' }}>{exp.company}</div>
                  <div style={{ fontSize: '12px', color: '#888', fontStyle: 'italic', marginBottom: '8px' }}>{exp.startDate} - {exp.endDate} | {exp.location}</div>
                  <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.5, color: '#555' }}>{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section style={{ marginBottom: '30px' }}>
             <h2 style={{ fontSize: '18px', color: primaryColor, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ display: 'block', width: '30px', height: '2px', backgroundColor: primaryColor }}></span> Education
            </h2>
            {education.map(edu => (
              <div key={edu.id} style={{ marginBottom: '15px' }}>
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 600 }}>{edu.degree}</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#666', marginTop: '2px' }}>
                  <span>{edu.school}</span>
                  <span>
                    {edu.startDate} - {edu.endDate}
                    {edu.cgpa && <span style={{ marginLeft: '8px', color: primaryColor, fontWeight: 500 }}>| {edu.cgpa}</span>}
                  </span>
                </div>
              </div>
            ))}
          </section>
        )}

        {projects.length > 0 && (
          <section>
             <h2 style={{ fontSize: '18px', color: primaryColor, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ display: 'block', width: '30px', height: '2px', backgroundColor: primaryColor }}></span> Projects
            </h2>
            {projects.map(proj => (
              <div key={proj.id} style={{ marginBottom: '15px' }}>
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 600 }}>{proj.title}</h3>
                {proj.link && <a href={`https://${proj.link}`} style={{ fontSize: '12px', color: primaryColor }}>{proj.link}</a>}
                <p style={{ margin: '4px 0 0 0', fontSize: '13px', lineHeight: 1.5, color: '#555' }}>{proj.description}</p>
              </div>
            ))}
          </section>
        )}
      </div>

    </div>
  );
};

export default CreativeTemplate;
