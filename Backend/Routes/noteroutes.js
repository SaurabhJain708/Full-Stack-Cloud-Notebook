const express = require('express')
const noterouter = express.Router()
const {handleaddnote,handledeletenote,handleeditnote,handlehomerender} = require('../Controllers/notecontrollers')
const onlyauthuser = require('../Middlewares/Onlyauthuser')

noterouter.get('/home',onlyauthuser,handlehomerender)
noterouter.patch('/edit/:id',onlyauthuser,handleeditnote)
noterouter.delete('/delete/:id',onlyauthuser,handledeletenote)
noterouter.post('/create',onlyauthuser,handleaddnote)
module.exports= noterouter; 