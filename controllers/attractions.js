const Attraction = require('../models/Attraction') //pulling info from the Model "Attraction"

module.exports = {
    getAttractions: async (req,res)=>{
        console.log(req.user)
        try{
            const attractionItems = await Attraction.find({userId:req.user.id})
            const itemsLeft = await Attraction.countDocuments({userId:req.user.id,completed: false})
            res.render('attractions.ejs', {attractions: attractionItems, left: itemsLeft, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    createAttraction: async (req, res)=>{
        try{
            await Attraction.create({attraction: req.body.attractionItem, completed: false, userId: req.user.id})
            console.log('Attraction has been added!')
            res.redirect('/attractions')
        }catch(err){
            console.log(err)
        }
    },
    markComplete: async (req, res)=>{
        try{
            await Attraction.findOneAndUpdate({_id:req.body.attractionIdFromJSFile},{
                completed: true
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },
    markIncomplete: async (req, res)=>{
        try{
            await Attraction.findOneAndUpdate({_id:req.body.attractionIdFromJSFile},{
                completed: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    deleteAttraction: async (req, res)=>{
        console.log(req.body.attractionIdFromJSFile)
        try{
            await Attraction.findOneAndDelete({_id:req.body.attractionIdFromJSFile})
            console.log('Deleted Attraction')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}    