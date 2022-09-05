//routes just tell it where to go, what methods to get from controller (logic handled in controllers by and large)
const express = require('express')
const router = express.Router()
const indexController = require('../controllers/indexController')

// const { ensureAuth, ensureGuest } = require('../middleware/auth')


router.get('/', indexController.getHomePage) //method in indexController should be named getHomePage

router.post('/q', indexController.getSearch) // q is for query



module.exports = router