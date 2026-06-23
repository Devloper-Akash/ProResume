import { useState } from 'react';
import { motion } from 'framer-motion';
import PricingModal from '../components/payment/PricingModal';

const freePlan = ['5 Basic Templates', 'Live Preview', 'Watermarked PDF'];
const proPlan = ['All Premium Templates', 'Clean PDF Download', 'Priority Support', 'Lifetime Access'];

export default function Pricing() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div style={{ minHeight: '100vh', background: '#0f0f1a', color: '#fff', padding: '60px 20px' }}>
      <motion.h1
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', fontSize: '36px', marginBottom: '8px' }}
      >
        Simple Pricing
      </motion.h1>
      <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '48px' }}>
        One plan. One payment. Forever.
      </p>

      <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>

        {/* Free Plan */}
        <motion.div
          initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
          style={{
            background: '#1e1e2e', border: '1px solid #334155',
            borderRadius: '16px', padding: '32px', width: '280px',
          }}
        >
          <h2 style={{ margin: '0 0 8px' }}>Free</h2>
          <p style={{ color: '#94a3b8', marginBottom: '24px' }}>Get started for free</p>
          <div style={{ fontSize: '32px', fontWeight: '700', marginBottom: '24px' }}>₹0</div>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {freePlan.map((f) => (
              <li key={f} style={{ padding: '6px 0', color: '#94a3b8' }}>— {f}</li>
            ))}
          </ul>
        </motion.div>

        {/* Pro Plan */}
        <motion.div
          initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
          style={{
            background: '#1e1e2e', border: '2px solid #6366f1',
            borderRadius: '16px', padding: '32px', width: '280px',
            boxShadow: '0 0 30px rgba(99,102,241,0.2)',
          }}
        >
          <div style={{
            background: '#6366f1', color: '#fff', fontSize: '12px',
            padding: '4px 10px', borderRadius: '20px',
            display: 'inline-block', marginBottom: '12px', fontWeight: '600',
          }}>
            RECOMMENDED
          </div>
          <h2 style={{ margin: '0 0 8px' }}>Pro</h2>
          <p style={{ color: '#94a3b8', marginBottom: '24px' }}>Everything you need</p>
          <div style={{ fontSize: '32px', fontWeight: '700', color: '#6366f1', marginBottom: '24px' }}>
            ₹299 <span style={{ fontSize: '14px', color: '#94a3b8' }}>one-time</span>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, marginBottom: '24px' }}>
            {proPlan.map((f) => (
              <li key={f} style={{ padding: '6px 0' }}>✅ {f}</li>
            ))}
          </ul>
          <button
            onClick={() => setShowModal(true)}
            style={{
              background: '#6366f1', color: '#fff', border: 'none',
              padding: '12px 24px', borderRadius: '8px',
              fontSize: '15px', fontWeight: '600', cursor: 'pointer', width: '100%',
            }}
          >
            Get Pro Now
          </button>
        </motion.div>
      </div>

      {showModal && (
        <PricingModal
          onClose={() => setShowModal(false)}
          onSuccess={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
