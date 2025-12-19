import React from 'react';
import { Mail, Phone, MapPin, MessageSquare } from 'lucide-react';

const Support = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Support request simulation: Message sent!");
  };

  return (
    <div className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 bg-dark-bg min-h-screen text-white font-sans">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">
            WE'RE HERE TO <span className="text-neon-pink">HELP</span>
          </h1>
          <p className="text-gray-400">Need assistance? Our support team is ready/24/7.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Contact Form */}
          <div className="bg-dark-card p-8 rounded-lg border border-white/10 shadow-glow">
            <h2 className="text-2xl font-display font-bold text-neon-blue mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Name</label>
                <input type="text" className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white focus:border-neon-blue focus:outline-none transition-colors" placeholder="Your Name" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Email</label>
                <input type="email" className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white focus:border-neon-blue focus:outline-none transition-colors" placeholder="your@email.com" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Subject</label>
                <select className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white focus:border-neon-blue focus:outline-none transition-colors">
                  <option>General Inquiry</option>
                  <option>Order Support</option>
                  <option>Technical Issue</option>
                  <option>Warranty Claim</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Message</label>
                <textarea rows="4" className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white focus:border-neon-blue focus:outline-none transition-colors" placeholder="How can we help?"></textarea>
              </div>
              <button type="submit" className="w-full bg-neon-blue hover:bg-neon-blue/80 text-dark-bg font-bold py-3 rounded transition-colors uppercase tracking-wide">
                Submit Request
              </button>
            </form>
          </div>

          {/* Contact Info & FAQ */}
          <div className="space-y-8">

            {/* Direct Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-dark-card p-6 rounded-lg border border-white/10 hover:border-neon-pink/50 transition-colors">
                <Mail className="text-neon-pink mb-4" size={32} />
                <h3 className="font-bold text-lg mb-2">Email Us</h3>
                <p className="text-gray-400 text-sm">support@khilariverse.com</p>
                <p className="text-gray-500 text-xs mt-1">Response time: 24h</p>
              </div>
              <div className="bg-dark-card p-6 rounded-lg border border-white/10 hover:border-neon-pink/50 transition-colors">
                <Phone className="text-neon-pink mb-4" size={32} />
                <h3 className="font-bold text-lg mb-2">Call Us</h3>
                <p className="text-gray-400 text-sm">+1 (555) 123-4567</p>
                <p className="text-gray-500 text-xs mt-1">Mon-Fri, 9am-5pm EST</p>
              </div>
            </div>

            {/* FAQ Preview */}
            <div className="bg-dark-card p-8 rounded-lg border border-white/10">
              <h3 className="text-xl font-display font-bold text-white mb-6">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <details className="group">
                  <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-gray-300 hover:text-white">
                    <span>How do I track my order?</span>
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                  </summary>
                  <p className="text-gray-500 mt-3 text-sm">
                    Check your email for a tracking number once your order has shipped, or log in to your account to view order status.
                  </p>
                </details>
                <div className="border-t border-white/5 my-2"></div>
                <details className="group">
                  <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-gray-300 hover:text-white">
                    <span>What is the return policy?</span>
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                  </summary>
                  <p className="text-gray-500 mt-3 text-sm">
                    We accept returns within 30 days of purchase for items in original condition.
                  </p>
                </details>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Support;
