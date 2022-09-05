const schemas = require('../models/schemas.js') //this is importing the 'mySchemas' object from the schema file

//getHomePage
//getSearch

module.exports = {
  getHomePage: async (req, res) => {
    let menu = schemas.menu  //going inside the (imported) schemas object, and grabbing the menu propert
    let session = req.session

    let menuResult = await menu.find({})
    .then((menuData) => {
      res.render('index', {title: 'Menu Tracker', data: menuData, search: '', loggedIn: session.loggedIn})
    })
  },
  getSearch:
}