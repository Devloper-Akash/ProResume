import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, LogOut, LogIn, Sparkles } from 'lucide-react';
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

  const styles = {
    header: {
      position: 'sticky',
      top: 0,
      zIndex: 100,
      transition: 'all 0.3s ease',
      background: scrolled ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.98)',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: '1px solid var(--border-color)',
      boxShadow: scrolled ? '0 2px 20px rgba(79,70,229,0.08)' : 'none',
    },
    inner: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 2rem',
      height: '64px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      textDecoration: 'none',
      flexShrink: 0,
    },
    logoIcon: {
      width: '34px',
      height: '34px',
      background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
      borderRadius: '9px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 2px 8px rgba(79,70,229,0.3)',
      flexShrink: 0,
    },
    logoText: {
      fontFamily: 'var(--font-outfit)',
      fontWeight: 700,
      fontSize: '1.2rem',
      background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      lineHeight: 1,
    },
    logoBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '3px',
      background: 'rgba(79,70,229,0.1)',
      color: '#4F46E5',
      fontSize: '0.58rem',
      fontWeight: 700,
      padding: '3px 7px',
      borderRadius: '20px',
      border: '1px solid rgba(79,70,229,0.22)',
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
      lineHeight: 1,
      alignSelf: 'center',
    },
    nav: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.6rem',
      height: '36px',  // anchor all nav items to same height
    },
    divider: {
      width: '1px',
      height: '24px',
      background: 'var(--border-color)',
      flexShrink: 0,
      alignSelf: 'center',
    },
    btnCreate: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.4rem',
      height: '36px',
      padding: '0 1.1rem',
      background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
      color: 'white',
      borderRadius: 'var(--radius-md)',
      fontWeight: 600,
      fontSize: '0.875rem',
      border: 'none',
      cursor: 'pointer',
      textDecoration: 'none',
      whiteSpace: 'nowrap',
      boxShadow: '0 2px 8px rgba(79,70,229,0.3)',
      transition: 'all 0.2s',
    },
    btnExit: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '36px',
      padding: '0 0.9rem',
      fontSize: '0.85rem',
      fontWeight: 500,
      color: 'var(--text-muted)',
      textDecoration: 'none',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-md)',
      background: 'transparent',
      whiteSpace: 'nowrap',
      transition: 'all 0.2s',
    },
    userSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.6rem',
      height: '36px',
    },
    avatar: {
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
      color: 'white',
      fontSize: '0.8rem',
      fontWeight: 700,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      boxShadow: '0 0 0 2px rgba(79,70,229,0.2)',
    },
    email: {
      fontSize: '0.8rem',
      color: 'var(--text-muted)',
      fontWeight: 500,
      maxWidth: '150px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      lineHeight: 1,
    },
    btnSignOut: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.3rem',
      height: '36px',
      padding: '0 0.85rem',
      fontSize: '0.8rem',
      fontWeight: 500,
      color: 'var(--text-muted)',
      background: 'transparent',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-md)',
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      transition: 'all 0.2s',
    },
    btnSignIn: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.35rem',
      height: '36px',
      padding: '0 1rem',
      fontSize: '0.875rem',
      fontWeight: 500,
      color: '#4F46E5',
      background: 'rgba(79,70,229,0.07)',
      border: '1px solid rgba(79,70,229,0.25)',
      borderRadius: 'var(--radius-md)',
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      transition: 'all 0.2s',
    },
  };

  return (
    <header style={styles.header}>
      <div style={styles.inner}>

        {/* ── Logo ── */}
        <Link to="/" style={styles.logo}>
          <div style={styles.logoIcon}>
            <FileText size={17} color="white" strokeWidth={2.2} />
          </div>
          <span style={styles.logoText}>ProResume</span>
          <span style={styles.logoBadge}>
            <Sparkles size={8} />
            Pro
          </span>
        </Link>

        {/* ── Nav actions ── */}
        <nav style={styles.nav}>
          {!isBuilder && (
            <Link
              to="/builder"
              style={styles.btnCreate}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(79,70,229,0.4)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(79,70,229,0.3)';
              }}
            >
              Create Resume
            </Link>
          )}

          {isBuilder && (
            <Link
              to="/"
              style={styles.btnExit}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--bg-color)';
                e.currentTarget.style.color = 'var(--text-main)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'var(--text-muted)';
              }}
            >
              ← Exit Builder
            </Link>
          )}

          <div style={styles.divider} />

          {user ? (
            <div style={styles.userSection}>
              <div style={styles.avatar} title={user.email}>
                {getInitials(user.email)}
              </div>
              <span style={styles.email}>{user.email}</span>
              <button
                onClick={signOut}
                style={styles.btnSignOut}
                title="Sign Out"
                onMouseEnter={e => {
                  e.currentTarget.style.color = '#ef4444';
                  e.currentTarget.style.borderColor = '#fca5a5';
                  e.currentTarget.style.background = '#fff5f5';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'var(--text-muted)';
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <LogOut size={13} />
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              style={styles.btnSignIn}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(79,70,229,0.13)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(79,70,229,0.07)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <LogIn size={14} />
              Sign In
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
