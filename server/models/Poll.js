const mongoose = require('mongoose');

const pollOptionSchema = new mongoose.Schema({
    option: String,
    votes: Number
})

const pollSchema = new mongoose.Schema({
    authorId:String,//userID
    pollHeader: String,
    pollOptions: [pollOptionSchema],
    totalVotes: Number
})

const Poll = new mongoose.model('Poll', pollSchema);

module.exports = Poll;