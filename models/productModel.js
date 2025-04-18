// models/productModel.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    composition: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    description: { type: String },
    tabletsPerSheet: { type: Number },
    expiryDate: { type: Date },
    imageUrl: { type: String },
    category: { type: String }
  },
  { timestamps: true }
);

// Format expiryDate to only return the date (yyyy-mm-dd) in JSON output
productSchema.set('toJSON', {
  transform: function (doc, ret) {
    if (ret.expiryDate) {
      ret.expiryDate = ret.expiryDate.toISOString().split('T')[0];
    }
    return ret;
  },
});

const Product = mongoose.model('Product', productSchema);

export default Product;
