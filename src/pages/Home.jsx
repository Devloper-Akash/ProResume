import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Layout, Download, CheckCircle, ArrowRight, Sparkles, Zap, Shield, Palette, Clock, Crown, Star, Infinity, BadgeCheck } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/layout/Footer';
import Testimonials from '../components/layout/Testimonials';
import PricingModal from '../components/payment/PricingModal';

const Home = () => {
  const { loadDemoData } = useResume();
  const { isPro } = useAuth();
  const [showProModal, setShowProModal] = useState(false);

  const features = [
    { icon: <Layout size={24} />, title: 'Multiple Templates', desc: 'Choose from professional, clean, and modern templates designed to impress recruiters and pass ATS systems.' },
    { icon: <CheckCircle size={24} />, title: 'Real-time Preview', desc: 'See your changes instantly as you type — no guessing, no surprises. What you see is what you get.' },
    { icon: <Download size={24} />, title: 'Export to PDF', desc: 'Download your resume in high-quality, ATS-optimized PDF format ready to send to employers.' },
    { icon: <Palette size={24} />, title: 'Custom Styling', desc: 'Fine-tune colors, fonts, and layouts to match your personal brand and stand out from the crowd.' },
    { icon: <Clock size={24} />, title: 'Build in Minutes', desc: 'Our intuitive builder lets you create a polished, professional resume in under 10 minutes.' },
    { icon: <Shield size={24} />, title: 'Privacy First', desc: 'Your data stays yours. No tracking, no selling your information. Build with complete peace of mind.' },
  ];

  return (
    <>
      <div style={{ paddingBottom: 0 }}>
        {/* ─── Hero Section ─── */}
        <section className="hero-section">
          {/* Decorative elements */}
          <div className="hero-decor-orb-1" />
          <div className="hero-decor-orb-2" />
          <div className="hero-decor-orb-3" />

          {/* Floating orbs for depth */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            style={{ pointerEvents: 'none', position: 'absolute', top: '32%', right: '15%', height: '12px', width: '12px', borderRadius: '50%', backgroundColor: 'rgba(79, 70, 229, 0.3)' }}
          />
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            style={{ pointerEvents: 'none', position: 'absolute', bottom: '40%', left: '20%', height: '16px', width: '16px', borderRadius: '50%', backgroundColor: 'rgba(124, 58, 237, 0.2)' }}
          />
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            style={{ pointerEvents: 'none', position: 'absolute', top: '48%', left: '10%', height: '8px', width: '8px', borderRadius: '50%', backgroundColor: 'rgba(99, 102, 241, 0.25)' }}
          />

          <div className="hero-content">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="hero-badge"
            >
              <Sparkles size={12} className="fill-primary" style={{ color: 'var(--primary-color)' }} />
              #1 Free Resume Builder
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-outfit hero-title"
            >
              Create Your{' '}
              <span className="gradient-text">
                Professional Resume
              </span>{' '}
              in Minutes
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="hero-desc"
            >
              Stand out from the crowd with our beautifully designed, ATS-friendly templates. No signup required.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hero-buttons"
            >
              <Link
                to="/builder"
                className="btn btn-primary"
              >
                Build My Resume
                <ArrowRight size={18} />
              </Link>
              <button
                onClick={loadDemoData}
                className="btn btn-outline"
              >
                <Zap size={16} style={{ color: 'var(--primary-color)' }} />
                Try with Demo Data
              </button>
              {!isPro ? (
                <button
                  onClick={() => setShowProModal(true)}
                  className="btn btn-pro-hero"
                >
                  <Crown size={16} />
                  Get Pro Version
                </button>
              ) : (
                <span className="btn btn-pro-active">
                  <BadgeCheck size={16} />
                  Pro Active
                </span>
              )}
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="hero-trust-bar"
            >
              <span className="trust-item">
                <CheckCircle size={13} style={{ color: '#10b981' }} />
                No Signup Required
              </span>
              <span className="trust-divider" />
              <span className="trust-item">
                <CheckCircle size={13} style={{ color: '#10b981' }} />
                100% Free
              </span>
              <span className="trust-divider" />
              <span className="trust-item">
                <CheckCircle size={13} style={{ color: '#10b981' }} />
                ATS-Optimized
              </span>
            </motion.div>
          </div>
        </section>

        {/* ─── Features Section ─── */}
        <section className="features-section">
          {/* Subtle bg pattern */}
          <div className="features-decor-bg" />

          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="section-header"
            >
              <span className="section-badge">
                <Sparkles size={12} className="fill-primary" style={{ color: 'var(--primary-color)' }} />
                Powerful Features
              </span>
              <h2 className="font-outfit section-title">
                Why Choose <span className="gradient-text">ProResume</span>?
              </h2>
              <p className="section-desc">
                Everything you need to create a winning resume — fast, free, and beautiful.
              </p>
            </motion.div>

            <div className="features-grid">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, duration: 0.5 }}
                  className="feature-card"
                >
                  <div className="feature-icon-wrapper">
                    {feature.icon}
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Testimonials Section ─── */}
        <Testimonials />

        {!isPro ? (
        <section className="pro-upgrade-section">
          <div className="pro-upgrade-decor-1" />
          <div className="pro-upgrade-decor-2" />
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="pro-upgrade-card"
            >
              {/* Shimmer border effect */}
              <div className="pro-upgrade-shimmer" />
              
              <div className="pro-upgrade-content">
                <div className="pro-upgrade-left">
                  <div className="pro-badge-large">
                    <Crown size={14} />
                    PRO
                  </div>
                  <h2 className="font-outfit pro-upgrade-title">
                    Unlock the Full Power of{' '}
                    <span className="gradient-text-pro">ProResume</span>
                  </h2>
                  <p className="pro-upgrade-desc">
                    One-time payment, lifetime access. No subscriptions, no hidden fees. Upgrade today and create unlimited professional resumes.
                  </p>
                  <div className="pro-features-row">
                    <div className="pro-feature-pill">
                      <Star size={12} />
                      All Premium Templates
                    </div>
                    <div className="pro-feature-pill">
                      <Download size={12} />
                      Clean PDF Export
                    </div>
                    <div className="pro-feature-pill">
                      <Infinity size={12} />
                      Unlimited Downloads
                    </div>
                    <div className="pro-feature-pill">
                      <Shield size={12} />
                      Priority Support
                    </div>
                  </div>
                </div>
                <div className="pro-upgrade-right">
                  <div className="pro-price-card">
                    <div className="pro-price-label">Lifetime Access</div>
                    <div className="pro-price-value">
                      <span className="pro-price-currency">₹</span>
                      <span className="pro-price-number">299</span>
                    </div>
                    <div className="pro-price-sub">One-time payment</div>
                    <button onClick={() => setShowProModal(true)} className="btn btn-pro-upgrade">
                      <Crown size={16} />
                      Upgrade to Pro
                      <ArrowRight size={16} />
                    </button>
                    <div className="pro-guarantee">
                      <Shield size={12} />
                      30-day money-back guarantee
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        ) : (
        <section className="pro-upgrade-section">
          <div className="pro-upgrade-decor-1" />
          <div className="pro-upgrade-decor-2" />
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="pro-upgrade-card pro-active-card"
            >
              <div className="pro-upgrade-shimmer" />
              <div className="pro-active-content">
                <div className="pro-active-icon">
                  <BadgeCheck size={40} />
                </div>
                <h2 className="font-outfit pro-upgrade-title">
                  You're a <span className="gradient-text-pro">Pro</span> Member!
                </h2>
                <p className="pro-upgrade-desc" style={{ textAlign: 'center', maxWidth: '500px', margin: '0.75rem auto 0' }}>
                  Thank you for upgrading! You have full access to all premium templates, unlimited downloads, and priority support.
                </p>
                <div className="pro-features-row" style={{ justifyContent: 'center', marginTop: '1.5rem' }}>
                  <div className="pro-feature-pill pro-feature-pill-active">
                    <CheckCircle size={12} />
                    All Premium Templates
                  </div>
                  <div className="pro-feature-pill pro-feature-pill-active">
                    <CheckCircle size={12} />
                    Unlimited Downloads
                  </div>
                  <div className="pro-feature-pill pro-feature-pill-active">
                    <CheckCircle size={12} />
                    Priority Support
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        )}

        {/* ─── CTA Section ─── */}
        <section className="cta-section">
          <div className="cta-decor-pattern" />

          <div className="cta-content">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="cta-title">
                Ready to Build Your Dream Resume?
              </h2>
              <p className="cta-desc">
                Join thousands of professionals who landed their dream jobs with ProResume. It's free, fast, and requires no signup.
              </p>
              <Link
                to="/builder"
                className="btn cta-btn"
              >
                <span>Get Started Now</span>
                <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />

      {showProModal && (
        <PricingModal
          onClose={() => setShowProModal(false)}
          onSuccess={() => setShowProModal(false)}
        />
      )}
    </>
  );
};

export default Home;
