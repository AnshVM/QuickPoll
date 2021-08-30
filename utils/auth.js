const jwt = require('jsonwebtoken')

exports.verify = (req,res,next)=>{

    if(req.cookies.accessToken) {
        const accessToken = req.cookies.accessToken.split(' ')[1];
        jwt.verify(accessToken,process.env.SECRET_KEY,(err,decoded)=>{
            if(err) return res.json(err.message)
            next();
        })
    }
    else{
        return res.status('401').json("You are unauthorized")
    }



}