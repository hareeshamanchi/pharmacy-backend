import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true, unique: true },
    drugName: { type: String, required: true },
    brandName: { type: String, required: true },
    composition: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    description: { type: String, required: true },
    tabletsPerSheet: { type: Number },
    imageUrl: { type: String },
    category: { type: String }
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
