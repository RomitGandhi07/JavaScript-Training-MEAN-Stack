/* 
    This middleware is responsible for checking that is given data in the request body is JSON or not
*/
const isJson=(req,res,next)=>{
    try{
        const methods=["POST","PUT",'PATCH'];
        // Check method is one of the above methods or not
        if(methods.includes(req.method)){
            // Check header, send 400 if not JSON otherwise next
            const contentType=req.header('Content-Type');
            if(contentType==="application/json"){
                next();
            }
            else{
                throw({status:400, message: "Please give valid JSON input"});
            }
        }
        else{next();}
    }
    catch(err){
        next(err);
    }
    
}

module.exports=isJson;