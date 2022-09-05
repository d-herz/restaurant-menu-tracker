//this is like our 'auth.js' file

const schemas = require('../models/schemas.js')
const bcrypt = require('bcrypt') //this is obscuring passwords i.e. not storing plaintext in DB
const { sensitiveHeaders } = require('http2')

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

//async because talking to DB
exports.postLogin = async ( req, res) => {
  let email = req.body.emailInput //from form
  let pass = req.body.pwdInput
  let loginSuccess = false
  let session = req.session
  session.loggedIn = false
  
  let users = schemas.users //tells method which schema should be using
  let qry = {email: email}

  if( email !== '' && pass !== '' ){ //if email value AND password value not empty
    let usersResult = await users.findOne(qry)
    .then( async(data) => {
      if (data){
        let passResult = await bcrypt.compare(pass, data.pwd) //built-in bcrypt method that compares hash-passwords against the raw password
        .then( (isMatch) => {
          if(isMatch){
            session.loggedIn = true
            loginSuccess = true
          }
        })
      }
    })
  }
  if (loginSuccess === true){
    res.redirect('/')
  } else {
    res.render('login', {title:'Login', loggedIn:false, error:'Invalid Login!'});
  }
}

//async again because talking to DB
//for making a new user, first checks if email exists
exports.postSignup = async ( req, res) => {
  let email = req.body.emailInput //from form
  let pass = req.body.pwdInput

  if( email !== '' && pass !== '' ){ 
    let users = schemas.users //user schema
    let qry = {email: email}

    let userSearch = await users.findOne(qry) //check if user exists (check against email)
    .then( async(data) => {
      if(!data){ //if no matches of email
        let saltRounds = 10;
        let passSalt = await bcrypt.genSalt(saltRounds, async(err, salt) => {
          let passHash = await bcrypt.hash(pass, salt, async(err, hash) => {
            let acct = {email:email, pwd:hash, level:'admin'};
            let newUser = new schemas.users(acct); //create new user
            let saveUser = await newUser.save(); //save new user
          })
        })

      }
    });

    res.render('login', {title:'Login', loggedIn:false, error:'Please login with your new account'});

  } else {
    res.render('new-acct', {title:'New Account', loggedIn:false, error:'All fields are required. Please check and try again.'});
  }
}