import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PayButton from './PayButton';
import { X, Crown, Check, Shield, Sparkles, Star, Download, Zap } from 'lucide-react';

const features = [
  { icon: <Star size={14} />, text: 'All Premium Templates', desc: 'Access every professionally designed template' },
  { icon: <Download size={14} />, text: 'Unlimited PDF Downloads', desc: 'Export clean, watermark-free resumes' },
  { icon: <Zap size={14} />, text: 'Priority Support', desc: '24/7 priority assistance whenever you need it' },
  { icon: <Shield size={14} />, text: 'Lifetime Access', desc: 'Pay once, use forever. No recurring fees' },
];

export default function PricingModal({ onClose, onSuccess }) {
  const modalContent = (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="modal-container modal-container-pro pro-modal-redesign"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Decorative glows */}
          <div className="pro-modal-glow-1" />
          <div className="pro-modal-glow-2" />
          <div className="pro-modal-pattern" />

          {/* Close button */}
          <button onClick={onClose} className="modal-close-x pro-modal-close">
            <X size={18} />
          </button>

          {/* Header section */}
          <div className="pro-modal-header">
            <div className="pro-modal-icon-wrap">
              <Crown size={24} />
              <div className="pro-modal-icon-ring" />
            </div>
            <div className="pro-modal-badge-row">
              <span className="pro-modal-badge">
                <Sparkles size={10} />
                Most Popular
              </span>
            </div>
            <h2 className="pro-modal-title">Upgrade to Pro</h2>
            <p className="pro-modal-subtitle">
              Unlock everything. Build unlimited professional resumes.
            </p>
          </div>

          {/* Price display */}
          <div className="pro-modal-price-section">
            <div className="pro-modal-price-wrapper">
              <span className="pro-modal-price-strike">₹999</span>
              <div className="pro-modal-price-main">
                <span className="pro-modal-currency">₹</span>
                <span className="pro-modal-amount">299</span>
              </div>
              <span className="pro-modal-price-label">one-time payment</span>
            </div>
            <div className="pro-modal-discount-tag">
              <Zap size={10} />
              70% OFF
            </div>
          </div>

          {/* Features list */}
          <div className="pro-modal-features">
            {features.map((f, idx) => (
              <motion.div
                key={f.text}
                className="pro-modal-feature-item"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + idx * 0.06, duration: 0.3 }}
              >
                <div className="pro-modal-feature-check">
                  <Check size={12} />
                </div>
                <div className="pro-modal-feature-text">
                  <span className="pro-modal-feature-name">{f.text}</span>
                  <span className="pro-modal-feature-desc">{f.desc}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pay button */}
          <div className="pro-modal-action">
            <PayButton onSuccess={() => { onSuccess?.(); onClose(); }} />
          </div>

          {/* Guarantee footer */}
          <div className="pro-modal-footer">
            <div className="pro-modal-guarantee">
              <Shield size={12} />
              <span>Secure payment · 30-day money-back guarantee</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="btn-pro-maybe-later"
          >
            Maybe later
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
