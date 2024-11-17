const notes = require('../Models/Notemodel')

async function handleaddnote(req,res){
    const body = req.body
    try{
        const creatednote = await notes.create({
            title: body.title,
            content: body.content,
            createdby: req.user._id
        })
        res.json({
            type: "success",
            msg: "Note created successfully"
        })
    }catch(err){
        console.log(err)
       res.json({
            type: "danger",
            msg: "Some error occured"
        })
    }
}

async function handledeletenote(req,res){
    try{
        const deletednote = await notes.findByIdAndDelete(req.params.id)
        res.json({
            type: "success",
            msg: "Note deleted successfully"
        })
    }catch(err){
        console.log(err)
        res.json({
            type: "danger",
            msg: "Some error occured"
        })
    }
}

async function handleeditnote(req,res){
    try{
        const updatednote = await notes.findByIdAndUpdate(req.params.id,{
            title: req.body.title,
            content: req.body.content
        })
        if(!updatednote){
            return res.json({
                type: 'danger',
                msg: 'Note doesn\'t exist' 
            })
        }
        res.json({
            type: "success",
            msg: "Note edited successfully."
        })
    }catch{
        res.json({
            type:"danger",
            msg:"Some error occured"
        })
    }
}

async function handlehomerender(req,res){
    const loggedinuser = req.user
    try{
        const allnotes = await notes.find({createdby: req.user._id})
        res.json({
            allnotes,
            loggedinuser
        })
    }catch{
        res.json({
            type:"danger",
            msg:"Some error occured"
        })
    }
}
module.exports = {
    handleaddnote,
    handledeletenote,
    handleeditnote,
    handlehomerender
} 