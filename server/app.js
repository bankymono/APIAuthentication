const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('./routes/cors')
const http = require('http')
const https = require('https')
const fs = require('fs')

const usersRouter = require('./routes/usersRoutes')
const { normalize } = require('path')

mongoose.connect('mongodb://localhost/ApiAuthentication_db',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const app = express()

//app.use(cors.corsWithOptions)

//Middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())

//Routes
app.use('/users',usersRouter)

//Start server
const PORT = process.env.PORT || 5000

app.set('port', PORT)
app.set('secPort', PORT+443)
//app.listen(PORT)

const server = http.createServer(app)

server.listen(PORT)

const options = {
    key:fs.readFileSync(__dirname + '/ssl_files/private.key'),
    cert:fs.readFileSync(__dirname+'/ssl_files/certificate.pem')
}

const secureServer = https.createServer(options,app)
secureServer.listen(app.get('secPort'),()=>{
    console.log(`secure Server listening on ${app.get('secPort')}`)
})

console.log(`Server listening on ${PORT}`)