const express = require('express')
const fs = require('fs')
const app = express()
const port = 8080
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8'),
)

app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).json({ message: 'hello~~~' })
})

app.post('/', (req, res) => {
  res.status(200).json({ message: 'post hello' })
})

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: {
      tours: tours,
    },
  })
})

app.post('/api/v1/tours', (req, res) => {
  //console.log(req.body);
  const newId = tours[tours.length - 1].id + 1
  const newTour = Object.assign({ id: newId }, req.body)
  tours.push(newTour)

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      console.log(err)
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      })
    },
  )
  //res.send("done");
})

app.listen(port, () => {
  console.log(`App is running on port ${port}`)
})
