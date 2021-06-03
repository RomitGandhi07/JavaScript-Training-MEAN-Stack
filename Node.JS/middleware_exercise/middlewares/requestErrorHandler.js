/*
  This midleware is responsible for handling the different page request erros
  Like 400,401,404,500 
*/
const requestErrorHandler=(err,req,res,next)=>{
    switch(err.status){
      case 404:
        res.status(404).send("This is 404 Error");
        break;
      
      case 400:
      case 401:
        res.status(err.status).json({message: err.message});
        break;
      
      case 500:
        res.status(500).json({message: "something went wrong..."});
        break;
      
      default:
        res.status(err.status).json({message: err.message});
    }
};  

module.exports=requestErrorHandler;