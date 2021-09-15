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

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: {
      tours: tours,
    },
  })
}

const createTour = (req, res) => {
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
}

const modifyTour = (req, res) => {
  const id = req.params.id * 1;
  if (id > tours.length) {
    res.status(404).json({
      status: 'fail',
      message: 'invalid id',
    })
    return
  }

  res.status(200).json({
    status: "success",
    data: {
      tour: "<updated tour here>"
    }
  })
};

const getTour = (req, res) => {
  console.log(req.params)
  const id = req.params.id * 1
  const tour = tours.find((el) => el.id === id)
  if (!tour) {
    res.status(404).json({
      status: 'fail',
      message: 'invalid id',
    })
    return
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: tour,
    },
  })
}

const deleteTour = (req, res) => {
  const id = req.params.id * 1;
  if (id > tours.length) {
    res.status(404).json({
      status: 'fail',
      message: 'invalid id',
    })
    return
  }

  res.status(204).json({
    status: "success",
    data: null
  })
}
//app.get('/api/v1/tours', getAllTours)
//app.post('/api/v1/tours', createTour);
//app.get('/api/v1/tours/:id', getTour)
//app.patch("/api/v1/tours/:id", modifyTour)
//app.delete("/api/v1/tours/:id", deleteTour)

app.route("/api/v1/tours").get(getAllTours).post(createTour);
app.route("/api/v1/tours/:id").get(getTour).patch(modifyTour).delete(deleteTour);

app.listen(port, () => {
  console.log(`App is running on port ${port}`)
})
