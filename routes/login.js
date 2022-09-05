const express = require('express')
const router = express.Router()
//add controllers
// const { ensureAuth, ensureGuest } = require('../middleware/auth')


router.get('/', loginController.getLoginPage) // just need a '/' since we are already in the login controller..?
router.get('/new-acct', loginController.getSignupPage)

router.get('/logout', loginController.getLogout)

router.post('/', loginController.postLogin)
router.post('/new', loginController.postSignup) //should path be /new-acct?

module.exports = router