const schemas = require('../models/schemas.js')
const bcrypt = require('bcrypt') //this is obscuring passwords i.e. not storing plaintext in DB

//getLoginPage, getSignupPage, getLogout, postLogin, postSignup

exports.getLoginPage = (req, res) => {
  res.render('login', {title: 'Login', loggedIn: false, error: null })
}

exports.getSignupPage = (req, res) => {
  res.render('new-acct', {title: 'New Account', loggedIn: false, error: null })
}

exports.getLogout = (req, res) => {
  req.session.destroy() //destroys session
  res.redirect('/')
}


