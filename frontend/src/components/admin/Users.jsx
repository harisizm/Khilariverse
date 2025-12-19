import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { ShopContext } from '../../context/ShopContext';
import { toast } from 'react-toastify';
import { Trash2, User } from 'lucide-react';

const UsersList = () => {
  const { backendUrl } = useContext(ShopContext);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(backendUrl + '/api/user/all', {}, {
        headers: { token }
      });
      if (response.data.success) {
        setUsers(response.data.users.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch users");
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(backendUrl + '/api/user/delete', { id }, {
        headers: { token }
      });
      if (response.data.success) {
        toast.success("User deleted successfully");
        fetchUsers();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error deleting user");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-4 md:p-8 text-white w-full">
      <h2 className="text-2xl font-bold mb-6 font-display uppercase tracking-wide text-neon-pink">User Management</h2>

      <div className="flex flex-col gap-2">
        {/* Header */}
        <div className="hidden md:grid grid-cols-[0.5fr_2fr_2fr_1fr_2fr_1fr] items-center py-3 px-4 border border-white/10 bg-dark-card text-sm font-bold uppercase tracking-wider text-neon-blue rounded-t-lg">
          <b>No</b>
          <b>Name</b>
          <b>Email</b>
          <b>Role</b>
          <b>Last Login</b>
          <b className="text-center">Action</b>
        </div>

        {/* List */}
        {users.map((item, index) => (
          <div key={index} className="grid grid-cols-[0.5fr_2fr_2fr_1fr_2fr_1fr] items-center gap-4 py-3 px-4 border border-white/5 bg-black/20 hover:bg-white/5 transition-all text-sm group rounded-md">
            <p className="text-gray-500">{index + 1}</p>
            <div className="flex items-center gap-2">
              <div className="p-1 bg-white/10 rounded-full">
                <User size={14} className="text-gray-300" />
              </div>
              <p className="font-medium text-white">{item.name}</p>
            </div>
            <p className="text-gray-400 break-all">{item.email}</p>
            <p className={`capitalize font-bold ${item.role === 'admin' ? 'text-neon-pink' : 'text-blue-400'}`}>{item.role}</p>
            <p className="text-gray-500 text-xs font-mono">
              {item.lastLogin ? new Date(item.lastLogin).toLocaleString() : 'Never'}
            </p>
            <p onClick={() => deleteUser(item._id)} className="text-center text-gray-500 cursor-pointer hover:text-red-500 transition-colors">
              <Trash2 size={18} />
            </p>
          </div>
        ))}
      </div>

      {users.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          No users found.
        </div>
      )}
    </div>
  );
};

export default UsersList;
