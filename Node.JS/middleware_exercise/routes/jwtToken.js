const jwt=require('jsonwebtoken');
const express=require('express');
const router=express.Router();

router.post("/",(req,res,next)=>{
    try{
        // Generate JWT token and send it to user
        const jwtKey=process.env.exercise2_jwtKey;
        const jwtTocken=jwt.sign(req.body,jwtKey);
        res.header('x-auth-tocken',jwtTocken).send({jwt: jwtTocken});
    }
    catch(err){
        next(err);
    }
    
})

module.exports=router;