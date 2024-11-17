const user = require('../Models/usermodel')
const {setuser} = require('../Services/Auth')
const mongoose = require('mongoose')
async function handlesignup(req,res){
    const body = req.body
    const ifexists = await user.findOne({email: body.email})
    if(!ifexists){
    try{
        const createduser = await user.create({
            name: body.name,
            email: body.email,
            phoneno: body.phoneno,
            location: body.location,
            password: body.password
        })
        res.json({
            type: "success",
            msg: "User added successfully"
        })
    }catch(err){
        console.log(err)
        res.json({
            type: "danger",
            msg: "Some error occured"
        })
    }
}else{
    res.json({
        type: "danger",
        msg: "User already exists"
    })
}

}

async function handlelogin(req,res){
    const body = req.body
    try{
        const realuser = await user.findOne({email: body.email})
        if(!realuser){
            return res.json({
                type:"danger",
                msg:"Please signup before login"
            })
        }

        const passwordmatch = await realuser.validatePassword(body.password)

        if(!passwordmatch){
            return res.json({
                type:"danger",
                msg: "Please enter valid password"
            })
        }
        req.user = realuser
        const token = setuser(realuser)
        res.cookie("jwt",token,{
            httpOnly: true, // Helps prevent XSS attacks
            secure: false,  // Set to true for HTTPS, false for HTTP (local development)
            sameSite: 'lax', // 'lax' allows cookies to be sent with top-level navigations, while 'strict' is more secure
            maxAge: 24 * 60 * 60 * 1000 // Cookie expiration time (1 day)
        })
        return res.json({
            type:"success",
            msg: "User logged in successfully",
            name: realuser.name,
            phoneno: realuser.phoneno,
            location: realuser.location,
            email: realuser.email,
            createdAt: realuser.createdAt
        })
    }catch(err){
        console.log(err)
         res.json({
            type:"danger",
            msg: "Some error occured"
        })
    }
}

async function handleupdateuser(req,res){
    const body = req.body
    try{
        const updateduser = await user.findByIdAndUpdate(req.user._id,{
            name: body.name,
            email: body.email,
            phoneno: body.phoneno,
            location: body.location
        },{new:true})
        const newTokenValue = setuser(updateduser)
        res.cookie('jwt', newTokenValue, {
            httpOnly: true, // Helps prevent XSS attacks
            secure: false,  // Set to true for HTTPS, false for HTTP (local development)
            sameSite: 'lax', // Helps prevent CSRF attacks
            maxAge: 24 * 60 * 60 * 1000 // Cookie expiration time (1 day)
        });
        res.json({
            type:"success",
            msg:"User updated successfully"
        })
    }catch(err){
        console.log(err)
        res.json({
            type:"danger",
            msg:"Some error occured"
    })
    }
}

function handleuserlogout(req,res){
    res.clearCookie('jwt')
    res.json({
        type: "success",
        msg: "Logged out"
    })
}

module.exports = {
    handlesignup,
    handlelogin,
    handleupdateuser,
    handleuserlogout
} 