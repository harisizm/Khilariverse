import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { Package, Smartphone } from 'lucide-react';

const MyOrders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      if (!token) return null;
      const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } });
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, [token]);

  const orderStages = ['Order Placed', 'Packing', 'Shipped', 'Out for delivery', 'Delivered'];

  const getExpectedDate = (date) => {
    const orderDate = new Date(date);
    orderDate.setDate(orderDate.getDate() + 14); // 2 Weeks
    return orderDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className='border-t border-white/10 pt-24 min-h-screen bg-dark-bg px-4 pb-20'>
      <div className="container mx-auto max-w-5xl">
        <h2 className='text-3xl font-display font-bold text-white mb-8 uppercase text-center md:text-left'>My <span className="text-neon-pink">Orders</span></h2>

        <div className='flex flex-col gap-6 mt-8'>
          {orders.length === 0 && (
            <div className="text-center text-gray-400 py-12">
              <p className="text-xl mb-4">No orders found.</p>
              <p className="text-sm">Time to gear up!</p>
            </div>
          )}

          {orders.map((order, index) => {
            const currentStageIndex = orderStages.indexOf(order.status);

            return (
              <div key={index} className='bg-dark-card border border-white/10 rounded-xl p-6 md:p-8 shadow-glow transition-all mb-6'>

                {/* Header: Items & Meta */}
                <div className="flex flex-col md:flex-row gap-6 justify-between mb-8 border-b border-white/5 pb-6">
                  <div className="flex gap-4 items-start">
                    <div className="hidden md:flex items-center justify-center bg-black/50 p-4 rounded-lg border border-white/5 text-neon-pink h-full min-w-[60px]">
                      <Package size={32} />
                    </div>
                    <div className='flex flex-col gap-2'>
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex flex-col sm:flex-row sm:items-baseline gap-2 text-white">
                          <span className='font-bold text-lg'>{item.name}</span>
                          <span className='text-gray-400 text-sm'>x {item.quantity}</span>
                          <span className='text-gray-500 text-xs uppercase bg-white/5 py-0.5 px-2 rounded ml-0 sm:ml-2'>{item.size}</span>
                        </div>
                      ))}
                      <div className="flex flex-wrap gap-4 mt-2">
                        <p className='text-gray-400 text-xs'>Ordered: <span className="text-white">{new Date(order.date).toLocaleDateString()}</span></p>
                        <p className='text-gray-400 text-xs'>Expected: <span className="text-neon-pink font-bold">{getExpectedDate(order.date)}</span></p>
                        <p className='text-gray-400 text-xs'>Payment: <span className="text-white">{order.paymentMethod}</span></p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-between">
                    <div className="text-xl font-bold font-mono text-white text-glow mb-2">
                      {currency}{order.amount.toFixed(2)}
                    </div>
                    <button onClick={fetchOrders} className='hidden md:block text-xs uppercase tracking-widest text-gray-500 hover:text-white transition-colors'>
                      Refresh Status
                    </button>
                  </div>
                </div>

                {/* Visual Stepper */}
                <div className="relative w-full">
                  {/* Progress Bar Background */}
                  <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2 rounded-full hidden md:block"></div>

                  {/* Active Progress Bar */}
                  <div
                    className="absolute top-1/2 left-0 h-1 bg-neon-pink -translate-y-1/2 rounded-full hidden md:block transition-all duration-1000 ease-out"
                    style={{ width: `${(currentStageIndex / (orderStages.length - 1)) * 100}%` }}
                  ></div>

                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {orderStages.map((stage, stepIndex) => {
                      const isCompleted = stepIndex <= currentStageIndex;
                      const isCurrent = stepIndex === currentStageIndex;
                      const isUpcoming = stepIndex > currentStageIndex;

                      return (
                        <div key={stepIndex} className={`flex md:flex-col items-center gap-4 md:gap-2 relative z-10 ${isUpcoming ? 'opacity-30 blur-[0.5px]' : 'opacity-100'}`}>
                          {/* Dot */}
                          <div className={`w-3 h-3 md:w-5 md:h-5 rounded-full border-2 transition-all duration-500 flex items-center justify-center
                                                        ${isCompleted ? 'bg-neon-pink border-neon-pink shadow-[0_0_10px_#ff0055]' : 'bg-dark-bg border-gray-600'}
                                                    `}>
                            {isCompleted && <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full"></div>}
                          </div>

                          {/* Label */}
                          <div className={`text-sm font-bold uppercase tracking-wider transition-colors duration-300 md:text-center
                                                        ${isCurrent ? 'text-neon-pink scale-110' : isCompleted ? 'text-white' : 'text-gray-500'}
                                                    `}>
                            {stage}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}

export default MyOrders;
