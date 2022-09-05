const mongoose = require('mongoose');
const { stringify } = require('querystring');
const schema = mongoose.Schema;

let menuSchema = new mongoose.Schema({
  name: {type:String, require: true},
  icon: {type:String, require: true},
  menuUrl: {type:String, require: true},
  entryDate: {type:Date, default:Date.now}
})

let userSchema = new mongoose.Schema({
  email: {type:String, require: true},
  pwd: {type:String, require: true},
  entryDate: {type:Date, default:Date.now}
})

let menu = mongoose.model('menu', menuSchema, 'menu'); //1st param = name we give, 2nd = schema we are referencing, 3rd (optional) = specific collection in DB
let users = mongoose.model('users', userSchema, 'users');
let mySchemas = {
  'menu': menu, 
  'users': users
};


module.exports = mySchemas; //exporting the 'mySchemas' object, which will be imported into the 'index' controller and set to a variable