import React, { useState, useEffect } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Palette, Type, LayoutTemplate, Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { checkProStatus } from '../../services/paymentService';
import PricingModal from '../payment/PricingModal';

const SettingsForm = () => {
  const { resumeData, updateSettings } = useResume();
  const { settings } = resumeData;
  const { user } = useAuth();
  const [showPricing, setShowPricing] = useState(false);
  const [loadingTemplate, setLoadingTemplate] = useState(null);
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    if (!user) {
      setIsPro(false);
      return;
    }
    const checkUserPro = async () => {
      try {
        const status = await checkProStatus(user.id);
        setIsPro(status);
      } catch (err) {
        console.error('Error checking pro status:', err);
      }
    };
    checkUserPro();
  }, [user]);


  const colors = [
    '#4F46E5', // Indigo
    '#2563EB', // Blue
    '#059669', // Emerald
    '#DC2626', // Red
    '#D97706', // Amber
    '#7C3AED', // Violet
    '#111827', // Gray-900
    '#000000', // Black
  ];

  const fonts = [
    { name: 'Inter', label: 'Inter (Modern)' },
    { name: 'Roboto', label: 'Roboto (Professional)' },
    { name: 'Outfit', label: 'Outfit (Creative)' },
  ];

  const templates = [
    { id: 'modern', name: 'Modern', description: 'Clean layout with two columns' },
    { id: 'minimal', name: 'Minimal', description: 'Classic top-down layout' },
    { id: 'creative', name: 'Creative', description: 'Sidebar layout with accent colors', isPremium: true },
    { id: 'corporate', name: 'Corporate', description: 'Formal structured layout', isPremium: true },
    { id: 'compact', name: 'Compact', description: 'Space-saving fresher layout', isPremium: true },
  ];

  const handleTemplateClick = async (tpl) => {
    if (tpl.isPremium) {
      if (!user) {
        alert('Please sign in first to access premium templates.');
        return;
      }
      setLoadingTemplate(tpl.id);
      const isPro = await checkProStatus(user.id);
      setLoadingTemplate(null);
      
      if (!isPro) {
        setShowPricing(true);
        return;
      }
    }
    updateSettings('template', tpl.id);
  };

  return (
    <div className="form-section">
      <h3>Resume Settings</h3>
      
      {/* Template Selection */}
      <div style={{ marginBottom: '2rem' }}>
        <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <LayoutTemplate size={16} /> Template
        </label>
        <div className="templates-grid-selector">
          {templates.map(tpl => (
            <div 
              key={tpl.id}
              onClick={() => handleTemplateClick(tpl)}
              className={`template-option-card ${settings.template === tpl.id ? 'active' : ''}`}
              style={{ opacity: loadingTemplate === tpl.id ? 0.5 : 1 }}
            >
              {tpl.isPremium && !isPro && (
                <div className="template-option-lock-icon">
                  <Lock size={14} />
                </div>
              )}
              <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {tpl.name} {loadingTemplate === tpl.id && <span style={{fontSize: '11px', color: 'var(--text-muted)'}}>Checking...</span>}
              </h4>
              <p>{tpl.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Color Selection */}
      <div style={{ marginBottom: '2rem' }}>
        <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Palette size={16} /> Theme Color
        </label>
        <div className="color-bubbles-row">
          {colors.map(color => (
            <button
              key={color}
              onClick={() => updateSettings('primaryColor', color)}
              className={`color-select-bubble ${settings.primaryColor === color ? 'active' : ''}`}
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      </div>

      {/* Font Selection */}
      <div style={{ marginBottom: '2rem' }}>
        <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <Type size={16} /> Typography
        </label>
        <select 
          value={settings.fontFamily}
          onChange={(e) => updateSettings('fontFamily', e.target.value)}
          className="font-select-input"
        >
          {fonts.map(font => (
            <option key={font.name} value={font.name}>{font.label}</option>
          ))}
        </select>
      </div>

      {showPricing && (
        <PricingModal
          onClose={() => setShowPricing(false)}
          onSuccess={() => {
            setIsPro(true);
            setShowPricing(false);
          }}
        />
      )}
    </div>
  );
};

export default SettingsForm;
