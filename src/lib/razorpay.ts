/**
 * Razorpay Utility Functions
 * Handles Razorpay script loading and checkout initialization
 */

declare global {
  interface Window {
    Razorpay: any;
  }
}

/**
 * Load Razorpay checkout script
 * @returns Promise<boolean> - true if loaded successfully
 */
export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    // Check if already loaded
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    script.onload = () => {
      resolve(true);
    };

    script.onerror = () => {
      console.error("Failed to load Razorpay SDK");
      resolve(false);
    };

    document.body.appendChild(script);
  });
};

/**
 * Razorpay checkout options interface
 */
export interface RazorpayOptions {
  key: string; // Razorpay Key ID
  amount: number; // Amount in paise
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color?: string;
  };
  handler: (response: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }) => void;
  modal?: {
    ondismiss?: () => void;
  };
}

/**
 * Open Razorpay checkout
 * @param options - Razorpay checkout options
 */
export const openRazorpayCheckout = (options: RazorpayOptions): void => {
  if (!window.Razorpay) {
    console.error("Razorpay SDK not loaded");
    return;
  }

  const rzp = new window.Razorpay(options);
  rzp.open();
};

/**
 * Get Razorpay key from environment
 * @returns Razorpay Key ID
 */
export const getRazorpayKey = (): string => {
  const key = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  if (!key) {
    console.warn("Razorpay Key ID not found in environment variables");
    return "";
  }
  return key;
};
