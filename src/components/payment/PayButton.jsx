import { useRazorpay } from '../../hooks/useRazorpay';
import { saveOrder, confirmPayment } from '../../services/paymentService';
import { useAuth } from '../../context/AuthContext';

const AMOUNT = 299;

export default function PayButton({ onSuccess }) {
  const razorpayLoaded = useRazorpay();
  const { user, refreshProStatus } = useAuth();

  const handlePayment = async () => {
    if (!razorpayLoaded || !window.Razorpay) {
      return alert('Payment gateway is still loading. Please wait a moment or refresh.');
    }
    if (!user) return alert('Please sign in first to upgrade.');

    const keyId = import.meta.env.VITE_RAZORPAY_KEY_ID;
    if (!keyId) {
      console.error('VITE_RAZORPAY_KEY_ID environment variable is missing.');
      return alert('Configuration Error: Razorpay Key ID is missing. Please configure VITE_RAZORPAY_KEY_ID in your Vercel project settings.');
    }

    if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
      console.error('Supabase keys are missing.');
      return alert('Configuration Error: Supabase keys are missing. Please configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your Vercel project settings.');
    }

    const orderId = `order_${Date.now()}`;

    // Save order in background to maintain synchronous execution flow for mobile Safari gesture token
    saveOrder({ userId: user.id, orderId, amount: AMOUNT }).catch(err => {
      console.error('Save Order Error:', err);
    });

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: AMOUNT * 100,
      currency: 'INR',
      name: 'ProResume',
      description: 'Pro Plan — Unlimited PDF Downloads',
      prefill: { email: user.email },
      theme: { color: '#6366f1' },
      handler: async function (response) {
        try {
          await confirmPayment({
            orderId,
            paymentId: response.razorpay_payment_id,
          });
          onSuccess?.();
          refreshProStatus();
          alert('🎉 Payment successful! You are now a Pro user.');
        } catch (err) {
          console.error('Confirm Payment Error:', err);
          alert('Payment recorded but failed to update status. Error: ' + err.message);
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on('payment.failed', (response) => {
      alert('Payment failed: ' + response.error.description);
    });
    rzp.open();
  };

  return (
    <button
      onClick={handlePayment}
      disabled={!razorpayLoaded}
      className="btn btn-primary"
      style={{
        width: '100%',
        marginTop: '16px',
        padding: '0.85rem',
        background: !razorpayLoaded ? '#94a3b8' : undefined,
        cursor: !razorpayLoaded ? 'not-allowed' : 'pointer'
      }}
    >
      {razorpayLoaded ? `Upgrade to Pro — ₹${AMOUNT}` : 'Loading...'}
    </button>
  );
}
