const jwt = require("jsonwebtoken");

const requireAuth =  (req, res , next)=>{
    const token = req.cookies.jwt;
    console.log(token)
    if(token){
        jwt.verify(token, "Pedo Mellon a Minno",(err, decodedToken)=>{
            if(err){
                res.redirect('/login')
            }else{
                // console.log("jwt verified"+decodedToken)
                next()
            }
        })
    }
    else{
        res.redirect('/login')
    }
}

module.exports = {requireAuth}