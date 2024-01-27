const express = require('express')
const server = express()

const untisRouter = require('./routes/untis')

server.set('view engine', 'ejs')
server.get('/', (req, res) => {
    res.render('index')
})

server.use('/untis', untisRouter)

server.listen(3001)