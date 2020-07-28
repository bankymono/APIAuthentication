const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const usersRouter = require('./routes/usersRoutes')

mongoose.connect('mongodb://localhost/ApiAuthentication_db',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const app = express()

//Middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())

//Routes
app.use('/users',usersRouter)

//Start server
const PORT = process.env.PORT || 5000

app.listen(PORT)

console.log(`Server listening on ${PORT}`)