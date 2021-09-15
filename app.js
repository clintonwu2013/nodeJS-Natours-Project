const express = require('express');

const app = express();
const morgan = require("morgan");
const port = 8080;

const tourRouter = require("./routes/tourRoutes")
const userRouter = require("./routes/userRoutes")


app.use(morgan('dev'));
app.use(express.json());
app.use((req, res, next) => {
  console.log("hello from the middleware");
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
})

app.get('/', (req, res) => {
  res.status(200).json({ message: 'hello~~~' })
})

app.post('/', (req, res) => {
  res.status(200).json({ message: 'post hello' })
})




app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);


app.listen(port, () => {
  console.log(`App is running on port ${port}`)
})
