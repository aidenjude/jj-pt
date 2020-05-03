import express from 'express'
import compression from 'compression' // compresses requests
import bodyParser from 'body-parser'
import lusca from 'lusca'
import path from 'path'
import mongoose from 'mongoose'
import passport from 'passport'
import bluebird from 'bluebird'
import { mongoConnection, appConfig } from '../config/app.config'
const resourceApi = require('./routes/resource.api')

// API keys and Passport configuration
import * as passportConfig from '../config/passport.config'

// Create Express server
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// Controllers (route handlers)
app.use(resourceApi)
// Connect to MongoDB
mongoose.Promise = bluebird

mongoose
  .connect(mongoConnection.dbURL, mongoConnection.options)
  .then((success: any) => {
    /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
    console.log(`succesfully connected to mongoDB: ${success}`)
  })
  .catch((err: any) => {
    console.log(
      'MongoDB connection error. Please make sure MongoDB is running. ' + err
    )
    process.exit(1)
  })

// Express configuration
app.set('port', process.env.PORT || 3000)
app.use(compression())

app.use(passport.initialize())
app.use(passport.session())
app.use(lusca.xframe('SAMEORIGIN'))
app.use(lusca.xssProtection(true))
// app.use((req, res, next) => {
//   res.locals.user = req.user
//   next()
// })
// app.use((req, res, next) => {
//   // After successful login, redirect back to the intended page
//   if (
//     !req.user &&
//     req.path !== '/login' &&
//     req.path !== '/signup' &&
//     !req.path.match(/^\/auth/) &&
//     !req.path.match(/\./)
//   ) {
//     req.session.returnTo = req.path
//   } else if (req.user && req.path == '/account') {
//     req.session.returnTo = req.path
//   }
//   next()
// })

app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }))
export default app
