const express = require('express')
const cors = require('cors')
const { db } = require('../database/db')
const { userRouter } = require('../routes/user.routes')
const AppError = require('../utils/appError')
const globalErrorHandler = require('../controllers/error.controller')
const { orderRouter } = require('../routes/orders.routes')
const { mealRouter } = require('../routes/meals.routes')
const { RestaurantRouter } = require('../routes/restaurants.routes')

class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT

    //Path Routes
    this.paths = {
      user: '/api/v1/users',
      restaurant: '/api/v1/restaurants',
      meal: '/api/v1/meals',
      order: '/api/v1/orders',
    }

    //Connect to db
    this.database()

    //Middlewares
    this.middlewares()

    //Routes
    this.routes()
  }

  middlewares() {
    this.app.use(cors())
    this.app.use(express.json())
    this.app.use(express.static('public'))
  }

  routes() {
    this.app.use(this.paths.user, userRouter)
    this.app.use(this.paths.restaurant, RestaurantRouter)
    this.app.use(this.paths.meal, mealRouter)
    this.app.use(this.paths.order, orderRouter)

    this.app.all('*', (req, res, next) => {
      return next(
        new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
      )
    })

    this.app.use(globalErrorHandler)
  }

  database() {
    db.authenticate()
      .then(() => console.log('Database authenticated'))
      .catch(err => console.log(err))

    //relations

    db.sync()
      .then(() => console.log('Database synced'))
      .catch(err => console.log(err))
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server Running On Port', this.port)
    })
  }
}

module.exports = Server
