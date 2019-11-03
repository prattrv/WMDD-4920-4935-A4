const express = require('express')
const app = express()

app.use(express.static('public'))
app.use(express.json())

const router = require('./routes/index.js')
app.use('/api', router)

app.listen(8080, () => {
    console.log('Listening')
})