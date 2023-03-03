const Restaurant = require('../models/restaurants.model')
const Review = require('../models/reviews.model')
const catchAsync = require('../utils/catchAsync')

exports.createRestaurant = catchAsync(async (req, res, next) => {
  const { name, address, rating, status } = req.body

  const restaurant = await Restaurant.create({
    name,
    address,
    rating,
    status,
  })

  return res.status(201).json({
    status: 'success',
    message: 'Restaurant created successfully',
    restaurant,
  })
})

exports.readRestaurants = catchAsync(async (req, res) => {
  const restaurants = await Restaurant.findAll({
    attributes: ['id', 'name', 'address', 'rating', 'status'],
    where: {
      status: 'active',
    },
  })

  return res.status(200).json({
    status: 'success',
    message: 'Restaurants found',
    restaurants,
  })
})

exports.readRestaurant = catchAsync(async (req, res) => {
  const { id } = req.params

  const restaurant = await Restaurant.findOne({
    attributes: ['id', 'name', 'address', 'rating', 'status'],
    where: {
      id,
      status: 'active',
    },
  })

  return res.status(200).json({
    status: 'success',
    message: 'Restaurant Found',
    restaurant,
  })
})

exports.updateRestaurant = catchAsync(async (req, res) => {
  const { id } = req.params
  const { name, address } = req.body

  const restaurant = await Restaurant.findOne({
    where: {
      id,
      status: 'active',
    },
  })

  if (!restaurant) {
    return res.status(404).json({
      status: 'error',
      message: 'restaurant not found',
    })
  }

  await restaurant.update({ name, address })

  return res.status(200).json({
    status: 'success',
    message: 'Restaurant updated successfully',
  })
})

exports.deleteRestaurant = catchAsync(async (req, res) => {
  const { id } = req.params

  const restaurant = await Restaurant.findOne({
    where: {
      id,
      status: 'active',
    },
  })

  if (!restaurant) {
    return res.status(404).json({
      status: 'error',
      message: 'restaurant not found',
    })
  }

  await restaurant.update({ status: 'disabled' })

  res.status(200).json({
    status: 'success',
    message: 'Restaurant deleted successfully',
  })
})

exports.createReview = catchAsync(async (req, res, next) => {
  const { name, address, rating, status } = req.body

  const review = await Review.create({
    name,
    address,
    rating,
    status,
  })

  return res.status(201).json({
    status: 'success',
    message: 'Review created successfully',
    review,
  })
})

exports.updateReview = catchAsync(async (req, res) => {
  const { id } = req.params
  const { comment, rating } = req.body

  const review = await Review.findOne({
    where: {
      id,
      status: 'active',
    },
  })

  if (!review) {
    return res.status(404).json({
      status: 'error',
      message: 'Review not found',
    })
  }

  await review.update({ comment, rating })

  return res.status(200).json({
    status: 'success',
    message: 'Review updated successfully',
    review,
  })
})

exports.deleteReview = catchAsync(async (req, res) => {
  const { id } = req.params

  const review = await Review.findOne({
    where: {
      id,
      status: 'active',
    },
  })

  if (!review) {
    return res.status(404).json({
      status: 'error',
      message: 'Review not found',
    })
  }

  await review.update({ status: 'disabled' })

  res.status(200).json({
    status: 'success',
    message: 'Review deleted successfully',
  })
})
