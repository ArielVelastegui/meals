const { validationResult } = require('express-validator');
const { check } = require('express-validator');
/* A middleware function that checks if the request body has any errors. If there are errors, it
returns a 400 status code with the errors. If there are no errors, it calls the next middleware
function. */
exports.validateFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }

  next();
};

exports.createUserValidations = [
  check('name', 'the name is required').not().isEmpty(),
  check('email', 'the email is required').not().isEmpty(),
  check('password', 'the password is required').not().isEmpty(),
];

exports.loginUserValidation = [
  check('email', 'the email is required').not().isEmpty(),
  check('password', 'the password is required').not().isEmpty(),
];



