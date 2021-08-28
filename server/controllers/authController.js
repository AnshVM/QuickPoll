const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { response } = require('express');
dotenv.config();

exports.signup = (req, res, next) => {
    console.log("recieved signup request")
    const { username, email, password } = req.body;
    bcrypt.hash(password, 10, (err, hash) => {
        err && console.log(err);
        const newUser = {
            username,
            email,
            password: hash,
            userCreatedPolls: [],
            userVotedPolls: []
        }
        User.create(newUser, (err, user) => {
            if (err) return console.log(err)
            else {
                res.status(201).json("User created!!!")
                console.log("New user created")
            }
        })
    })

}

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(404).json("User not found")

    const hash = user.password;

    bcrypt.compare(password, hash, (err, result) => {
        err && console.log(err);
        if (!result) return res.status(400).json("Incorrect password");

        const payload = {
            userId: user._id,
            email: user.email,
            username: user.username
        }

        const accessToken = jwt.sign(payload, process.env.SECRET_KEY);
        res.cookie('accessToken','Bearer '+accessToken, {httpOnly: true })
        res.status(200).json({ accessToken });
    })
}

exports.verifyToken = (req,res) => {

    const accessToken = req.cookies.accessToken ? req.cookies.accessToken.split(' ')[1] : "";
    jwt.verify(accessToken,process.env.SECRET_KEY,(err,decoded)=>{
        if(err) return res.status(401).json(err)
        const user = {
            email:decoded.email,
            id:decoded.userId,
            username:decoded.username
        }
        res.status(200).json({user});
    })
}

exports.logout = (req,res) => {
    console.log('Recieved logout request')
    res.clearCookie('accessToken');
    res.status(200).json("Logout successful")
}