import PayButton from './PayButton';

const features = [
  '✅ Unlimited PDF Downloads',
  '✅ All Premium Templates',
  '✅ Priority Support',
];

export default function PricingModal({ onClose, onSuccess }) {
  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'rgba(0,0,0,0.7)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 9999,
    }}>
      <div style={{
        background: '#1e1e2e',
        border: '1px solid #6366f1',
        borderRadius: '16px',
        padding: '36px',
        width: '100%',
        maxWidth: '400px',
        color: '#fff',
        boxShadow: '0 0 40px rgba(99,102,241,0.3)',
      }}>
        <h2 style={{ margin: '0 0 8px', fontSize: '24px' }}>⚡ Upgrade to Pro</h2>
        <p style={{ color: '#94a3b8', margin: '0 0 24px' }}>
          One-time payment. Lifetime access.
        </p>
        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px' }}>
          {features.map((f) => (
            <li key={f} style={{ padding: '8px 0', fontSize: '15px' }}>{f}</li>
          ))}
        </ul>
        <div style={{
          fontSize: '32px', fontWeight: '700',
          color: '#6366f1', marginBottom: '8px'
        }}>
          ₹299 <span style={{ fontSize: '14px', color: '#94a3b8' }}>one-time</span>
        </div>
        <PayButton onSuccess={() => { onSuccess?.(); onClose(); }} />
        <button
          onClick={onClose}
          style={{
            background: 'transparent', border: 'none',
            color: '#64748b', cursor: 'pointer',
            width: '100%', marginTop: '12px',
            padding: '8px', fontSize: '14px',
          }}
        >
          Maybe later
        </button>
      </div>
    </div>
  );
}
