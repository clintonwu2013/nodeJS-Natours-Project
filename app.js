const express = require('express');

const app = express();

const port = 8080;

app.get('/', (req, res) => {
    res.status(200).json({ message: "hello~~~" })
})

app.post('/', (req, res) => {
    res.status(200).json({ message: "post hello" })
})
app.listen(port, () => {
    console.log(`App is running on port ${port}`)
})
