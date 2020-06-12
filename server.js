//for env variables
require('dotenv').config()

const express = require('express')
const indexRouter = require('./routes/index')
const cors = require('cors')

const app = express()

//view engine
app.set("views", __dirname + '/views')
app.set("view engine", 'jade')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false}))

console.log(process.env.DATABASE_URL)

//Mongoose setup
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log("Connected to mongoose"))

//Routers
app.use('/', indexRouter)


app.listen(3001, () => {
  console.log('Running on localhost:3001')
})
