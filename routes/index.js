const express = require('express')
const router = express.Router()
//add controllers
// const { ensureAuth, ensureGuest } = require('../middleware/auth')


router.get('/', indexController.getHomePage)



module.exports = router