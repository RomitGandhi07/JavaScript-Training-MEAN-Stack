/* 
This middleware is responsible for log all the requests
File is saved under ./logs/requests.logs file
Log Format: Current Date-time URL Method IP
*/
const fs = require('fs');
async function logger(req, res, next) {
    try {
        // Making Data
        const now = new Date();
        const url = req.protocol + '://' + req.get('host') + req.originalUrl;
        const method = req.method;
        const ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
        const data = `${now} ${url} ${method} ${ip} \n`

        // Add log
        await fs.appendFile("./logs/requests.logs", data, function (err) {
            if (err) {throw new Error();}
        });
        next();
    }
    catch (err) {
        next(err);
    }
}

module.exports = logger;