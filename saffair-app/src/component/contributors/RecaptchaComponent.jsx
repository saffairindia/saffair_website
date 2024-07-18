import React from 'react';
import ReCAPTCHA from 'react-recaptcha-v2';

function RecaptchaComponent({ onVerify }) {
  const handleVerify = (token) => {
    onVerify(token); // Pass the token to the verification function
  };

  return (
    <ReCAPTCHA
      sitekey="YOUR_SITE_KEY" // Replace with your reCAPTCHA site key
      onVerify={handleVerify}
    />
  );
}

export default RecaptchaComponent;