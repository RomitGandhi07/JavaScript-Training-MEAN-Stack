/*
    This middleware is responsible for catching routes which are not specified
*/  
const error404=(req,res,next)=>{
    // Throw 404 error and go to next error middleware
    try { throw({ status: 404 }); }
    catch (err) { next(err); }
}

module.exports=error404;