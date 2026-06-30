import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Sparkles, Mail, Heart, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          {/* Brand */}
          <div className="footer-brand">
            <Link to="/" className="navbar-logo footer-brand-logo">
              <div className="navbar-logo-icon">
                <FileText size={17} strokeWidth={2.2} />
              </div>
              <span className="font-outfit navbar-logo-text gradient-text">
                ProResume
              </span>
              <span className="badge-premium">
                <Sparkles size={8} />
                Pro
              </span>
            </Link>
            <p className="footer-brand-desc">
              Create professional, ATS-optimized resumes in minutes. Stand out in your job application and get hired faster.
            </p>
          </div>

          {/* Links Groups */}
          <div className="footer-links-group">
            <div className="footer-column">
              <h4>Features</h4>
              <ul className="footer-list">
                <li>
                  <Link to="/builder" className="group">
                    Resume Builder
                    <ArrowUpRight size={12} className="arrow-icon" />
                  </Link>
                </li>
                <li>
                  <Link to="/builder" className="group">
                    ATS Templates
                    <ArrowUpRight size={12} className="arrow-icon" />
                  </Link>
                </li>
                <li>
                  <Link to="/" className="group">
                    Demo Creator
                    <ArrowUpRight size={12} className="arrow-icon" />
                  </Link>
                </li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Account</h4>
              <ul className="footer-list">
                <li>
                  <Link to="/dashboard" className="group">
                    My Dashboard
                    <ArrowUpRight size={12} className="arrow-icon" />
                  </Link>
                </li>
                <li>
                  <Link to="/builder" className="group">
                    Premium Plans
                    <ArrowUpRight size={12} className="arrow-icon" />
                  </Link>
                </li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Legal</h4>
              <ul className="footer-list">
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
                <li>
                  <a href="#">Terms of Service</a>
                </li>
                <li>
                  <a href="#">Refund Policy</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <span className="footer-copy">
            &copy; {new Date().getFullYear()} ProResume. Made with
            <Heart size={11} className="fill-red-400 text-red-400" />
            for job seekers.
          </span>
          <div className="footer-socials">
            {/* GitHub */}
            <a href="#" className="social-link" aria-label="GitHub">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            </a>
            {/* Twitter */}
            <a href="#" className="social-link" aria-label="Twitter">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </a>
            {/* LinkedIn */}
            <a href="#" className="social-link" aria-label="LinkedIn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            {/* Email */}
            <a href="mailto:support@proresume.com" className="social-link" aria-label="Email">
              <Mail size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
