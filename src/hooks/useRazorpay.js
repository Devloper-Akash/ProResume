import { useEffect, useState } from 'react';

const RAZORPAY_SCRIPT = 'https://checkout.razorpay.com/v1/checkout.js';

export function useRazorpay() {
  const [loaded, setLoaded] = useState(!!window.Razorpay);

  useEffect(() => {
    if (window.Razorpay) {
      setLoaded(true);
      return;
    }

    const existingScript = document.querySelector(`script[src="${RAZORPAY_SCRIPT}"]`);
    if (existingScript) {
      const handleLoad = () => setLoaded(true);
      existingScript.addEventListener('load', handleLoad);
      return () => existingScript.removeEventListener('load', handleLoad);
    }

    const script = document.createElement('script');
    script.src = RAZORPAY_SCRIPT;
    script.onload = () => setLoaded(true);
    script.onerror = () => console.error('Razorpay script failed to load');
    document.body.appendChild(script);
  }, []);

  return loaded;
}
