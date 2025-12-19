import React from 'react';

const Privacy = () => {
  return (
    <div className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 bg-dark-bg min-h-screen text-white font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-display font-bold text-white mb-8 border-b border-white/10 pb-4">Privacy Policy</h1>

        <div className="space-y-6 text-gray-400 text-sm leading-relaxed">
          <p className="italic">Last Updated: December 2025</p>

          <section>
            <h2 className="text-xl text-white font-bold mb-3">1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us, such as when you create an account, update your profile, make a purchase, or communicate with us. This may include your name, email address, shipping address, and payment information.
            </p>
          </section>

          <section>
            <h2 className="text-xl text-white font-bold mb-3">2. How We Use Your Information</h2>
            <p>
              We use the information we collect to operate, maintain, and provide the features and functionality of the Service, to process and ship your orders, and to communicate directly with you.
            </p>
          </section>

          <section>
            <h2 className="text-xl text-white font-bold mb-3">3. Data Security</h2>
            <p>
              We implement reasonable security measures to protect the security of your personal information. However, no internet transmission is ever completely secure, and we cannot guarantee the security of any information you transmit to us.
            </p>
          </section>

          <section>
            <h2 className="text-xl text-white font-bold mb-3">4. Cookies</h2>
            <p>
              We use cookies to improve your experience on our site. By using our website, you agree to the use of cookies in accordance with this policy.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
