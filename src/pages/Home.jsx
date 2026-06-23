import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Layout, Download, CheckCircle, ArrowRight } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import Footer from '../components/layout/Footer';

const Home = () => {
  const { loadDemoData } = useResume();

  const features = [
    { icon: <Layout size={24} />, title: 'Multiple Templates', desc: 'Choose from professional, clean, and modern templates.' },
    { icon: <CheckCircle size={24} />, title: 'Real-time Preview', desc: 'See your changes instantly as you type.' },
    { icon: <Download size={24} />, title: 'Export to PDF', desc: 'Download your resume in high-quality PDF format.' },
  ];

  return (
    <>
      <div style={{ paddingBottom: '4rem' }}>
        {/* Hero Section */}
        <section className="home-hero-section">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="home-hero-title"
            >
              Create Your Professional Resume in Minutes
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="home-hero-desc"
            >
              Stand out from the crowd with our beautifully designed, ATS-friendly templates. No signup required.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
            >
              <Link to="/builder" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
                Build My Resume <ArrowRight size={20} />
              </Link>
              <button 
                onClick={loadDemoData}
                className="btn btn-outline" 
                style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}
              >
                Try with Demo Data
              </button>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section style={{ padding: '5rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 700, marginBottom: '1rem' }}>Why Choose ProResume?</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Everything you need to create a winning resume.</p>
          </div>

          <div className="home-features-grid">
            {features.map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                style={{ 
                  padding: '2rem', 
                  backgroundColor: 'var(--surface-color)', 
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-sm)',
                  border: '1px solid var(--border-color)',
                  textAlign: 'center'
                }}
              >
                <div style={{ 
                  width: '60px', height: '60px', 
                  borderRadius: '50%', 
                  backgroundColor: '#eef2ff', 
                  color: 'var(--primary-color)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 1.5rem'
                }}>
                  {feature.icon}
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>{feature.title}</h3>
                <p style={{ color: 'var(--text-muted)' }}>{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Home;
