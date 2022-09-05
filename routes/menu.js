const express = require('express')
const router = express.Router()
//add controllers
// const { ensureAuth, ensureGuest } = require('../middleware/auth')


router.get('/', menuController.getMenuIndexPage) //method in menuController should be named getMenuIndex

router.get('/:id', menuController.editMenu) //need specific id of the database item (menu in this case)

router.get('/delete/:id', menuController.deleteMenu)

router.post('/save', menuController.saveMenu)

router.post('/new', menuController.newMenu)


module.exports = router