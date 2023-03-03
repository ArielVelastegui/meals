const { Router } = require('express')
const {
  createMeal,
  readMeals,
  readMeal,
  updateMeal,
  deleteMeal,
} = require('../controllers/meals.controller')
const { protect } = require('../middlewares/user.middleware')

const router = Router()

router.post('/:id',protect, createMeal)

router.get('/',protect, readMeals)

router.get('/:id', readMeal)

router.patch('/:id', updateMeal)

router.delete('/:id',protect, deleteMeal)

module.exports = {
  mealRouter: router,
}
