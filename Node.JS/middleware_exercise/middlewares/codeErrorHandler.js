/* 
    This middleware is responsible for handling the code errors
    First it will set staus to 500 and then log the error
    Log file will be ./logs/errors.logs
    Log format: Date-Time errorMessage URL Method
*/
const fs=require('fs');
async function codeErrorHandler(err, req, res, next) {
    if (!err.status) {
        // Change status code
        err.status = 500;

        // Make data
        const now = new Date();
        const errMessage = err.message;
        const url = req.protocol + '://' + req.get('host') + req.originalUrl;
        const method = req.method;
        const data = `${now} ${errMessage} ${url} ${method} \n`;

        // Make log
        await fs.appendFile("./logs/errors.logs", data, () => { });
    }
    next(err);
};

module.exports = codeErrorHandler;