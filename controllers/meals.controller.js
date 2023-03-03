const Meal = require('../models/meals.model')
const Restaurant = require('../models/restaurants.model')
const catchAsync = require('../utils/catchAsync')

exports.createMeal = catchAsync(async (req, res, next) => {
  const { name, price, status } = req.body
  const { restaurantId } = req.params

  const meal = await Meal.create({
    name,
    price,
    restaurantId,
    status,
  })

  return res.status(201).json({
    status: 'success',
    message: 'Meal created successfully',
    meal,
  })
})

exports.readMeals = catchAsync(async (req, res) => {
  const restaurantId = Meal.getAttributes('restaurantId')

  const meals = await Meal.findAll({
    attributes: ['name', 'price', 'restaurantId', 'status'],
    where: {
      status: 'active',
    },
  })

  const restaurant = await Restaurant.findOne({
    where: {
      id: restaurantId,
    },
  })

  return res.status(200).json({
    status: 'success',
    message: 'Meals found',
    meals,
    restaurant,
  })
})

exports.readMeal = catchAsync(async (req, res) => {
  const restaurantId = Meal.getAttributes('restaurantId')

  const { id } = req.params

  const restaurant = await Restaurant.findOne({
    where: {
      id: restaurantId,
    },
  })

  const meal = await Meal.findOne({
    attributes: ['name', 'price', 'restaurantId', 'status'],
    where: {
      id,
      status: 'active',
    },
  })

  
  return res.status(200).json({
    status: 'success',
    message: 'Meal Found',
    meal,
    restaurant
  })
})

exports.updateMeal = catchAsync(async (req, res) => {
  const { id } = req.params
  const { name, price } = req.body

  const meal = await Meal.findOne({
    where: {
      id,
      status: 'active',
    },
  })

  if (!meal) {
    return res.status(404).json({
      status: 'error',
      message: 'Meal not found',
    })
  }

  await meal.update({ name, price })

  return res.status(200).json({
    status: 'success',
    message: 'Meal updated successfully',
  })
})

exports.deleteMeal = catchAsync(async (req, res) => {
  const { id } = req.params

  const meal = await Meal.findOne({
    where: {
      id,
      status: 'active',
    },
  })

  if (!meal) {
    return res.status(404).json({
      status: 'error',
      message: 'Meal not found',
    })
  }

  await meal.update({ status: 'disabled' })

  res.status(200).json({
    status: 'success',
    message: 'Meal deleted successfully',
  })
})
