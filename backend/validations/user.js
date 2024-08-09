const { z } = require('zod');
const { ROLE } = require('../utils/constants');

const createUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  role: z.enum(Object.values(ROLE)),
});

const userLoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

module.exports = {
  createUserSchema,
  userLoginSchema,
};
