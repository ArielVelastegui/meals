const { Router } = require('express')
const {
  createOrder,
  readOrders,
  updateOrder,
  deleteOrder,
} = require('../controllers/order.controller')
const { protect } = require('../middlewares/user.middleware')

const router = Router()

router.post('/', protect, createOrder)

router.get('/me',protect, readOrders)

router.patch('/:id',protect, updateOrder)

router.delete('/:id',protect, deleteOrder)

module.exports = {
  orderRouter: router,
}
