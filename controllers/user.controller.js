const User = require('../models/user.model')
const catchAsync = require('../utils/catchAsync')
const bcrypt = require('bcryptjs')
const generateJWT = require('../utils/jwt')
const AppError = require('../utils/appError')

exports.registerUser = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body

  const salt = await bcrypt.genSalt(10)
  const secretPassword = await bcrypt.hash(password, salt)

  const user = await User.create({
    name,
    email,
    password: secretPassword,
  })

  const token = await generateJWT(user.id)

  return res.status(201).json({
    status: 'success',
    message: 'User created successfully',
    token,
  })
})

exports.loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body

  const user = await User.findOne({
    where: {
      email,
      password,
    },
  })

  if (!user) {
    return next(new AppError('The user could not be found', 404))
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401))
  }

  const token = await generateJWT(user.id)

  return res.json({
    status: 'success',
    message: 'Welcome to the academlo meals',
    token,
    user: {
      uid: user.id,
      name: user.name,
    },
  })
})

exports.updateUser = async (req, res) => {
  try {

    const { name, email } = req.body
    const { user } = req

    await user.update({ name, email })

    return res.status(200).json({
      status: "success",
      message: "User updated successfully",
    })
  } catch {
    return res.status(500).json({
      status: "fail",
      message: "Something went very wrong! 🧨",
    })
  }
}

exports.deleteUser = async (req, res) => {
  try {

    const { user } = req

    await user.update({ status: "disabled" })

    res.status(200).json({
      status: "success",
      message: "User deleted successfully",
    })
  } catch {
    return res.status(500).json({
      status: "fail",
      message: "Something went very wrong! 🧨",
    })
  }
}

exports.renewToken = catchAsync(async (req, res, next) => {
  const { id } = req.sessionUser

  const token = await generateJWT(id)

  const user = await User.findOne({
    where: {
      status: true,
      id,
    },
  })

  return res.status(200).json({
    status: 'success',
    token,
    user: {
      uid: user.id,
      user: user.name,
    },
  })
})
