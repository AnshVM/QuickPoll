const Router = require("express").Router();
const pollController = require('../controllers/pollController')
const auth = require('../utils/auth');


Router.post('/',auth.verify,pollController.createPoll)
Router.get('/:id',auth.verify,pollController.getPoll)
Router.put('/:id',auth.verify,pollController.updatePoll)

module.exports = Router;