const Attraction = require('../models/Attraction') // using the Attraction model to pull info from the database regarding the attraction.

// exports the list of attractions based on the user
module.exports = {
    getAttractions: async (req,res)=>{
        console.log(req.user)
        try{
            // searching for the list of attractions that have the specific user listed in userId
            const attractionItems = await Attraction.find({userId:req.user.id})
            // this may not be needed for our app, but we can make use of the "completed" property to let the user cross out the places they've visited.
            const itemsLeft = await Attraction.countDocuments({userId:req.user.id,completed: false})
            // sends the information gathered from the model to the view (views/attractions.ejs)
            res.render('attractions.ejs', {attractions: attractionItems, left: itemsLeft, user: req.user})
        }catch(err){
            // if there was an error trying to do the above, log it to the console
            console.log(err)
        }
    },
    // allows the user to add new places to their list
    createAttraction: async (req, res)=>{
        try{
            // sends information collected from the post request to the Attractions model so it can organize the new data in the database
            await Attraction.create({attraction: req.body.attractionItem, completed: false, userId: req.user.id})
            console.log('Attraction has been added!')
            // refresh the page after the new attraction has been added
            res.redirect('/attractions')
        }catch(err){
            // if there was an error trying to do the above, log it to the console
            console.log(err)
        }
    },
    // allows users to cross out places they have visited from their list
    markComplete: async (req, res)=>{
        try{
            // sends the name pulled from the DOM (after the user submitted a POST request) to the model along with a new property value so it can find the right attraction to update
            await Attraction.findOneAndUpdate({_id:req.body.attractionIdFromJSFile},{
                completed: true
            })
            // if successful, the following message is sent to the console, and as a response to the PUT request.
            console.log('Marked Complete')
            res.json('Marked Complete')
        }catch(err){
            // if there was an error trying to do the above, log it to the console
            console.log(err)
        }
    },
    // allows users to re-add attractions to their list by clicking the completed item.
    markIncomplete: async (req, res)=>{
        try{
            // sends the name pulled from the DOM (after the user clicked a completed attraction) to the model along with a new property value so it can find the right attraction to update.
            await Attraction.findOneAndUpdate({_id:req.body.attractionIdFromJSFile},{
                completed: false
            })
            // if successful, the following message is sent to the console, and as a response to the PUT request.
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            // if there was an error trying to do the above, log it to the console
            console.log(err)
        }
    },
    // allows users to edit their itinerary by deleting items from their list of attractions
    deleteAttraction: async (req, res)=>{
        // logs the unique id (pulled from the DOM on click) of the attraction to be deleted to the console
        console.log(req.body.attractionIdFromJSFile)
        try{
            // sends the attraction id to the model asking it to delete the attraction with the matching id
            await Attraction.findOneAndDelete({_id:req.body.attractionIdFromJSFile})
            // if successful, the following message is sent to the console, and as a response to the DELETE request.
            console.log('Deleted Attraction')
            res.json('Deleted It')
        }catch(err){
            // if there was an error trying to do the above, log it to the console
            console.log(err)
        }
    }
}    