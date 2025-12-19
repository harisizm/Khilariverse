import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { ShopContext } from '../../context/ShopContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, Package, ShoppingBag, DollarSign } from 'lucide-react';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const { backendUrl, currency } = useContext(ShopContext);
  const [stats, setStats] = useState(null);
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await axios.get(backendUrl + '/api/analytics/dashboard', {
          headers: { token }
        });

        if (response.data.success) {
          setStats(response.data.stats);
          setGraphData(response.data.graphData);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch dashboard data");
      }
    };

    fetchDashboardData();

    // Live updates every 30 seconds
    const interval = setInterval(fetchDashboardData, 30000);
    return () => clearInterval(interval);
  }, [backendUrl]);

  if (!stats) {
    return <div className="text-white p-8">Loading Dashboard...</div>;
  }

  return (
    <div className="w-full text-white p-6 max-h-screen overflow-y-auto">
      <h1 className="text-3xl font-display font-bold mb-8 text-neon-pink uppercase tracking-wide">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-dark-card border border-white/10 p-6 rounded-xl hover:border-neon-pink/50 transition-all shadow-glow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400 text-sm uppercase tracking-wider font-bold mb-1">Total Sales</p>
              <h3 className="text-2xl font-mono font-bold text-white">{currency}{stats.totalSales.toFixed(2)}</h3>
            </div>
            <div className="p-2 bg-neon-pink/20 rounded-lg text-neon-pink">
              <DollarSign size={24} />
            </div>
          </div>
        </div>

        <div className="bg-dark-card border border-white/10 p-6 rounded-xl hover:border-neon-pink/50 transition-all shadow-glow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400 text-sm uppercase tracking-wider font-bold mb-1">Total Orders</p>
              <h3 className="text-2xl font-mono font-bold text-white">{stats.totalOrders}</h3>
            </div>
            <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
              <ShoppingBag size={24} />
            </div>
          </div>
        </div>

        <div className="bg-dark-card border border-white/10 p-6 rounded-xl hover:border-neon-pink/50 transition-all shadow-glow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400 text-sm uppercase tracking-wider font-bold mb-1">Total Products</p>
              <h3 className="text-2xl font-mono font-bold text-white">{stats.totalProducts}</h3>
            </div>
            <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
              <Package size={24} />
            </div>
          </div>
        </div>

        <div className="bg-dark-card border border-white/10 p-6 rounded-xl hover:border-neon-pink/50 transition-all shadow-glow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400 text-sm uppercase tracking-wider font-bold mb-1">Total Users</p>
              <h3 className="text-2xl font-mono font-bold text-white">{stats.totalUsers}</h3>
            </div>
            <div className="p-2 bg-green-500/20 rounded-lg text-green-400">
              <Users size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Graph */}
      <div className="bg-dark-card border border-white/10 p-6 rounded-xl mb-8">
        <h3 className="text-xl font-bold mb-6 text-white border-l-4 border-neon-pink pl-3">Sales Overview</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={graphData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', color: '#fff' }}
                itemStyle={{ color: '#ec008c' }}
              />
              <Bar dataKey="sales" fill="#ec008c" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
