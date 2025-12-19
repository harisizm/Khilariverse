import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: Array, required: true },
    category: { type: String, required: true },
    subCategory: { type: String },
    tags: { type: Array, default: [] }, // Featured, Sale, etc.
    brand: { type: String, required: true },
    specs: { type: Array, default: [] },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    originalPrice: { type: Number },
    colors: { type: Array, default: [] }, // [{id, label, hex}]
    date: { type: Number, required: true }
});

const productModel = mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
