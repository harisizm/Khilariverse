import React, { useState, useContext, useEffect } from 'react';
import { Upload } from 'lucide-react';
import { ShopContext } from '../../context/ShopContext';
import { toast } from 'react-toastify';

const AddProduct = ({ token }) => {
  const { backendUrl } = useContext(ShopContext);
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  // Initialize state from sessionStorage or defaults
  const [name, setName] = useState(() => sessionStorage.getItem('add_product_name') || "");
  const [description, setDescription] = useState(() => sessionStorage.getItem('add_product_description') || "");
  const [price, setPrice] = useState(() => sessionStorage.getItem('add_product_price') || "");
  const [category, setCategory] = useState(() => sessionStorage.getItem('add_product_category') || "Keyboards");
  const [subCategory, setSubCategory] = useState(() => sessionStorage.getItem('add_product_subCategory') || "Wired");
  const [brand, setBrand] = useState(() => sessionStorage.getItem('add_product_brand') || "");
  const [bestseller, setBestseller] = useState(false);

  // New Fields
  const [rating, setRating] = useState(() => sessionStorage.getItem('add_product_rating') || "5");
  const [reviews, setReviews] = useState(() => sessionStorage.getItem('add_product_reviews') || "100");
  const [specs, setSpecs] = useState(() => sessionStorage.getItem('add_product_specs') || "");

  // Persist form data to sessionStorage on change
  useEffect(() => {
    sessionStorage.setItem('add_product_name', name);
    sessionStorage.setItem('add_product_description', description);
    sessionStorage.setItem('add_product_price', price);
    sessionStorage.setItem('add_product_category', category);
    sessionStorage.setItem('add_product_subCategory', subCategory);
    sessionStorage.setItem('add_product_brand', brand);
    sessionStorage.setItem('add_product_rating', rating);
    sessionStorage.setItem('add_product_reviews', reviews);
    sessionStorage.setItem('add_product_specs', specs);
  }, [name, description, price, category, subCategory, brand, rating, reviews, specs]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("brand", brand);
      formData.append("bestseller", bestseller);
      formData.append("rating", rating);
      formData.append("reviews", reviews);

      // Parse specs from semicolon separated string to array if backend expects string or handle array there. 
      // Product model expects Array. 
      // If I send string, backend might need to parse. 
      // Better: send specific index or JSON stringify? 
      // The backend uses `req.body.specs`. If I append multiple `specs` keys or stringify.
      // Easiest: JSON.stringify(specs.split(';').map(s => s.trim()))
      const specsArray = specs.split(';').map(s => s.trim()).filter(s => s !== "");
      formData.append("specs", JSON.stringify(specsArray));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await fetch(backendUrl + "/api/product/add", {
        method: 'POST',
        headers: {
          token: token
        },
        body: formData
      });
      const data = await response.json();

      if (data.success) {
        toast.success("Product Added");
        setName("");
        setDescription("");
        setPrice("");
        setBrand("");
        setRating("5");
        setReviews("100");
        setSpecs("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);

        // Clear session storage on success
        sessionStorage.removeItem('add_product_name');
        sessionStorage.removeItem('add_product_description');
        sessionStorage.removeItem('add_product_price');
        sessionStorage.removeItem('add_product_category');
        sessionStorage.removeItem('add_product_subCategory');
        sessionStorage.removeItem('add_product_brand');
        sessionStorage.removeItem('add_product_rating');
        sessionStorage.removeItem('add_product_reviews');
        sessionStorage.removeItem('add_product_specs');

      } else {
        toast.error(data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-4 p-4 md:p-8 text-white">
      <h2 className="text-2xl font-bold mb-4 font-display">Add New Product</h2>

      <div className="flex gap-4">
        <label htmlFor="image1">
          <div className="w-20 h-20 border-2 border-dashed border-white/20 flex items-center justify-center cursor-pointer hover:border-neon-pink bg-dark-card rounded-lg overflow-hidden transition-colors">
            {!image1 ? <Upload className="text-gray-400" /> : <img src={URL.createObjectURL(image1)} alt="" className="w-full h-full object-cover" />}
          </div>
          <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
        </label>
        <label htmlFor="image2">
          <div className="w-20 h-20 border-2 border-dashed border-white/20 flex items-center justify-center cursor-pointer hover:border-neon-pink bg-dark-card rounded-lg overflow-hidden transition-colors">
            {!image2 ? <Upload className="text-gray-400" /> : <img src={URL.createObjectURL(image2)} alt="" className="w-full h-full object-cover" />}
          </div>
          <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden />
        </label>
        <label htmlFor="image3">
          <div className="w-20 h-20 border-2 border-dashed border-white/20 flex items-center justify-center cursor-pointer hover:border-neon-pink bg-dark-card rounded-lg overflow-hidden transition-colors">
            {!image3 ? <Upload className="text-gray-400" /> : <img src={URL.createObjectURL(image3)} alt="" className="w-full h-full object-cover" />}
          </div>
          <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden />
        </label>
        <label htmlFor="image4">
          <div className="w-20 h-20 border-2 border-dashed border-white/20 flex items-center justify-center cursor-pointer hover:border-neon-pink bg-dark-card rounded-lg overflow-hidden transition-colors">
            {!image4 ? <Upload className="text-gray-400" /> : <img src={URL.createObjectURL(image4)} alt="" className="w-full h-full object-cover" />}
          </div>
          <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden />
        </label>
      </div>

      <div className="w-full">
        <p className="mb-2">Product Name</p>
        <input onChange={(e) => setName(e.target.value)} value={name} className="w-full max-w-[500px] px-3 py-2 bg-dark-card border border-white/10 rounded focus:outline-none focus:border-neon-pink text-white" type="text" placeholder="Type here" required />
      </div>

      <div className="w-full">
        <p className="mb-2">Product Description</p>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description} className="w-full max-w-[500px] px-3 py-2 bg-dark-card border border-white/10 rounded focus:outline-none focus:border-neon-pink text-white h-24" placeholder="Write content here" required />
      </div>

      <div className="w-full">
        <p className="mb-2">Brand</p>
        <input onChange={(e) => setBrand(e.target.value)} value={brand} className="w-full max-w-[500px] px-3 py-2 bg-dark-card border border-white/10 rounded focus:outline-none focus:border-neon-pink text-white" type="text" placeholder="Khilari, Razer, Logitech..." required />
      </div>

      <div className="flex flex-col sm:flex-row gap-8 w-full max-w-[500px]">
        <div className="flex-1">
          <p className="mb-2">Category</p>
          <select onChange={(e) => setCategory(e.target.value)} value={category} className="w-full px-3 py-2 bg-dark-card border border-white/10 rounded focus:outline-none focus:border-neon-pink text-white cursor-pointer">
            <option value="Keyboards">Keyboards</option>
            <option value="Gaming Mice">Gaming Mice</option>
            <option value="Headsets">Headsets</option>
            <option value="Chairs">Chairs</option>
            <option value="Monitors">Monitors</option>
            <option value="Components">Components</option>
          </select>
        </div>
        <div className="flex-1">
          <p className="mb-2">Sub Category</p>
          <select onChange={(e) => setSubCategory(e.target.value)} value={subCategory} className="w-full px-3 py-2 bg-dark-card border border-white/10 rounded focus:outline-none focus:border-neon-pink text-white cursor-pointer">
            <option value="Best Seller">Best Seller</option>
            <option value="New Arrival">New Arrival</option>
            <option value="Featured">Featured</option>
          </select>
        </div>
        <div className="flex-1">
          <p className="mb-2">Price</p>
          <input onChange={(e) => setPrice(e.target.value)} value={price} className="w-full px-3 py-2 bg-dark-card border border-white/10 rounded focus:outline-none focus:border-neon-pink text-white" type="number" placeholder="25" required />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-8 w-full max-w-[500px]">
        <div className="flex-1">
          <p className="mb-2">Rating (0-5)</p>
          <input onChange={(e) => setRating(e.target.value)} value={rating} className="w-full px-3 py-2 bg-dark-card border border-white/10 rounded focus:outline-none focus:border-neon-pink text-white" type="number" step="0.1" min="0" max="5" placeholder="4.5" />
        </div>
        <div className="flex-1">
          <p className="mb-2">Review Count</p>
          <input onChange={(e) => setReviews(e.target.value)} value={reviews} className="w-full px-3 py-2 bg-dark-card border border-white/10 rounded focus:outline-none focus:border-neon-pink text-white" type="number" placeholder="100" />
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Key Specifications (Semicolon separated)</p>
        <textarea onChange={(e) => setSpecs(e.target.value)} value={specs} className="w-full max-w-[500px] px-3 py-2 bg-dark-card border border-white/10 rounded focus:outline-none focus:border-neon-pink text-white h-24" placeholder="Wireless; RGB Lit; 18000 DPI; 70h Battery" />
      </div>

      <button type="submit" className="w-28 py-3 mt-4 bg-neon-pink text-white font-bold rounded hover:bg-white hover:text-neon-pink transition-colors cursor-pointer">ADD</button>

    </form>
  );
};

export default AddProduct;
