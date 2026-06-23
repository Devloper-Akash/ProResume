import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Sparkles, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        {/* Brand Information */}
        <div className="footer-brand">
          <Link to="/" className="footer-brand-logo">
            <div className="navbar-logo-icon">
              <FileText size={17} color="white" strokeWidth={2.2} />
            </div>
            <span className="navbar-logo-text">ProResume</span>
            <span className="navbar-logo-badge">
              <Sparkles size={8} />
              Pro
            </span>
          </Link>
          <p className="footer-brand-text">
            Create professional, ATS-optimized resumes in minutes. Stand out in your job application and get hired faster.
          </p>
        </div>

        {/* Links Columns */}
        <div className="footer-links-group">
          <div className="footer-column">
            <h4 className="footer-column-title">Features</h4>
            <ul className="footer-list">
              <li><Link to="/builder" className="footer-link">Resume Builder</Link></li>
              <li><Link to="/builder" className="footer-link">ATS Templates</Link></li>
              <li><Link to="/" className="footer-link">Demo Creator</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-column-title">Account</h4>
            <ul className="footer-list">
              <li><Link to="/dashboard" className="footer-link">My Dashboard</Link></li>
              <li><Link to="/builder" className="footer-link">Premium Plans</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-column-title">Legal</h4>
            <ul className="footer-list">
              <li><a href="#" className="footer-link">Privacy Policy</a></li>
              <li><a href="#" className="footer-link">Terms of Service</a></li>
              <li><a href="#" className="footer-link">Refund Policy</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <span className="footer-copy">
          &copy; {new Date().getFullYear()} ProResume. All rights reserved.
        </span>
        <div className="footer-socials">
          <a href="#" className="footer-social-icon" aria-label="GitHub">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
          </a>
          <a href="#" className="footer-social-icon" aria-label="Twitter">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
          </a>
          <a href="#" className="footer-social-icon" aria-label="LinkedIn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
          <a href="mailto:support@proresume.com" className="footer-social-icon" aria-label="Email">
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
