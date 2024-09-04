const { body, validationResult } = require('express-validator');
const db = require('../db/queries');
const bcrypt = require('bcrypt');
const customError = require('../modules/error');

const errNameLength = 'should have a length between 2 and 25 characters.';
const errEmailLength = 'Email should have a maximum length of 50 characters.';
const errEmail = 'Email need to be a valid email.';
const pwdMismatch = "Passwords don't match.";

const userValidation = [
  body('first_name')
    .trim()
    .blacklist('<>')
    .isLength({ min: 2, max: 25 })
    .withMessage(`First name ${errNameLength}`),
  body('last_name')
    .trim()
    .blacklist('<>')
    .isLength({ min: 2, max: 25 })
    .withMessage(`Last name ${errNameLength}`),
  body('email')
    .trim()
    .blacklist('<>')
    .isLength({ max: 50 })
    .withMessage(errEmailLength)
    .isEmail()
    .withMessage(errEmail)
    .custom(async (email) => {
      const user = await db.getUser(email);
      if (user) {
        throw new Error('This Email is already taken.');
      }
    }),
  body('password').custom((password, { req }) => {
    if (password !== req.body.confirm_password) {
      throw new Error(pwdMismatch);
    } else {
      return password;
    }
  }),
];

function getSignup(req, res) {
  res.render('sign-up');
}

const postSignUp = [
  userValidation,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.render('sign-up', { errors: errors.array() });
    }
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (err) {
        next(
          new customError(
            'Error when validating the password.',
            500,
            'Server Error'
          )
        );
        return;
      }
      await db.insertUser({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: hashedPassword,
      });
    });
    res.redirect('/');
  },
];

module.exports = { getSignup, postSignUp };
