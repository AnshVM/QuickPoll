const mongoose = require('mongoose');
const validator = require('validator')

const userVotedPollSchema = new mongoose.Schema({
    pollId:String,
    optionId:String
})

const userCreatedPollSchema = new mongoose.Schema({pollId:{type:String}})

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter your name']
    },
    email: {
        type: String,
        required: [true, "Please enter your eamil"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
        type: String,
        required: [true, "Please enter your password"]
    },
    userCreatedPolls:[userCreatedPollSchema],
    userVotedPolls:[userVotedPollSchema],
})

const User = new mongoose.model('User', userSchema);

module.exports = User;
