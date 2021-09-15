const fs = require('fs');
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8'),
)

exports.getAllTours = (req, res) => {
    console.log(req.requestTime);
    res.status(200).json({
        status: 'success',
        requestTime: req.requestTime,
        result: tours.length,
        data: {
            tours: tours,
        },
    })
}

exports.createTour = (req, res) => {
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

exports.modifyTour = (req, res) => {
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

exports.getTour = (req, res) => {
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

exports.deleteTour = (req, res) => {
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