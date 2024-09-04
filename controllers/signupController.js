const { body, validationResult } = require('express-validator');

const errNameLength = 'should have a length between 2 and 25 characters.';
const errEmailLength = 'Email should have a maximum length of 50 characters.';
const errEmail = 'Email need to be a valid email.';

const userValidation = [
  body('first_name')
    .trim()
    .blacklist('<>')
    .isLength({ min: 2, max: 25 })
    .withMessage(`First name ${errNameLength}`),
  body('last_name')
    .trim()
    .blacklist('<>')
    .isLength({ min: 2, max: 25 }.withMessage(`Last name ${errNameLength}`)),
  body('email')
    .trim()
    .blacklist('<>')
    .isLength({ max: 50 })
    .withMessage(errEmailLength)
    .isEmail()
    .withMessage(errEmail),
];

function getSignup(req, res) {
  res.render('sign-up');
}

function postSignUp(req, res) {
  res.redirect('/');
}

module.exports = { getSignup, postSignUp };
