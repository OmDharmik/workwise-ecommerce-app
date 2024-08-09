const express = require('express');
const dotenv = require('dotenv');
const { sequelize } = require('./db/index');
const userRouter = require('./routes/user');
const productRouter = require('./routes/product');

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
