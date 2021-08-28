const jwt = require('jsonwebtoken')

exports.verify = (req,res,next)=>{

    const accessToken = req.cookies.accessToken.split(' ')[1];
    if(!accessToken) return res.status(401).json("You are unautharized")

    jwt.verify(accessToken,process.env.SECRET_KEY,(err,decoded)=>{
        if(err) return res.json(err.message)
        next();
    })

}