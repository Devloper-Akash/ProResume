import { supabase } from '../utils/supabase';

export async function saveOrder({ userId, orderId, amount }) {
  const { error } = await supabase.from('payments').insert({
    user_id: userId,
    razorpay_order_id: orderId,
    amount,
    status: 'pending',
  });
  if (error) throw error;
}

export async function confirmPayment({ orderId, paymentId }) {
  const { error } = await supabase
    .from('payments')
    .update({ status: 'paid', razorpay_payment_id: paymentId })
    .eq('razorpay_order_id', orderId);
  if (error) throw error;
}

export async function checkProStatus(userId) {
  const { data } = await supabase
    .from('payments')
    .select('status')
    .eq('user_id', userId)
    .eq('status', 'paid')
    .limit(1);
  return data?.length > 0;
}
