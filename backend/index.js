const express = require('express');
const dotenv = require('dotenv');
const { sequelize } = require('./db/index');
const userRouter = require('./routes/user');
const productRouter = require('./routes/product');
const cartRouter = require('./routes/cart');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
