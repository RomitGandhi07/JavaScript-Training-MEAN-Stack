const express = require("express");
const app = express();
const mongoose = require("mongoose");
const {Tag}=require("./models/tag");
const tags=require("./routes/tags");

mongoose.connect("mongodb+srv://Romit:DemoPassword@cluster0.liiey.mongodb.net/tree_view?retryWrites=true&w=majority")
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Coudn't connect to MongoDB"));

app.use(express.json());
app.use(express.static("public"));
app.use("/api/tags",tags);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
