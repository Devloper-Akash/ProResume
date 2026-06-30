import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, LogOut, LogIn, Sparkles, LayoutDashboard, ArrowLeft, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import AuthModal from './AuthModal';

const Navbar = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isBuilder = location.pathname === '/builder';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const getInitials = (email) => {
    if (!email) return 'U';
    return email.charAt(0).toUpperCase();
  };

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-inner">

        {/* ── Logo ── */}
        <Link to="/" className="navbar-logo">
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

        {/* ── Desktop Nav actions ── */}
        <nav className="navbar-nav navbar-desktop">
          {!isBuilder && (
            <Link
              to="/builder"
              className="btn btn-primary"
              title="Create Resume"
            >
              <Sparkles size={14} />
              <span>Create Resume</span>
            </Link>
          )}

          {isBuilder && (
            <Link
              to="/"
              className="btn btn-outline"
              title="Exit Builder"
            >
              <ArrowLeft size={14} />
              <span>Exit Builder</span>
            </Link>
          )}

          <div className="navbar-divider" />

          {user ? (
            <div className="navbar-user">
              <Link
                to="/dashboard"
                className="btn btn-secondary"
                title="Dashboard"
              >
                <LayoutDashboard size={14} />
                <span>Dashboard</span>
              </Link>
              <div
                className="navbar-avatar"
                title={user.email}
              >
                {getInitials(user.email)}
              </div>
              <span className="navbar-email">
                {user.email}
              </span>
              <button
                onClick={signOut}
                className="btn btn-outline"
                style={{ color: '#ef4444' }}
                title="Sign Out"
              >
                <LogOut size={13} />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <Link
              to="/auth"
              className="btn btn-secondary"
              title="Sign In"
            >
              <LogIn size={14} />
              <span>Sign In</span>
            </Link>
          )}
        </nav>

        {/* ── Mobile Hamburger Button ── */}
        <button
          className="navbar-mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* ── Mobile Overlay ── */}
      {mobileOpen && (
        <div className="navbar-mobile-overlay" onClick={() => setMobileOpen(false)} />
      )}

      {/* ── Mobile Drawer ── */}
      <nav className={`navbar-mobile-drawer ${mobileOpen ? 'open' : ''}`}>
        {/* Drawer header with close button */}
        <div className="navbar-mobile-drawer-header">
          <span className="font-outfit navbar-logo-text gradient-text" style={{ fontSize: '1.1rem' }}>
            ProResume
          </span>
          <button
            className="navbar-mobile-close"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>
        <div className="navbar-mobile-drawer-content">
          {/* User info at top if logged in */}
          {user && (
            <div className="navbar-mobile-user-info">
              <div className="navbar-avatar" title={user.email}>
                {getInitials(user.email)}
              </div>
              <div className="navbar-mobile-user-details">
                <span className="navbar-mobile-user-name">
                  {user.user_metadata?.username || 'User'}
                </span>
                <span className="navbar-mobile-user-email">
                  {user.email}
                </span>
              </div>
            </div>
          )}

          {/* Navigation links */}
          <div className="navbar-mobile-links">
            {!isBuilder && (
              <Link
                to="/builder"
                className="navbar-mobile-link"
                onClick={() => setMobileOpen(false)}
              >
                <Sparkles size={18} />
                Create Resume
              </Link>
            )}

            {isBuilder && (
              <Link
                to="/"
                className="navbar-mobile-link"
                onClick={() => setMobileOpen(false)}
              >
                <ArrowLeft size={18} />
                Exit Builder
              </Link>
            )}

            {user && (
              <Link
                to="/dashboard"
                className="navbar-mobile-link"
                onClick={() => setMobileOpen(false)}
              >
                <LayoutDashboard size={18} />
                Dashboard
              </Link>
            )}
          </div>

          {/* Bottom actions */}
          <div className="navbar-mobile-actions">
            {user ? (
              <button
                onClick={() => { signOut(); setMobileOpen(false); }}
                className="navbar-mobile-link navbar-mobile-signout"
              >
                <LogOut size={18} />
                Sign Out
              </button>
            ) : (
              <Link
                to="/auth"
                className="navbar-mobile-link navbar-mobile-signin"
                onClick={() => setMobileOpen(false)}
              >
                <LogIn size={18} />
                Sign In
              </Link>
            )}
          </div>
        </div>
      </nav>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={() => setIsAuthModalOpen(false)}
      />
    </header>
  );
};

export default Navbar;
