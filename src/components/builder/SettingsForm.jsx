import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Palette, Type, LayoutTemplate } from 'lucide-react';

const SettingsForm = () => {
  const { resumeData, updateSettings } = useResume();
  const { settings } = resumeData;

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
    { id: 'creative', name: 'Creative', description: 'Sidebar layout with accent colors' },
    { id: 'corporate', name: 'Corporate', description: 'Formal structured layout' },
    { id: 'compact', name: 'Compact', description: 'Space-saving fresher layout' },
  ];

  return (
    <div className="form-section">
      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--primary-color)', marginBottom: '1.5rem' }}>Resume Settings</h3>
      
      {/* Template Selection */}
      <div style={{ marginBottom: '2rem' }}>
        <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <LayoutTemplate size={16} /> Template
        </label>
        <div className="grid-2">
          {templates.map(tpl => (
            <div 
              key={tpl.id}
              onClick={() => updateSettings('template', tpl.id)}
              style={{
                border: `2px solid ${settings.template === tpl.id ? 'var(--primary-color)' : 'var(--border-color)'}`,
                borderRadius: 'var(--radius-md)',
                padding: '1rem',
                cursor: 'pointer',
                backgroundColor: settings.template === tpl.id ? '#eef2ff' : 'var(--surface-color)',
                transition: 'all 0.2s'
              }}
            >
              <h4 style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{tpl.name}</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{tpl.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Color Selection */}
      <div style={{ marginBottom: '2rem' }}>
        <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Palette size={16} /> Theme Color
        </label>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {colors.map(color => (
            <button
              key={color}
              onClick={() => updateSettings('primaryColor', color)}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: color,
                border: settings.primaryColor === color ? '2px solid #fff' : 'none',
                outline: settings.primaryColor === color ? '2px solid #111827' : 'none',
                cursor: 'pointer',
                transition: 'transform 0.2s'
              }}
              title={color}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            />
          ))}
        </div>
      </div>

      {/* Font Selection */}
      <div style={{ marginBottom: '2rem' }}>
        <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Type size={16} /> Typography
        </label>
        <select 
          value={settings.fontFamily}
          onChange={(e) => updateSettings('fontFamily', e.target.value)}
          style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}
        >
          {fonts.map(font => (
            <option key={font.name} value={font.name}>{font.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SettingsForm;
