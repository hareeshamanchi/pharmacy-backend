import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 },
  discountPercent: { type: Number, required: true, default: 0 }
});

const CartItem = mongoose.model('CartItem', cartItemSchema);

export default CartItem;
