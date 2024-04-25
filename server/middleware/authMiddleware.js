const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

const requireAuth =  (req, res , next)=>{
    const token = req.cookies.jwt;
    // console.log(token)
    if(token){
        jwt.verify(token, "Pedo Mellon a Minno",(err, decodedToken)=>{
            if(err){
                res.redirect('/login')
            }else{
                // console.log(decodedToken.id)
                next()
            }
        })
    }
    else{
        res.redirect('/login')
    }
}

const checkUser = (req,res,next)=>{
    if(token){
        jwt.verify(token, "Pedo Mellon a Minno",async (err, decodedToken)=>{
            if(err){
                console.log(err)
                res.redirect('/login')
            }else{
                // console.log("jwt verified"+decodedToken)
                let userId = await prisma.user.findUnique({
                    where:{
                        id:decodedToken
                    },
                    select:{
                        id: true
                    }
                })
                res.locals.user = userId
                next()
            }
        })
    }
    else{
        
    }
}

module.exports = {requireAuth}