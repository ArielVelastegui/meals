const Meal = require('../models/meals.model')
const Order = require('../models/orders.model')
const catchAsync = require('../utils/catchAsync')

exports.createOrder = catchAsync(async (req, res, next) => {
  const { mealId, userId, quantity, status } = req.body


  const meal = Meal.findOne({
    where:{
      id: mealId,
    }
  })

  const totalPrice = meal.price * quantity

  const order = await Order.create({
    totalPrice,
    quantity,
    mealId,
    userId,
    status,
  })

  return res.status(201).json({
    status: 'success',
    message: 'Order created successfully',
    totalPrice,
    mealId,
    quantity,
  })
})

exports.readOrders = catchAsync(async (req, res) => {
    const orders = await Order.findAll({
      attributes: ['totalPrice', 'mealId', 'userId', 'quantity', 'status'],
      where: {
        status: 'active',
      },
    })
  
    return res.status(200).json({
      status: 'success',
      message: 'Orders found',
      orders,
    })
  })


  exports.updateOrder = catchAsync(async (req, res) => {
    const { id } = req.params

  
    const order = await Order.findOne({
      where: {
        id,
        status: 'active',
      },
    })
  
    if (!order) {
      return res.status(404).json({
        status: 'error',
        message: 'Order not found',
      })
    }
  
    await order.update( { status: 'completed' })
  
    return res.status(200).json({
      status: 'success',
      message: 'Order completed successfully',
    })
  })

  exports.deleteOrder = catchAsync(async (req, res) => {
    const { id } = req.params
  
    const order = await Order.findOne({
      where: {
        id,
        status: 'active',
      },
    })
  
    if (!order) {
      return res.status(404).json({
        status: 'error',
        message: 'Order not found',
      })
    }
  
    await order.update({ status: 'cancelled' })
  
    res.status(200).json({
      status: 'success',
      message: 'Order cancelled successfully',
    })
  })