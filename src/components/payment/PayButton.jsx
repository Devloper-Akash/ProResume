import { useRazorpay } from '../../hooks/useRazorpay';
import { saveOrder, confirmPayment } from '../../services/paymentService';
import { useAuth } from '../../context/AuthContext';

const AMOUNT = 299;

export default function PayButton({ onSuccess }) {
  const razorpayLoaded = useRazorpay();
  const { user } = useAuth();

  const handlePayment = async () => {
    if (!razorpayLoaded) return alert('Payment gateway not loaded. Please refresh.');
    if (!user) return alert('Please sign in first to upgrade.');

    const orderId = `order_${Date.now()}`;

    try {
      await saveOrder({ userId: user.id, orderId, amount: AMOUNT });
    } catch (err) {
      console.error('Save Order Error:', err);
      return alert('Failed to initiate order. Try again. Error: ' + err.message);
    }

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
      style={{
        background: razorpayLoaded ? '#6366f1' : '#94a3b8',
        color: '#fff',
        border: 'none',
        padding: '12px 28px',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: razorpayLoaded ? 'pointer' : 'not-allowed',
        width: '100%',
        marginTop: '16px',
      }}
    >
      {razorpayLoaded ? `Upgrade to Pro — ₹${AMOUNT}` : 'Loading...'}
    </button>
  );
}
