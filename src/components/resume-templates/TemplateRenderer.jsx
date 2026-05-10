import React from 'react';
import { useResume } from '../../context/ResumeContext';
import MinimalTemplate from './MinimalTemplate';
import ModernTemplate from './ModernTemplate';
import CreativeTemplate from './CreativeTemplate';
import CorporateTemplate from './CorporateTemplate';
import CompactTemplate from './CompactTemplate';

const TemplateRenderer = () => {
  const { resumeData } = useResume();
  const { settings } = resumeData;

  switch (settings.template) {
    case 'minimal':
      return <MinimalTemplate />;
    case 'creative':
      return <CreativeTemplate />;
    case 'corporate':
      return <CorporateTemplate />;
    case 'compact':
      return <CompactTemplate />;
    case 'modern':
    default:
      return <ModernTemplate />;
  }
};

export default TemplateRenderer;
