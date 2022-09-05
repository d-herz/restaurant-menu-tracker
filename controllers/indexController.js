const schemas = require('../models/schemas.js') //this is importing the 'mySchemas' object from the schema file

//getHomePage
//getSearch

module.exports = {
  getHomePage: async (req, res) => {
    let menu = schemas.menu  //going inside the (imported) schemas object, and grabbing the menu propert
    let session = req.session //session data

    let menuResult = await menu.find({})
    .then((menuData) => {
      res.render('index', {title: 'Menu Tracker', data: menuData, search: '', loggedIn: session.loggedIn}) //so these are properties for the page since we are using EJS
    })
  },

  getSearch: async (req, res) => {
    let menu = schemas.menu  
    let session = req.session

    let q = req.body.searchInput
    let menuData = null

    let qry = {name: {$regex: '^' + q, $options: 'i'}}  //'^' means only look for things that START with query and i is 'ignore casing' according to chat

    if( q != null){ //if q var NOT null
      let menuResult = await menu.find(qry) //hey mongoose, in menu collecion in DB please find anything that matches our qry (starts with and ignores case)
      .then( (data) => {
        menuData = data //assign data returned to this variable
      })
    } else {
      q = 'Search'
      let menuResult = await menu.find({}) 
      .then( (data) => {
        menuData = data 
      })
    }
    res.render('index', {title: 'Menu Tracker', data: menuData, search: q, loggedIn: session.loggedIn})
  }
}