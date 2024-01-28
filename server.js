const express = require('express')
const server = express()
const path = require('path')

server.use(express.static(path.join('public')))

const untisRouter = require('./routes/untis')

server.set('view engine', 'ejs')

server.use('/untis', untisRouter)

server.listen(3001)