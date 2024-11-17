const mongoose = require('mongoose')
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    phoneno:{
        type: Number,
        required: true,
        unique:true,
    },
    location:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    salt:{
        type: String,
    }
},{timestamps:true})

userSchema.pre('save', function(next) {
    const user = this;

    // Generate a random salt
    user.salt = crypto.randomBytes(16).toString('hex');

    // Hash the password with the salt
    user.password = crypto.pbkdf2Sync(user.password, user.salt, 1000, 64, 'sha512').toString('hex');

    next();
});

// Method to validate a password during login
userSchema.methods.validatePassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.password === hash;
};

const user = mongoose.model('user',userSchema)

module.exports = user;