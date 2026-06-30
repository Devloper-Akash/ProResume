import React, { useRef, useState, useEffect } from 'react';
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
import { checkProStatus } from '../services/paymentService';
import PricingModal from '../components/payment/PricingModal';

const Builder = () => {
  const { resumeData, updateSettings } = useResume();
  const { user } = useAuth();
  const componentRef = useRef(null);
  const wrapperRef = useRef(null);
  const [activeTab, setActiveTab] = useState('personal');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [showPricing, setShowPricing] = useState(false);
  const [mobileView, setMobileView] = useState('edit');
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (!wrapperRef.current) return;
      const containerWidth = wrapperRef.current.clientWidth;
      const targetWidth = 794; // 210mm in pixels at 96 DPI
      if (containerWidth < targetWidth + 40) {
        setScale((containerWidth - 40) / targetWidth);
      } else {
        setScale(1);
      }
    };

    window.addEventListener('resize', handleResize);
    // Add small delay to let DOM render and read correct clientWidth
    const timer = setTimeout(handleResize, 100);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, [mobileView]);


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
    const isPro = await checkProStatus(user?.id);
    if (!isPro) {
      setShowPricing(true);
      return;
    }

    const element = componentRef.current;
    if (!element) return;

    try {
      // Temporarily reset transform so html2canvas captures at full resolution
      const originalTransform = element.style.transform;
      const originalTransition = element.style.transition;
      element.style.transform = 'scale(1)';
      element.style.transition = 'none';

      const canvas = await html2canvas(element, { 
        scale: 2, 
        useCORS: true,
        backgroundColor: '#ffffff',
        letterRendering: true,
        logging: false,
      });

      // Restore original transform
      element.style.transform = originalTransform;
      element.style.transition = originalTransition;

      // Use PNG for lossless quality — crisp text without JPEG artifacts
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
      
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
    <div className="builder-container">
      {/* Mobile Tabs Switch Bar */}
      <div className="mobile-view-tabs">
        <button 
          onClick={() => setMobileView('edit')} 
          className={`mobile-tab-btn ${mobileView === 'edit' ? 'active' : ''}`}
        >
          Edit Details
        </button>
        <button 
          onClick={() => setMobileView('preview')} 
          className={`mobile-tab-btn ${mobileView === 'preview' ? 'active' : ''}`}
        >
          Live Preview
        </button>
      </div>

      {/* Sidebar / Form Area */}
      <div className={`builder-sidebar ${mobileView !== 'edit' ? 'mobile-hidden' : ''}`}>
        <div className="tabs-scroll-bar">
          <button 
            onClick={() => setActiveTab('personal')}
            className={`tab-btn ${activeTab === 'personal' ? 'active' : ''}`}
          >
            <User size={15} /> Personal
          </button>
          <button 
            onClick={() => setActiveTab('experience')}
            className={`tab-btn ${activeTab === 'experience' ? 'active' : ''}`}
          >
            <Briefcase size={15} /> Experience
          </button>
          <button 
            onClick={() => setActiveTab('education')}
            className={`tab-btn ${activeTab === 'education' ? 'active' : ''}`}
          >
            <GraduationCap size={15} /> Education
          </button>
          <button 
            onClick={() => setActiveTab('skills')}
            className={`tab-btn ${activeTab === 'skills' ? 'active' : ''}`}
          >
            <Code size={15} /> Skills
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
          >
            <Settings size={15} /> Settings
          </button>
        </div>
        
        <div className="editor-pane">
          {activeTab === 'personal' && <PersonalInfoForm />}
          {activeTab === 'experience' && <ExperienceForm />}
          {activeTab === 'education' && <EducationForm />}
          {activeTab === 'skills' && <SkillsForm />}
          {activeTab === 'settings' && <SettingsForm />}
        </div>
      </div>

      {/* Preview Area */}
      <div 
        ref={wrapperRef}
        className={`builder-preview ${mobileView !== 'preview' ? 'mobile-hidden' : ''}`}
      >
        {/* Preview Toolbar */}
        <div className="floating-toolbar">
          <button onClick={handleSave} className="btn btn-secondary">
            <Save size={16} /> Save to Dashboard
          </button>
          <button onClick={handlePrint} className="btn btn-outline">
            <Printer size={16} /> Print
          </button>
          <button onClick={handleDownloadPDF} className="btn btn-primary">
            <Download size={16} /> Download PDF
          </button>
        </div>

        {/* The Actual Resume Document */}
        <div 
          ref={componentRef}
          className="resume-scale-wrapper"
          style={{ 
            width: '210mm', 
            minHeight: '297mm', 
            backgroundColor: 'white', 
            padding: '20mm', // A4 layout padding
            transform: `scale(${scale})`,
            marginBottom: `calc(-297mm * ${1 - scale})`,
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
      {showPricing && (
        <PricingModal
          onClose={() => setShowPricing(false)}
          onSuccess={() => setShowPricing(false)}
        />
      )}
    </div>
  );
};

export default Builder;
