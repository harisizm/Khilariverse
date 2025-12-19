import React from 'react';
import { NavLink } from 'react-router-dom';
import { PlusCircle, List, ListPlus } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen border-r border-white/10 bg-dark-bg flex flex-col pt-10">
      <div className="flex flex-col gap-4 pl-[20%] text-[15px]">
        <NavLink
          to="/admin/add"
          className={({ isActive }) => `flex items-center gap-3 border border-white/10 border-r-0 px-3 py-2 rounded-l-md transition-all ${isActive ? 'bg-neon-pink text-white border-neon-pink shadow-glow-pink' : 'bg-transparent text-gray-400 hover:text-white hover:bg-white/5'}`}
        >
          <PlusCircle size={20} />
          <p className="hidden md:block">Add Items</p>
        </NavLink>

        <NavLink
          to="/admin/orders"
          className={({ isActive }) => `flex items-center gap-3 border border-white/10 border-r-0 px-3 py-2 rounded-l-md transition-all ${isActive ? 'bg-neon-pink text-white border-neon-pink shadow-glow-pink' : 'bg-transparent text-gray-400 hover:text-white hover:bg-white/5'}`}
        >
          <ListPlus size={20} />
          <p className="hidden md:block">Orders</p>
        </NavLink>

        <NavLink
          to="/admin/list"
          className={({ isActive }) => `flex items-center gap-3 border border-white/10 border-r-0 px-3 py-2 rounded-l-md transition-all ${isActive ? 'bg-neon-pink text-white border-neon-pink shadow-glow-pink' : 'bg-transparent text-gray-400 hover:text-white hover:bg-white/5'}`}
        >
          <List size={20} />
          <p className="hidden md:block">List Items</p>
        </NavLink>

        {/* Orders can be added later */}
      </div>
    </div>
  );
};

export default Sidebar;
