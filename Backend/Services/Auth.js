const jwt = require('jsonwebtoken')
const secret = "27230"

function setuser(user){
    const payload = {user}
  return  jwt.sign(payload,secret)
}

function getuser(token){
    return jwt.verify(token,secret)
}

module.exports = {
  setuser,
  getuser
}