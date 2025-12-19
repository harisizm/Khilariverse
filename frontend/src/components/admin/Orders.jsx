import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ShopContext } from '../../context/ShopContext';
import { Package, Truck, Check, X } from 'lucide-react';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { backendUrl, currency } = useContext(ShopContext);

  const fetchAllOrders = async () => {
    const token = localStorage.getItem('token');
    console.log("Fetching Orders. Token:", token); // DEBUG LOG
    if (!token) {
      console.log("No token, skipping fetch");
      return;
    }

    try {
      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } });
      console.log("Orders API Response:", response.data); // DEBUG LOG
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Orders API Error:", error);
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(backendUrl + '/api/order/status', { orderId, status: event.target.value }, { headers: { token } });
      if (response.data.success) {
        await fetchAllOrders();
        toast.success("Status Updated");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className='p-6 min-h-screen bg-dark-bg text-white'>
      <h3 className='text-3xl font-display font-bold mb-8 uppercase text-neon-pink'>Order Management</h3>
      <div className='flex flex-col gap-6'>
        {orders.map((order, index) => (
          <div key={index} className='bg-dark-card border border-white/10 rounded-xl p-6 shadow-glow hover:border-neon-pink/30 transition-all grid grid-cols-1 md:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-4 items-start md:items-center'>

            <div className="flex justify-center md:justify-start">
              <Package className="text-neon-pink w-12 h-12" />
            </div>

            <div>
              <div className='flex flex-col gap-1 mb-2'>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return <p className='py-0.5' key={index}> {item.name} x {item.quantity} <span className='text-gray-400 text-sm ml-2 uppercase'>{item.size}</span> </p>
                  } else {
                    return <p className='py-0.5' key={index}> {item.name} x {item.quantity} <span className='text-gray-400 text-sm ml-2 uppercase'>{item.size}</span>, </p>
                  }
                })}
              </div>
              <p className='font-bold mt-2 text-sm uppercase text-white/50'>{order.address.firstName + " " + order.address.lastName}</p>
              <div className='text-gray-400 text-xs mt-1'>
                <p>{order.address.street + ","}</p>
                <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
              </div>
              <p className='text-gray-400 text-xs mt-1'>{order.address.phone}</p>
            </div>

            <div className="text-sm">
              <p className="mb-1">Items: {order.items.length}</p>
              <p className="mb-1">Method: {order.paymentMethod}</p>
              <p className={`font-bold ${order.payment ? 'text-green-400' : 'text-orange-400'}`}>Payment: {order.payment ? 'Done' : 'Pending'}</p>
              <p className="text-xs text-gray-500 mt-1">{new Date(order.date).toLocaleDateString()}</p>
            </div>

            <div className="text-xl font-bold font-mono text-neon-pink text-glow">
              $ {order.amount.toFixed(2)}
            </div>

            <select onChange={(event) => statusHandler(event, order._id)} value={order.status} className='bg-black/50 border border-white/20 p-2 font-semibold rounded text-white focus:border-neon-pink focus:outline-none cursor-pointer'>
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>

          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders;
