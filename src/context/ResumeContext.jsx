import React, { createContext, useContext, useState, useEffect } from 'react';

const defaultResumeData = {
  personalInfo: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    address: 'New York, NY',
    linkedin: 'linkedin.com/in/johndoe',
    portfolio: 'johndoe.dev',
    photo: '',
    summary: 'A highly motivated and detail-oriented software engineer with 5+ years of experience building scalable web applications. Passionate about modern UI/UX design and clean, maintainable code.'
  },
  education: [
    {
      id: '1',
      degree: 'Bachelor of Science in Computer Science',
      school: 'University of Technology',
      startDate: 'Sep 2015',
      endDate: 'May 2019',
      cgpa: '3.8/4.0',
      description: 'Graduated with Honors. Specialized in Software Engineering and Artificial Intelligence.'
    }
  ],
  experience: [
    {
      id: '1',
      title: 'Senior Frontend Developer',
      company: 'Tech Solutions Inc.',
      location: 'San Francisco, CA',
      startDate: 'Jan 2021',
      endDate: 'Present',
      description: 'Led the frontend team in migrating a legacy monolithic architecture to a modern micro-frontend setup using React and Vite. Improved application performance by 40% and reduced bundle size by 25%.'
    },
    {
      id: '2',
      title: 'Web Developer',
      company: 'Digital Creations',
      location: 'New York, NY',
      startDate: 'Jun 2019',
      endDate: 'Dec 2020',
      description: 'Developed and maintained responsive e-commerce websites using React and Redux. Collaborated with UI/UX designers to implement pixel-perfect designs.'
    }
  ],
  skills: ['React', 'JavaScript', 'TypeScript', 'Node.js', 'HTML/CSS', 'Tailwind CSS', 'Git', 'Agile'],
  projects: [
    {
      id: '1',
      title: 'E-commerce Dashboard',
      link: 'github.com/johndoe/dashboard',
      description: 'A comprehensive admin dashboard for managing products, orders, and user analytics. Built with React, Recharts, and Material-UI.'
    }
  ],
  certifications: [
    {
      id: '1',
      name: 'AWS Certified Developer - Associate',
      issuer: 'Amazon Web Services',
      date: 'Aug 2022'
    }
  ],
  languages: ['English (Native)', 'Spanish (Intermediate)'],
  settings: {
    template: 'modern', // 'minimal', 'modern', 'creative', 'corporate', 'dark', 'compact'
    primaryColor: '#4F46E5',
    fontFamily: 'Inter',
  }
};

const emptyResumeData = {
  personalInfo: { firstName: '', lastName: '', email: '', phone: '', address: '', linkedin: '', portfolio: '', photo: '', summary: '' },
  education: [],
  experience: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: [],
  settings: { template: 'modern', primaryColor: '#4F46E5', fontFamily: 'Inter' }
};

const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState(() => {
    const savedData = localStorage.getItem('resumeData');
    return savedData ? JSON.parse(savedData) : emptyResumeData;
  });

  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
  }, [resumeData]);

  const updatePersonalInfo = (data) => {
    setResumeData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, ...data } }));
  };

  const updateSection = (section, data) => {
    setResumeData(prev => ({ ...prev, [section]: data }));
  };

  const updateSettings = (key, value) => {
    setResumeData(prev => ({
      ...prev,
      settings: { ...prev.settings, [key]: value }
    }));
  };

  const loadDemoData = () => {
    setResumeData(defaultResumeData);
  };

  const resetData = () => {
    setResumeData(emptyResumeData);
  };

  return (
    <ResumeContext.Provider value={{
      resumeData,
      updatePersonalInfo,
      updateSection,
      updateSettings,
      loadDemoData,
      resetData
    }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};
