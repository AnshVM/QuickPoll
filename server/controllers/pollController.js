const Poll = require("../models/Poll");
const User = require("../models/User")

exports.createPoll = (req, res) => {
  const { authorId, pollHeader, options } = req.body;
  const pollOptions = options.map((opt) => ({ option: opt, votes: 0 }));
  const newPoll = {
    authorId,
    pollHeader,
    pollOptions,
    totalVotes: 0,
  };
  Poll.create(newPoll, (err, poll) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.status(201).json(poll);
  });
  
};

exports.getPoll = (req, res) => {
  const _id = req.params.id;
  Poll.findById(_id, (err, poll) => {
    if (err) return res.json(err);
    else return res.status(200).json(poll);
  });
};

exports.updatePoll = async (req, res) => {
  const { optionId, updatedOptionVotes, updatedTotalVotes,userId } = req.body;
  const pollId = req.params.id;

  let oldPoll = await Poll.findById(pollId);
  oldPoll.totalVotes = updatedTotalVotes;
  oldPoll.pollOptions.id(optionId).votes = updatedOptionVotes;
  console.log(oldPoll);

  await Poll.updateOne({ _id: pollId }, oldPoll);

  let oldUser = await User.findById(userId);
  oldUser.userVotedPolls.push({pollId,optionId});

  await User.updateOne({_id:userId},oldUser);

  const newUser = await User.findById(userId);
  const newPoll = await Poll.findById(pollId);

  return res.status(201).json({user:newUser,poll:newPoll});

};

