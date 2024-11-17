const mongoose = require('mongoose')

function ConnectMongodb(url){
    mongoose.connect(url)
}

module.exports = ConnectMongodb;