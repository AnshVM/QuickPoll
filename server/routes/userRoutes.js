const Router = require("express").Router();
const authController = require('../controllers/authController')
const userController = require('../controllers/userController')
Router.post('/signup', authController.signup);
Router.post('/login',authController.login);
Router.get('/verifyToken',authController.verifyToken);
Router.get('/logout',authController.logout);
Router.get('/:id',userController.getUser);

module.exports = Router;