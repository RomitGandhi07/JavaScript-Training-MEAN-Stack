/*
    This middleware is responsible for cheking that JWT token is present in the header or not
    If yes then it is valid or not
*/
const jwt=require('jsonwebtoken');
const authorized=(req,res,next)=>{
    try{
        // Check private key is exist or not
        const jwtKey=process.env.exercise2_jwtKey;
        if(!jwtKey){
            throw("no jwt key");
        }

        // Check header contains JWT tocken or not
        const jwtTocken=req.header('x-auth-token');
        if(!jwtTocken){throw({status: 400, message: "No JWT tocken"});}

        // Verify JWT is valid or not
        jwt.verify(jwtTocken,jwtKey);
        next();
    }
    catch(err){
        next(err);
    }
    
};

module.exports=authorized;