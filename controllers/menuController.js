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

        res.render('menu', {title:'Edit Menu', item:itemData, loggedIn:session.loggedIn, error:err});
      
      })

    }

  },

  deleteMenu: async (req, res) => { //talking to DB again so need async
    let session = req.session

    if(!session.loggedIn){ //if NOT logged in, redirect back to login page
      res.redirect('/login')
    } else {
      let menu = schemas.menu //menu schema from model
      let menuId = req.params.id

      let qry = {_id:menuId}
      let deleteResult = await menu.deleteOne(qry)
      res.redirect('/')

    }

  },

  saveMenu: async (req, res) => { //async for DB communication
    let session = req.session

    if(!session.loggedIn){ //if NOT logged in, (same as deleteMenu)
      res.redirect('/login')
    } else {
      let menuId = req.body.menuId
      let menuName = req.body.menuName
      let menuIcon = req.body.menuIcon
      let menuUrl = req.body.menuUrl
      let menu = schemas.menu

      let qry = {_id:menuId}

      let saveData = {
        $set: {
          name: menuName,
          icon: menuIcon,
          menuUrl: menuUrl
        }
      }

      let updateResult = await menu.updateOne(qry, saveData)
      res.redirect('/')
    }
  },

  newMenu: async (req, res) => {
    let session = req.session

    if(!session.loggedIn){ //if NOT logged in, redirect back to login page
      res.redirect('/login')

    } else {

      let menuId = req.body.menuId
      let menuName = req.body.menuName
      let menuIcon = req.body.menuIcon
      let menuUrl = req.body.menuUrl
      let menu = schemas.menu

      let qry = {name: menuName}

      let searchResult = await menu.findOne(qry) //checking if restuarant already exists
      .then( async (menuData) => {
        if (!menuData) { // if NO match, then ok to add new menu
          let newMenu = new schemas.menu({
              name: menuName,
              icon: menuIcon,
              menuUrl: menuUrl
          });

          let saveMenu = await newMenu.save();
      }

      });
      res.redirect('/')
    }
  }
}



