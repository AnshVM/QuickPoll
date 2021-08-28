const User = require('../models/User');

exports.getUser = async (req,res) => {
    const {id} = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
}