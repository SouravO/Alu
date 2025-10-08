import React from "react";

const PrivacyPolicy = () => {
  return (
    <section className="min-h-screen bg-[#0a0a0a] text-[#f8f8f8] py-20 px-4 pt-24">
      <div className="max-w-4xl mx-auto">
        <h1
          className="text-5xl md:text-6xl font-bold mb-8"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Privacy Policy
        </h1>
        
        <div className="space-y-6 text-lg" style={{ fontFamily: "Montserrat, sans-serif" }}>
          <p>
            At VP GROUP, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your information.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Information We Collect</h2>
          <p>
            We may collect personal information when you contact us, including your name, email address, phone number, and company information.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">How We Use Your Information</h2>
          <p>
            We use your information to respond to your inquiries, provide customer service, and improve our products and services.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at vpackgroups@gmail.com or +91 9020229988.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;