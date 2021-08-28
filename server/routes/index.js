const Router = require('express').Router();
const userRoutes = require('./userRoutes');
const pollRoutes = require('./pollRoutes');
const auth = require('../utils/auth');
const { model } = require('mongoose');

Router.use('/user',userRoutes);
Router.use('/poll',pollRoutes)

module.exports = Router;