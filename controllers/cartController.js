import Cart from '../models/cartModel.js';

export const addToCart = async (req, res) => {
  const { userId, productId, name, price, discountPercent } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    let cartItem = cart.items.find(item => item.productId === productId);

    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      cart.items.push({
        productId,
        name,
        price,
        discountPercent,
        quantity: 1
      });
    }

    await cart.save();
    res.status(201).json(cart);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add to cart', details: err.message });
  }
};

export const getCartItems = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    res.json(cart ? cart.items : []);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cart items' });
  }
};

export const removeFromCart = async (req, res) => {
  const { productId } = req.params;
  try {
    await Cart.updateOne(
      { userId: req.user.id },
      { $pull: { items: { productId } } }
    );
    res.json({ message: 'Item removed from cart' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove item' });
  }
};
