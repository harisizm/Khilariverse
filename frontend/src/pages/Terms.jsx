import React from 'react';

const Terms = () => {
  return (
    <div className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 bg-dark-bg min-h-screen text-white font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-display font-bold text-white mb-8 border-b border-white/10 pb-4">Terms of Service</h1>

        <div className="space-y-6 text-gray-400 text-sm leading-relaxed">
          <p className="italic">Last Updated: December 2025</p>

          <section>
            <h2 className="text-xl text-white font-bold mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the KhilariVerse website, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions, then you may not access the website or use any services.
            </p>
          </section>

          <section>
            <h2 className="text-xl text-white font-bold mb-3">2. Online Store Terms</h2>
            <p>
              By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence. You may not use our products for any illegal or unauthorized purpose.
            </p>
          </section>

          <section>
            <h2 className="text-xl text-white font-bold mb-3">3. Products and Services</h2>
            <p>
              We reserve the right to limit the sales of our products or Services to any person, geographic region, or jurisdiction. We may exercise this right on a case-by-case basis. All descriptions of products or product pricing are subject to change at any time without notice.
            </p>
          </section>

          <section>
            <h2 className="text-xl text-white font-bold mb-3">4. Limitation of Liability</h2>
            <p>
              In no case shall KhilariVerse, our directors, officers, employees, affiliates, agents, contractors, interns, suppliers, service providers or licensors be liable for any injury, loss, claim, or any direct, indirect, incidental, punitive, special, or consequential damages of any kind.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
