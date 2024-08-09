const express = require('express');
const {
  createProductSchema,
  updateProductSchema,
} = require('../validations/product.dto');
const { Product } = require('../models');
const { ROLE } = require('../utils/constants');
const authMiddleware = require('../middleware');
const models = require('../models');
const router = express.Router();

router.post('/create', authMiddleware, async (req, res) => {
  try {
    const userInput = createProductSchema.parse(req.body);

    if (req.user.role !== ROLE.SELLER) {
      return res.status(400).json({
        status: false,
        msg: 'You need to be registered as seller to create product',
      });
    }

    await models.Product.create({
      ...userInput,
      userId: req.user.id,
    });

    res.status(201).json({ status: true, msg: 'Product created successfully' });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, msg: error.message });
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const products = await models.Product.findAll({
      where: {
        userId: req.user.id,
      },
      attributes: [
        'id',
        'name',
        'description',
        'price',
        'category',
        'discount',
      ],
    });

    res.json({ status: true, products });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, msg: error.message });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const userInput = updateProductSchema.parse(req.body);

    const product = await models.Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ status: false, msg: 'Product not found' });
    }

    if (product.userId !== req.user.id) {
      return res.status(403).json({
        status: false,
        msg: 'You can only update your own products',
      });
    }

    await product.update(userInput);

    res.json({ status: true, msg: 'Product updated successfully', product });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ status: false, msg: error.message });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const product = await models.Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ status: false, msg: 'Product not found' });
    }

    if (product.userId !== req.user.id) {
      return res.status(403).json({
        status: false,
        msg: 'You can only delete your own products',
      });
    }

    await product.destroy();

    res.json({ status: true, msg: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ status: false, msg: error.message });
  }
});

module.exports = router;
