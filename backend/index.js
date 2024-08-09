const express = require('express');
const dotenv = require('dotenv');
const { sequelize } = require('./db/index');
const userRouter = require('./routes/user');

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/user', userRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
