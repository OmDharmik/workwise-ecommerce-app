const { z } = require('zod');

const createProductSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  description: z.string(),
  price: z.number().positive('Price must be a positive number'),
  category: z.string().min(1, 'Category is required'),
  discount: z.number().optional(),
});

const updateProductSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().min(10).optional(),
  price: z.number().positive().optional(),
  stock: z.number().int().nonnegative().optional(),
  category: z.string().min(1).optional(),
  imageUrl: z.string().url().optional(),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
};
