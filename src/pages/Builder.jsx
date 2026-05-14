import React, { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Download, Printer, Settings, User, Briefcase, GraduationCap, Code, LayoutDashboard, Save } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import { supabase } from '../utils/supabase';
import TemplateRenderer from '../components/resume-templates/TemplateRenderer';
import PersonalInfoForm from '../components/builder/PersonalInfoForm';
import ExperienceForm from '../components/builder/ExperienceForm';
import EducationForm from '../components/builder/EducationForm';
import SkillsForm from '../components/builder/SkillsForm';
import SettingsForm from '../components/builder/SettingsForm';
import AuthModal from '../components/layout/AuthModal';
import SaveResumeModal from '../components/builder/SaveResumeModal';
import { useAuth } from '../context/AuthContext';

const Builder = () => {
  const { resumeData, updateSettings } = useResume();
  const { user } = useAuth();
  const componentRef = useRef(null);
  const [activeTab, setActiveTab] = useState('personal');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  const handlePrintAction = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `${resumeData.personalInfo.firstName || 'Resume'}_${resumeData.personalInfo.lastName || 'Draft'}`,
  });

  const handlePrint = () => {
    if (!user) {
      setPendingAction('print');
      setIsAuthModalOpen(true);
    } else {
      handlePrintAction();
    }
  };

  const handleDownloadPDFAction = async () => {
    const element = componentRef.current;
    if (!element) return;

    try {
      const canvas = await html2canvas(element, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      
      const fileName = `${resumeData.personalInfo.firstName || 'Resume'}_${resumeData.personalInfo.lastName || 'Draft'}.pdf`;
      
      // Save locally
      pdf.save(fileName);

      // Upload to Supabase Storage if user is authenticated
      if (user) {
        const pdfBlob = pdf.output('blob');
        const timestamp = new Date().getTime();
        const storagePath = `${user.id}/${timestamp}_${fileName}`;
        
        const { error: uploadError } = await supabase.storage
          .from('resumes')
          .upload(storagePath, pdfBlob, {
            contentType: 'application/pdf',
            upsert: true
          });
          
        if (uploadError) {
          console.error("Error uploading PDF to storage:", uploadError);
        } else {
          console.log("PDF successfully saved to Supabase storage");
        }
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try printing instead.");
    }
  };

  const handleDownloadPDF = () => {
    if (!user) {
      setPendingAction('download');
      setIsAuthModalOpen(true);
    } else {
      handleDownloadPDFAction();
    }
  };

  const handleConfirmSave = async (resumeName) => {
    try {
      const { error } = await supabase.from('resumes').insert({
        user_id: user.id,
        resume_name: resumeName,
        resume_data: resumeData,
      });

      if (error) throw error;
      alert("Resume saved successfully!");
      setIsSaveModalOpen(false);
    } catch (error) {
      console.error("Error saving resume:", error);
      alert("Failed to save resume.");
    }
  };

  const handleSave = () => {
    if (!user) {
      setPendingAction('save');
      setIsAuthModalOpen(true);
    } else {
      setIsSaveModalOpen(true);
    }
  };

  const handleLoginSuccess = () => {
    setIsAuthModalOpen(false);
    if (pendingAction === 'print') {
      handlePrintAction();
    } else if (pendingAction === 'download') {
      handleDownloadPDFAction();
    } else if (pendingAction === 'save') {
      setIsSaveModalOpen(true);
    }
    setPendingAction(null);
  };

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 65px)', overflow: 'hidden' }}>
      {/* Sidebar / Form Area */}
      <div style={{ 
        width: '45%', 
        minWidth: '400px',
        borderRight: '1px solid var(--border-color)', 
        backgroundColor: 'var(--surface-color)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', display: 'flex', gap: '0.5rem', overflowX: 'auto' }}>
          <button 
            onClick={() => setActiveTab('personal')}
            className={`btn ${activeTab === 'personal' ? 'btn-primary' : 'btn-outline'}`}
            style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', flexShrink: 0 }}
          >
            <User size={16} /> Personal
          </button>
          <button 
            onClick={() => setActiveTab('experience')}
            className={`btn ${activeTab === 'experience' ? 'btn-primary' : 'btn-outline'}`}
            style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', flexShrink: 0 }}
          >
            <Briefcase size={16} /> Experience
          </button>
          <button 
            onClick={() => setActiveTab('education')}
            className={`btn ${activeTab === 'education' ? 'btn-primary' : 'btn-outline'}`}
            style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', flexShrink: 0 }}
          >
            <GraduationCap size={16} /> Education
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`btn ${activeTab === 'settings' ? 'btn-primary' : 'btn-outline'}`}
            style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', flexShrink: 0 }}
          >
            <Settings size={16} /> Settings
          </button>
          {/* Add more tabs as needed */}
        </div>
        
        <div style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
          {activeTab === 'personal' && <PersonalInfoForm />}
          {activeTab === 'experience' && <ExperienceForm />}
          {activeTab === 'education' && <EducationForm />}
          {activeTab === 'skills' && <SkillsForm />}
          {activeTab === 'settings' && <SettingsForm />}
        </div>
      </div>

      {/* Preview Area */}
      <div style={{ 
        flex: 1, 
        backgroundColor: '#cbd5e1', 
        overflowY: 'auto', 
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        {/* Preview Toolbar */}
        <div style={{ 
          display: 'flex', gap: '1rem', marginBottom: '2rem', 
          backgroundColor: 'var(--surface-color)', padding: '0.75rem 1.5rem', 
          borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' 
        }}>
          <button onClick={handleSave} className="btn btn-outline" style={{ padding: '0.5rem 1rem', color: '#4F46E5', borderColor: '#4F46E5' }}>
            <Save size={18} /> Save to Dashboard
          </button>
          <button onClick={handlePrint} className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>
            <Printer size={18} /> Print
          </button>
          <button onClick={handleDownloadPDF} className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
            <Download size={18} /> Download PDF
          </button>
        </div>

        {/* The Actual Resume Document */}
        <div 
          ref={componentRef}
          style={{ 
            width: '210mm', 
            minHeight: '297mm', 
            backgroundColor: 'white', 
            boxShadow: 'var(--shadow-lg)',
            padding: '20mm', // standard A4 padding
            // Scale down slightly on smaller screens if needed, handled via CSS usually
          }}
        >
          <TemplateRenderer />
        </div>
      </div>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onLoginSuccess={handleLoginSuccess}
      />
      <SaveResumeModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onSave={handleConfirmSave}
        defaultName={`${resumeData.personalInfo?.firstName || 'My'} Resume`}
      />
    </div>
  );
};

export default Builder;
