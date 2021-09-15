const express = require('express');

const app = express();
const morgan = require("morgan");

const tourRouter = require("./routes/tourRoutes")
const userRouter = require("./routes/userRoutes")

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use((req, res, next) => {
  console.log("hello from the middleware");
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
})

app.use(express.static(`${__dirname}/public`))
app.get('/', (req, res) => {
  res.status(200).json({ message: 'hello~~~' })
})

app.post('/', (req, res) => {
  res.status(200).json({ message: 'post hello' })
})




app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;

