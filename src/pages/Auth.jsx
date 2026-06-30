import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Check, ArrowRight, User, Mail, Lock, Eye, EyeOff, Loader2, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Auth = () => {
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/dashboard';

  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect away
  useEffect(() => {
    if (user) {
      navigate(redirectPath);
    }
  }, [user, navigate, redirectPath]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    try {
      if (isLogin) {
        await signIn(email, password);
        // Successful login automatically triggers redirect via the useEffect above
      } else {
        if (!username.trim()) {
          throw new Error('Username is required for registration.');
        }
        await signUp(email, password, username.trim());
        setSuccessMsg('🎉 Registration successful! Please check your email to verify your account or sign in.');
        setIsLogin(true); // Switch to login tab
        setPassword('');
      }
    } catch (err) {
      setError(err.message || 'An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  const showcaseBullets = [
    '5+ premium ATS-optimized resume templates.',
    'Real-time editor preview (what you see is what you get).',
    'High-resolution clean PDF exports with one click.',
    'Auto-saves your designs directly to your cloud dashboard.'
  ];

  return (
    <div className="auth-page">
      {/* Showcase panel (Left) */}
      <div className="auth-showcase">
        <div className="auth-showcase-glow" />
        <div className="auth-showcase-content">
          <div className="navbar-logo" style={{ color: 'white' }}>
            <div className="navbar-logo-icon">
              <FileText size={18} strokeWidth={2.2} style={{ color: 'white' }} />
            </div>
            <span className="font-outfit navbar-logo-text" style={{ background: 'none', WebkitTextFillColor: 'initial', color: 'white' }}>
              ProResume
            </span>
            <span className="badge-premium" style={{ borderColor: 'rgba(255,255,255,0.2)', color: '#a5b4fc', backgroundColor: 'rgba(255,255,255,0.05)' }}>
              <Sparkles size={8} /> Pro
            </span>
          </div>

          <h1>Create a Resume That Lands the Job.</h1>
          <p>
            Build, edit, and download professional resumes. Join thousands of job seekers who got hired at leading tech companies.
          </p>

          <ul className="auth-bullets">
            {showcaseBullets.map((bullet, idx) => (
              <li key={idx} className="auth-bullet-item">
                <div className="auth-bullet-icon">
                  <Check size={14} />
                </div>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Form panel (Right) */}
      <div className="auth-form-container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="auth-card"
        >
          {/* Toggle Tab Bar */}
          <div className="auth-toggle-bar">
            <button
              onClick={() => { setIsLogin(true); setError(''); }}
              className={`auth-toggle-btn ${isLogin ? 'active' : ''}`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setIsLogin(false); setError(''); }}
              className={`auth-toggle-btn ${!isLogin ? 'active' : ''}`}
            >
              Sign Up
            </button>
          </div>

          <h2 className="font-outfit" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
            {isLogin ? 'Welcome Back' : 'Get Started'}
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.75rem' }}>
            {isLogin ? 'Enter your credentials to access your dashboard' : 'Fill in the details to create your lifetime account'}
          </p>

          {/* Messages */}
          {error && (
            <div className="modal-error-box" style={{ marginBottom: '1.5rem' }}>
              {error}
            </div>
          )}
          {successMsg && (
            <div style={{ padding: '0.75rem 1rem', backgroundColor: '#ecfdf5', border: '1px solid #a7f3d0', color: '#059669', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
              {successMsg}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Username Field (Signup only) */}
            <AnimatePresence initial={false}>
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="form-group"
                  style={{ overflow: 'hidden' }}
                >
                  <label className="form-label">Username</label>
                  <div className="form-input-icon-wrapper">
                    <User size={16} className="icon" />
                    <input
                      type="text"
                      required={!isLogin}
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="johndoe"
                      className="form-input"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="form-input-icon-wrapper">
                <Mail size={16} className="icon" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="form-input-icon-wrapper">
                <Lock size={16} className="icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  minLength={6}
                  className="form-input"
                  style={{ paddingRight: '2.5rem' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.85rem', marginTop: '0.5rem' }}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="loader-spinner" style={{ margin: 0, height: '16px', width: '16px' }} />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
