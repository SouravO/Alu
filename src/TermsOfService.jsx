import React from "react";

const TermsOfService = () => {
  return (
    <section className="min-h-screen bg-[#0a0a0a] text-[#f8f8f8] py-20 px-4 pt-24">
      <div className="max-w-4xl mx-auto">
        <h1
          className="text-5xl md:text-6xl font-bold mb-8"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Terms of Service
        </h1>
        
        <div className="space-y-6 text-lg" style={{ fontFamily: "Montserrat, sans-serif" }}>
          <p>
            Welcome to VP GROUP. These Terms of Service govern your use of our website and services.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Acceptance of Terms</h2>
          <p>
            By accessing and using our website, you accept and agree to be bound by the terms and provision of this agreement.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Products and Services</h2>
          <p>
            VP GROUP provides premium aluminum food packaging containers. All product specifications and pricing are subject to change without notice.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Limitation of Liability</h2>
          <p>
            VP GROUP shall not be liable for any indirect, incidental, special, consequential, or punitive damages.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Contact Information</h2>
          <p>
            For questions about these Terms of Service, please contact us at vpackgroups@gmail.com or +91 9020229988.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TermsOfService;