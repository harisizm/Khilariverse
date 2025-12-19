import React, { useEffect, useState, useContext } from 'react';
import { ShopContext } from '../../context/ShopContext';
import { Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';


const ListProduct = ({ token }) => {
  const { backendUrl, currency } = useContext(ShopContext);
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await fetch(backendUrl + '/api/product/list');
      const data = await response.json();
      if (data.success) {
        setList(data.products);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  }

  const removeProduct = async (id) => {
    try {
      const response = await fetch(backendUrl + '/api/product/remove', {
        method: 'POST',
        headers: {
          token: token
        },
        body: JSON.stringify({ id })
      });

      // Need to set content type for JSON body
      // Wait, fetch defaults to text/plain if not specified.
      // Let's retry with explicit headers inside the fetch above actually.
      // Correct fetch call below:
      /*
      const response = await fetch(backendUrl + '/api/product/remove', {
          method: 'POST',
          headers: {
              token: token,
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id })
      });
      */
      // I will write the correct version in the file content.

    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  }

  // Corrected remove function for the file
  const removeProductCorrected = async (id) => {
    try {
      const response = await fetch(backendUrl + '/api/product/remove', {
        method: 'POST',
        headers: {
          token: token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
      });
      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        await fetchList();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="p-4 md:p-8 text-white w-full">
      <h2 className="text-2xl font-bold mb-4 font-display">All Products List</h2>
      <div className="flex flex-col gap-2">

        {/* Table Header */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-3 px-4 border border-white/10 bg-dark-card text-sm font-bold uppercase tracking-wider text-neon-blue">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/* Product List */}
        {list.map((item, index) => (
          <div key={index} className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-4 py-3 px-4 border border-white/5 hover:bg-white/5 transition-all text-sm group hover:border-neon-pink/30 hover:shadow-glow-pink">
            <img className="w-12 h-12 object-cover rounded border border-white/10 group-hover:border-neon-pink" src={item.image[0]} alt="" />
            <p className="font-medium text-gray-200 group-hover:text-white transition-colors">{item.name}</p>
            <p className="text-gray-400">{item.category}</p>
            <p className="font-bold text-neon-pink">{currency}{item.price}</p>
            <p onClick={() => removeProductCorrected(item._id)} className="text-right md:text-center text-gray-500 cursor-pointer text-lg hover:text-red-500 transition-colors">
              <Trash2 size={18} className="inline transition-transform group-hover:scale-110" />
            </p>
          </div>
        ))}

      </div>
    </div>
  );
};

export default ListProduct;
