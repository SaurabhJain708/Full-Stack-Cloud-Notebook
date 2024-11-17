const express = require('express')
const userrouter = express.Router()
const {handlesignup,handlelogin,handleupdateuser,handleuserlogout} = require('../Controllers/usercontrollers')
const onlyauthuser = require('../Middlewares/Onlyauthuser')

userrouter.post('/signup',handlesignup)
userrouter.post('/login',handlelogin)
userrouter.patch('/edit',onlyauthuser,handleupdateuser)
userrouter.get('/logout',onlyauthuser,handleuserlogout)

module.exports= userrouter;