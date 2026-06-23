CREATE TABLE payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  amount INTEGER,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT now()
);
