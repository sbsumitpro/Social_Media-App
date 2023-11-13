const mongoose = require("mongoose")
const env = require("./environment")
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI);

const db =mongoose.connection;

db.on("error", console.log.bind(console,"error connecting to DB"))
db.once("open", function(){
    console.log("Successfully connected to the DB");
})