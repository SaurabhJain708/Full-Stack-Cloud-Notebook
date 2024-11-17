const {getuser} = require('../Services/Auth')

async function onlyauthuser(req,res,next){
    try{
        const authuser = getuser(req.cookies?.jwt)
        if(!authuser){
           return res.json({
                type: "danger",
                msg: "Please login to access website"
            })
        }
        req.user = authuser.user
        return next()
    }catch{
        res.json({
            type: "danger",
            msg: "Please login to access website"
        })
    }
}

module.exports = onlyauthuser;