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

exports.checkNameAndPrice = (req, res, next) => {
    console.log("hello from check tour name and price");
    console.log(req.body);
    let name = req.body.name;
    let price = req.body.price;
    if (!name || !price) {
        return res.status(400).json({
            status: "fail",
            message: "name or price is missing"
        });
    }
    next();
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

    res.status(200).json({
        status: "success",
        data: {
            tour: "<updated tour here>"
        }
    })
};

exports.getTour = (req, res) => {
    //console.log(req.params)
    console.log("arrive at getTour!!!!")
    const tour = tours.find((el) => el.id === req.params.id * 1)
    res.status(200).json({
        status: 'success',
        data: {
            tour: tour,
        },
    })
}

exports.checkID = (req, res, next, val) => {
    console.log('checking id....')
    console.log('id=', val)
    const tour = tours.find((el) => el.id === val * 1)
    if (!tour) {
        console.log('id is not valid return!!!')
        return res.status(404).json({
            status: 'fail',
            message: 'invalid id',
        })
    }
    console.log('id is OK, next() !!!')
    next();
}

exports.deleteTour = (req, res) => {


    res.status(204).json({
        status: "success",
        data: null
    })
}