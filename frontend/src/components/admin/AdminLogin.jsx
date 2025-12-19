import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { adminLogin, user } = useContext(AuthContext);
  const navigate = useNavigate();

  // If already logged in as admin, redirect to dashboard
  useEffect(() => {
    if (user && user.role === 'admin') {
      navigate('/admin/add');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await adminLogin(email, password);
    if (!response.success) {
      toast.error(response.message);
    } else {
      // Redirect handled in context or effect, but good to be explicit
      toast.success("Welcome Admin!");
      navigate('/admin/add');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="max-w-md w-full bg-dark-card border border-white/10 p-10 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-display font-bold text-white mb-2">Welcome Back <span className="text-neon-pink">Admin</span></h2>
          <p className="text-gray-400 text-sm">Please login to access the dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2 font-bold">Email Address</label>
            <input
              type="email"
              required
              className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-neon-pink transition-colors"
              placeholder="admin@khilari.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2 font-bold">Password</label>
            <input
              type="password"
              required
              className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-neon-pink transition-colors"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-white text-black font-bold py-3 rounded hover:bg-neon-pink hover:text-white transition-all duration-300 uppercase tracking-widest text-sm"
          >
            Access Dashboard
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
