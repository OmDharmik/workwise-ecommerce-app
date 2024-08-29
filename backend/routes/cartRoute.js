const express = require('express');
const { Cart, Product, CartProducts } = require('../db/models');
const authMiddleware = require('../middleware');
const { ROLE } = require('../utils/constants');
const router = express.Router();

// Add a product to the cart
router.post('/add/:productId', authMiddleware, async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    const { id: userId } = req.user;

    if (req.user.role !== ROLE.BUYER) {
      return res.status(403).json({ status: false, msg: 'Access denied' });
    }

    let cart = await Cart.findOne({ where: { userId } });

    if (!cart) {
      cart = await Cart.create({ userId });
    }

    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ status: false, msg: 'Product not found' });
    }

    const cartProduct = await CartProducts.findOne({
      where: { cartId: cart.id, productId },
    });

    if (cartProduct) {
      cartProduct.quantity += quantity;
      await cartProduct.save();
    } else {
      await cart.addProduct(product, { through: { quantity } });
    }

    res.json({ status: true, msg: 'Product added to cart' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, msg: 'Server error' });
  }
});

// View the cart
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { id: userId } = req.user;

    const cart = await Cart.findOne({
      where: { userId },
      attributes: [],
      include: {
        model: Product,
        as: 'products',
        attributes: ['name', 'price', 'category'],
        through: {
          attributes: ['quantity'],
        },
      },
    });

    if (!cart) {
      return res.status(404).json({ status: false, msg: 'Cart not found' });
    }

    res.json({ status: true, cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, msg: 'Server error' });
  }
});

//update the cart
router.put('/update/:productId', authMiddleware, async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    const { id: userId } = req.user;

    const cart = await Cart.findOne({ where: { userId } });

    if (!cart) {
      return res.status(404).json({ status: false, msg: 'Cart not found' });
    }

    const cartProduct = await CartProducts.findOne({
      where: { cartId: cart.id, productId },
    });

    if (!cartProduct) {
      return res
        .status(404)
        .json({ status: false, msg: 'Product not found in cart' });
    }

    cartProduct.quantity = quantity;
    await cartProduct.save();

    res.json({ status: true, msg: 'Cart item updated', cartProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, msg: 'Server error' });
  }
});

// Remove a product from the cart
router.delete('/remove/:productId', authMiddleware, async (req, res) => {
  try {
    const { productId } = req.params;
    const { id: userId } = req.user;

    const cart = await Cart.findOne({ where: { userId } });

    if (!cart) {
      return res.status(404).json({ status: false, msg: 'Cart not found' });
    }

    const cartProduct = await CartProducts.findOne({
      where: { cartId: cart.id, productId },
    });

    if (!cartProduct) {
      return res
        .status(404)
        .json({ status: false, msg: 'Product not found in cart' });
    }

    await cartProduct.destroy();

    res.json({ status: true, msg: 'Product removed from cart' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, msg: 'Server error' });
  }
});

module.exports = router;
