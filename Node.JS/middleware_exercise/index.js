const logger = require("./middlewares/logger");
const checkDBConnected=require("./middlewares/checkDBConnected");
const authorized=require("./middlewares/authorized");
const isJson = require("./middlewares/isJson");
const addXSSSecurity=require("./middlewares/addXSSSecurity");
const error404=require("./middlewares/error404");
const codeErrorHandler=require("./middlewares/codeErrorHandler");
const requestErrorHandler = require("./middlewares/requestErrorHandler");
const names = require("./routes/names");
const jwtToken = require("./routes/jwtToken");
const mongoose = require('mongoose');
const express = require('express');
const app = express();


mongoose.connect("mongodb://localhost/Exercise2")
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Coudn't connect to MongoDB"));

app.use(express.json());

app.use(logger);
app.use(checkDBConnected);
app.use("/api/jwtToken", jwtToken);
app.use(authorized);
app.use(isJson);
app.use(addXSSSecurity);
app.use("/api/names", names);
app.use(error404);
app.use(codeErrorHandler);
app.use(requestErrorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));