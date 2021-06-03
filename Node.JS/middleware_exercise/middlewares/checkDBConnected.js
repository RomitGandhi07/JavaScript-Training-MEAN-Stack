/*
    This middleware is responsible for checking DB is connected or not 
    If it isn't then we will move to next error middleware otherwise next 
*/
const index = require("../index");
const mongoose = require("mongoose");
const checkDBConnected = (req, res, next) => {
    try {
        // Checking current state of db
        // 0 means disconnected and 3 means disconnecting
        const dbConnected = mongoose.connection.readyState;
        if (dbConnected === 0 || dbConnected === 3) {
            throw new Error("DB is not connected");
        }
        else { next(); }
    }
    catch (err) {
        next(err);
    }

};

module.exports = checkDBConnected;