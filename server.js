//Imports
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const flash = require('express-flash')
const logger = require('morgan')
//MongoDB connection
const connectDB = require('./config/database')
//Route Imports
const indexRouter = require('./routes/index')
const menuRouter = require('./routes/menu')
const loginRouter = require('./routes/login')

// Setup config
require('dotenv').config({path: './config/.env'})
// Passport config
// require('./config/passport')(passport)

connectDB() //imported from database,js

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logger('dev')) //something from morgan (required above) which logs information about requests and statuses etc..

// Sessions
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({ mongoUrl: process.env.DB_STRING}), //check this in group project
    })
  )
  
// Passport middleware
// app.use(passport.initialize())
// app.use(passport.session())


//Setup Routes
app.use(flash())
app.use('/', indexRouter)
app.use('/menu', menuRouter)
app.use('/login', loginRouter)

// app.use('/', mainRoutes)
// app.use('/todos', todoRoutes)
 
app.listen(process.env.PORT, ()=>{
    console.log('Server is running, HOW BOW DAH')
}) 