const { Router } = require('express')
const {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
} = require('../controllers/user.controller')
const {
  protect,
  protectAccountOwner,
} = require('../middlewares/user.middleware')
const {
  createUserValidations,
  loginUserValidation,
  validateFields,
} = require('../middlewares/validations.middleware')

const router = Router()

router.post('/signup', createUserValidations, validateFields, registerUser)

router.post('/login', loginUserValidation, validateFields, loginUser)

router.patch('/:id',protect,protectAccountOwner, updateUser)

router.delete('/:id',protect,protectAccountOwner, deleteUser)


//esas no me las se  :( //
router.get('/orders',protect, )

router.get('/orders/:id',protect, )

module.exports = {
  userRouter: router,
}
