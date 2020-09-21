const express = require('express')
const app = express()
const port = 3020
var cors = require('cors')

app.use(cors())
let uploadImage = require('./upload');
app.use('/add-image', uploadImage);

app.listen(port, () => console.log(`Upload server listening on port ${port}!`))