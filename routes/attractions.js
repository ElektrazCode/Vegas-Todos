const express = require('express')
const router = express.Router()
const attractionsController = require('../controllers/attractions') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, attractionsController.getAttractions)

router.post('/createAttraction', attractionsController.createAttraction)

router.put('/markComplete', attractionsController.markComplete)

router.put('/markIncomplete', attractionsController.markIncomplete)

router.delete('/deleteAttraction', attractionsController.deleteAttraction)

module.exports = router