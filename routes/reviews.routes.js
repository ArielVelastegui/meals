const { Router } = require('express')

const router = Router()

router.post('/', createOrder)

router.get('/me', readOrders)

router.patch('/:id', updateOrder)

router.delete('/:id', deleteOrder)

module.exports = {
  reviewRouter: router,
}
