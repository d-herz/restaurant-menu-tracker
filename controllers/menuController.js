const schemas = require('../models/schemas.js')

//getMenuIndexPage, editMenu, deleteMenu, saveMenu, newMenu

module.exports = {
  getMenuIndexPage:  (req, res) => {
    res.render('index', {title: 'Menu Items'})
  },
  editMenu: async (req, res) => { //async because talking to DB
    let session = req.session

    if(!session.loggedIn){ //if NOT logged in
      res.render('menu', {title: 'Edit', loggedIn: false, error: 'Invalid Request' })
    } else {
      let id = req.params.id
      let err = ''

      let menu = schemas.menu //menu schema from model
      
      let qry = {_id:id}

      let itemResult = await menu.find(qry)
      .then( (itemData) => {
        if (itemData === null) {
          err = "Invalid ID"
        }

        res.render('menu', {title: 'Edit Menu', loggedIn: session, error: err })
      
      })

    }

  },



}