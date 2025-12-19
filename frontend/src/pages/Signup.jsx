import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await signup(name, email, password);
    if (response.success) {
      toast.success("Account Created!");
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-bg px-4">
      <div className="max-w-md w-full bg-dark-card border border-white/10 p-8 rounded-2xl shadow-glow">
        <h2 className="text-3xl font-display font-bold text-center text-white mb-8">Join the <span className="text-neon-pink">Verse</span></h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Full Name</label>
            <input
              type="text"
              required
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-pink focus:shadow-[0_0_10px_rgba(255,0,85,0.3)] transition-all"
              placeholder="Haris I."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2">Email Address</label>
            <input
              type="email"
              required
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-pink focus:shadow-[0_0_10px_rgba(255,0,85,0.3)] transition-all"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2">Password</label>
            <input
              type="password"
              required
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-pink focus:shadow-[0_0_10px_rgba(255,0,85,0.3)] transition-all"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-neon-pink text-white font-bold py-3 rounded-lg hover:bg-neon-pink/80 hover:shadow-[0_0_20px_rgba(255,0,85,0.5)] transition-all duration-300"
          >
            Sign Up
          </button>
          <div className="text-center text-sm text-gray-400 mt-4">
            Already have an account? <Link to="/login" className="text-neon-pink hover:text-white transition-colors">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
