const { Router } = require('express')
const {
  createRestaurant,
  readRestaurants,
  readRestaurant,
  updateRestaurant,
  deleteRestaurant,
  createReview,
  updateReview,
  deleteReview,
} = require('../controllers/restaurant.controller')
const { protect } = require('../middlewares/user.middleware')

const router = Router()

router.post('/',protect, createRestaurant)

router.get('/', readRestaurants)

router.get('/:id', readRestaurant)

router.patch('/:id',protect, updateRestaurant)

router.delete('/:id',protect, deleteRestaurant)

router.post('/reviews/:id',protect, createReview)

router.patch('/reviews/:restaurantId/:id',protect, updateReview)

router.delete('/reviews/:restaurantId/:id',protect, deleteReview)

module.exports = {
  RestaurantRouter: router,
}
