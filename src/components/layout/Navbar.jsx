import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, LogOut, LogIn, Sparkles, LayoutDashboard, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import AuthModal from './AuthModal';

const Navbar = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isBuilder = location.pathname === '/builder';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getInitials = (email) => {
    if (!email) return 'U';
    return email.charAt(0).toUpperCase();
  };

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner">

        {/* ── Logo ── */}
        <Link to="/" className="navbar-logo">
          <div className="navbar-logo-icon">
            <FileText size={17} color="white" strokeWidth={2.2} />
          </div>
          <span className="navbar-logo-text">ProResume</span>
          <span className="navbar-logo-badge">
            <Sparkles size={8} />
            Pro
          </span>
        </Link>

        {/* ── Nav actions ── */}
        <nav className="navbar-nav">
          {!isBuilder && (
            <Link
              to="/builder"
              className="navbar-btn-create"
              title="Create Resume"
            >
              <Sparkles size={14} />
              <span className="navbar-btn-text">Create Resume</span>
            </Link>
          )}

          {isBuilder && (
            <Link
              to="/"
              className="navbar-btn-exit"
              title="Exit Builder"
            >
              <ArrowLeft size={14} />
              <span className="navbar-btn-text">Exit Builder</span>
            </Link>
          )}

          <div className="navbar-divider" />

          {user ? (
            <div className="navbar-user-section">
              <Link 
                to="/dashboard" 
                className="navbar-btn-dashboard"
                title="Dashboard"
              >
                <LayoutDashboard size={14} />
                <span className="navbar-btn-text">Dashboard</span>
              </Link>
              <div className="navbar-avatar" title={user.email}>
                {getInitials(user.email)}
              </div>
              <span className="navbar-email">{user.email}</span>
              <button
                onClick={signOut}
                className="navbar-btn-signout"
                title="Sign Out"
              >
                <LogOut size={13} />
                <span className="navbar-btn-text">Sign Out</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="navbar-btn-signin"
              title="Sign In"
            >
              <LogIn size={14} />
              <span className="navbar-btn-text">Sign In</span>
            </button>
          )}
        </nav>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={() => setIsAuthModalOpen(false)}
      />
    </header>
  );
};

export default Navbar;

