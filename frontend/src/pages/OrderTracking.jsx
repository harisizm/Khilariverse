import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';

const OrderTracking = () => {
  const { orderId } = useParams();
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const steps = ['Order Placed', 'Packing', 'Shipped', 'Out for delivery', 'Delivered'];

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        // Determine API endpoint. Admin can track any, user can track theirs.
        // For simplicity, we'll try to find from user orders list or if admin requires specific endpoint.
        // The current backend userOrders returns ALL user orders. We can filter client side or verify safety.
        // Ideally backend should have /api/order/track/:id but for now let's reuse userOrders and find.

        const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token: localStorage.getItem('token') } });

        if (response.data.success) {
          const foundOrder = response.data.orders.find(o => o._id === orderId);
          if (foundOrder) {
            setOrder(foundOrder);
          } else {
            // Fallback: Could be admin viewing? 
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchOrder();
    }
  }, [token, orderId, backendUrl]);

  if (loading) return <div className='p-8 text-white'>Loading Tracking...</div>;
  if (!order) return <div className='p-8 text-white'>Order not found.</div>;

  const currentStepIndex = steps.indexOf(order.status);
  // Calculated arrival date (Mock logic: +5 days from date)
  const arrivalDate = new Date(new Date(order.date).getTime() + (5 * 24 * 60 * 60 * 1000));

  return (
    <div className='min-h-screen bg-black text-white pt-[100px] px-4 md:px-[6%] font-sans'>

      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <div className='flex justify-between items-end border-b border-gray-800 pb-6 mb-8'>
          <div>
            <h1 className='text-3xl font-display font-bold uppercase tracking-wide text-neon-pink'>Tracking Order</h1>
            <p className='text-gray-400 mt-2 font-mono'>#{order._id}</p>
          </div>
          <div className='text-right'>
            <p className='text-gray-400 text-sm uppercase mb-1'>Estimated Arrival</p>
            <h2 className='text-2xl font-bold font-mono text-neon-blue'>{arrivalDate.toLocaleDateString()}</h2>
          </div>
        </div>

        {/* Tracking Animation Bar */}
        <div className='relative mb-16 px-4'>
          {/* Background Line */}
          <div className='absolute top-1/2 left-0 w-full h-1 bg-gray-800 -translate-y-1/2 rounded-full'></div>

          {/* Active Line (with bright head) */}
          <div
            className='absolute top-1/2 left-0 h-1 bg-neon-pink -translate-y-1/2 rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_#ec008c]'
            style={{ width: `${(Math.max(0, currentStepIndex) / (steps.length - 1)) * 100}%` }}
          >
            {/* Bright Head (The "Thing" following the line) */}
            <div className='absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_20px_white] animate-pulse'></div>
          </div>

          {/* Step Icons */}
          <div className='relative flex justify-between w-full'>
            {steps.map((step, index) => {
              const isCompleted = index <= currentStepIndex;
              const isCurrent = index === currentStepIndex;

              return (
                <div key={step} className='flex flex-col items-center gap-2 group'>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 z-10 bg-black ${isCompleted ? 'border-neon-pink text-neon-pink shadow-glow-pink' : 'border-gray-700 text-gray-700'}`}>
                    {index === 0 && <Clock size={16} />}
                    {index === 1 && <Package size={16} />}
                    {index === 2 && <Truck size={16} />}
                    {index === 3 && <Truck size={16} className="rotate-12" />}
                    {index === 4 && <CheckCircle size={16} />}
                  </div>
                  <p className={`text-xs uppercase font-bold tracking-wider absolute top-12 w-32 text-center transition-colors ${isCurrent ? 'text-white' : isCompleted ? 'text-gray-400' : 'text-gray-700'}`}>
                    {step}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Details Section */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div className='bg-dark-card border border-white/10 p-6 rounded-lg'>
            <h3 className='text-lg font-bold mb-4 uppercase text-gray-300'>Items</h3>
            <div className='flex flex-col gap-4'>
              {order.items.map((item, index) => (
                <div key={index} className='flex gap-4 items-center'>
                  <img src={item.image[0]} alt={item.name} className='w-16 h-16 object-cover rounded bg-white/5' />
                  <div>
                    <p className='font-bold'>{item.name}</p>
                    <div className='flex gap-3 text-sm text-gray-400'>
                      <p>{currency}{item.price}</p>
                      <p>Qty: {item.quantity}</p>
                      <p>Size: {item.size}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='bg-dark-card border border-white/10 p-6 rounded-lg flex flex-col justify-between'>
            <div>
              <h3 className='text-lg font-bold mb-4 uppercase text-gray-300'>Delivery Details</h3>
              <p className='text-gray-300 mb-1'>{order.address.firstName} {order.address.lastName}</p>
              <p className='text-gray-400'>{order.address.street}</p>
              <p className='text-gray-400'>{order.address.city}, {order.address.state} {order.address.zipcode}</p>
              <p className='text-gray-400 mb-6'>{order.address.phone}</p>
            </div>

            <div className='border-t border-white/10 pt-4 mt-4'>
              <p className='text-gray-400 text-sm mb-2'>Have questions?</p>
              <p className='text-neon-pink font-bold'>support@khilariverse.com</p>
              <p className='text-neon-pink font-bold'>+1 (555) 123-4567</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OrderTracking;
