import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, Crown, Zap, BadgeCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import PricingModal from '../components/payment/PricingModal';
import Footer from '../components/layout/Footer';

const freePlan = ['5 Basic Templates', 'Live Preview', 'Watermarked PDF'];
const proPlan = ['All Premium Templates', 'Clean PDF Download', 'Priority Support', 'Lifetime Access'];

export default function Pricing() {
  const [showModal, setShowModal] = useState(false);
  const { isPro } = useAuth();

  return (
    <>
      <div className="pricing-section">
        <div className="pricing-decor-glow" />
        <div className="pricing-decor-glow-2" />

        <div className="container">
          {/* Header */}
          <div className="pricing-header">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="pricing-badge">
                <Sparkles size={12} className="fill-indigo-400" />
                Simple Pricing
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="pricing-title"
            >
              One Plan.{' '}
              <span style={{ background: 'linear-gradient(135deg, #a5b4fc, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                One Payment.
              </span>{' '}
              Forever.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="pricing-subtitle"
            >
              No subscriptions, no hidden fees. Pay once and unlock everything.
            </motion.p>
          </div>

          {/* Cards */}
          <div className="cards-container">

            {/* Free Plan */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="pricing-card"
            >
              <div className="pricing-card-icon">
                <Zap size={20} />
              </div>
              <h2>Free</h2>
              <p className="pricing-card-desc">Get started for free</p>
              
              <div className="price-box">
                <span className="price-amount">₹0</span>
                <span className="price-period">forever</span>
              </div>
              
              <ul className="features-list">
                {freePlan.map((f) => (
                  <li key={f} className="feature-item">
                    <Check size={15} style={{ color: '#64748b' }} />
                    {f}
                  </li>
                ))}
              </ul>
              <button className="btn" style={{ cursor: 'default' }}>
                Current Plan
              </button>
            </motion.div>

            {/* Pro Plan */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="pricing-card pricing-card-pro"
            >
              {/* Recommended badge */}
              <div className="pricing-card-tag">
                <span>
                  {isPro ? <><BadgeCheck size={10} /> Active</> : <><Crown size={10} /> Recommended</>}
                </span>
              </div>

              <div className="pricing-card-icon">
                <Crown size={20} />
              </div>
              <h2>Pro</h2>
              <p className="pricing-card-desc">Everything you need</p>
              
              <div className="price-box">
                <span className="price-amount">₹299</span>
                <span className="price-period">one-time</span>
              </div>
              
              <ul className="features-list">
                {proPlan.map((f) => (
                  <li key={f} className="feature-item">
                    <div className="feature-item-icon-pro">
                      <Check size={12} />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
              {!isPro ? (
                <button
                  onClick={() => setShowModal(true)}
                  className="btn btn-primary"
                >
                  Get Pro Now
                </button>
              ) : (
                <button className="btn btn-primary" style={{ cursor: 'default', opacity: 0.8 }}>
                  <BadgeCheck size={16} />
                  Current Plan
                </button>
              )}
            </motion.div>
          </div>
        </div>

        {showModal && (
          <PricingModal
            onClose={() => setShowModal(false)}
            onSuccess={() => setShowModal(false)}
          />
        )}
      </div>
      <Footer />
    </>
  );
}
