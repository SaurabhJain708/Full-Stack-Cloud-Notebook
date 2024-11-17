const user = require('./usermodel')
const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    content:{
        type: String,
        required: true,
    },
    createdby:{
        type: mongoose.Schema.Types.ObjectId,
        ref: user,
        required: true
    }
},{timestamps: true})

const notes = mongoose.model('notes',noteSchema)

module.exports = notes;