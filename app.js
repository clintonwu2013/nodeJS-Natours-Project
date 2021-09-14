const express = require('express');
const fs = require('fs');
const app = express();
const port = 8080;
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, "utf-8"));

app.get('/', (req, res) => {
    res.status(200).json({ message: "hello~~~" })
})

app.post('/', (req, res) => {
    res.status(200).json({ message: "post hello" })
})

app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: "success",
        result: tours.length,
        data: {
            tours: tours
        }
    })
})

app.listen(port, () => {
    console.log(`App is running on port ${port}`)
})
