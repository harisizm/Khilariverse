import React from 'react';

const Returns = () => {
  return (
    <div className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 bg-dark-bg min-h-screen text-white font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-display font-bold text-white mb-8 border-b border-white/10 pb-4">Returns & Shipping</h1>

        <div className="space-y-8 text-gray-400 leading-relaxed">

          <section className="bg-dark-card p-6 rounded-lg border border-white/10">
            <h2 className="text-xl text-neon-blue font-bold mb-4">30-Day Happiness Guarantee</h2>
            <p>
              We stand by our gear. If you're not 100% satisfied with your KhilariVerse purchase, you can return it within 30 days of delivery for a full refund. No questions asked.
            </p>
          </section>

          <section>
            <h2 className="text-xl text-white font-bold mb-3">Return Process</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Contact our support team at <span className="text-neon-pink">support@khilariverse.com</span> to initiate a return.</li>
              <li>We will provide you with a prepaid shipping label.</li>
              <li>Pack the item in its original packaging including all accessories.</li>
              <li>Ship it back to us. Once inspected, your refund will be processed within 3-5 business days.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl text-white font-bold mb-3">Shipping Information</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Standard Shipping:</strong> 3-5 Business Days (Free on orders over $100)</li>
              <li><strong>Express Shipping:</strong> 1-2 Business Days ($15.00 flat rate)</li>
              <li><strong>International:</strong> 7-14 Business Days (Rates calculated at checkout)</li>
            </ul>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Returns;
