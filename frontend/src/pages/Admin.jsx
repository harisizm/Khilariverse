import React, { useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Sidebar from '../components/admin/Sidebar';

const Admin = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Strict role check using AuthContext source of truth
    if (!user || user.role !== 'admin') {
      navigate('/admin/login');
    }
  }, [user, navigate]);

  // Prevent rendering if not admin to avoid flicker of admin content before redirect
  if (!user || user.role !== 'admin') {
    return null; // or a loading spinner
  }

  return (
    <div className="bg-black min-h-screen flex pt-[80px]">
      {/* pt-80px to account for fixed navbar if present, or just general spacing */}
      <Sidebar />
      <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
