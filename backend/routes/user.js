const { createUserSchema, userLoginSchema } = require('../validations/user');
const { hashPassword } = require('../utils/passwordHash');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const models = require('../models');
const dotenv = require('dotenv');
dotenv.config();

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const userInput = createUserSchema.parse(req.body);
    const hashedPassword = await hashPassword(userInput.password);

    const newUser = await models.User.create({
      name: userInput.name,
      email: userInput.email,
      password: hashedPassword,
      role: userInput.role,
    });

    const token = jwt.sign(
      { id: newUser.id, role: newUser.role },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );

    res.status(201).json({ status: true, token });
  } catch (error) {
    res.status(400).json({ status: false, msg: error });
  }
});

router.post('/login', async (req, res) => {
  try {
    const userInput = userLoginSchema.parse(req.body);

    const user = await models.User.findOne({
      where: { email: userInput.email },
    });
    if (!user) {
      return res.status(400).json({ status: false, msg: 'User not found' });
    }

    const isPasswordValid = await comparePassword(
      userInput.password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(400).json({ status: false, msg: 'Invalid password' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );

    res.json({ status: true, token });
  } catch (error) {
    const errorMsg = handleErrors(error);
    res.status(400).json({ status: false, msg: errorMsg });
  }
});

router.get('/profile', async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await models.User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    res.send({ status: true, user });
  } catch (error) {
    res.status(400).json({ status: false, msg: error });
  }
});

router.put('/profile', async (req, res) => {
  try {
    const userId = req.user.id;
    const userInput = createUserSchema.parse(req.body);
    const user = await models.User.findByIdAndUpdate(
      userId,
      {
        name: userInput.name,
        email: userInput.email,
        role: userInput.role,
      },
      { new: true }
    );
    if (!user) {
      throw new Error('User not found');
    }
    res.send({ status: true, user });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, msg: error });
  }
});

module.exports = router;
