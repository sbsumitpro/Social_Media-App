require("dotenv").config()
const express = require("express");
const cookieParser = require("cookie-parser")
const ejsLayouts = require("express-ejs-layouts")
const bodyParser = require("body-parser")
const port = process.env.PORT;
const db = require("./config/mongoose")
const routes = require("./routes/router")
const app = express()
// used for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const passportJWT = require("./config/passport-jwt-strategy");
const passportGoogle = require("./config/passport-google-oauth2-strategy");
const MongoStore = require("connect-mongo");
const sassMiddleware = require("node-sass-middleware")
const flash = require("connect-flash")
const customFlashMware = require("./config/middleware")
const env = require("./config/environment")
require("dotenv").config();


// setup chat server to be used with socket.io
const chatServer = require("http").Server(app);
const chatSockets = require("./config/chat_socket").chatSockets(chatServer);
chatServer.listen(5000)
console.log("Chat server is listening on port number 5000");

// app.use(sassMiddleware({
//     src:"./assets/scss",
//     dest:"./assets/css",
//     debug:true,
//     outputStyle:"extended",
//     prefix:"/css"
// }))

app.use(bodyParser.urlencoded({extended:false}))
app.use(ejsLayouts)   // set the layouts before routing starts
app.use(express.static("assets"))
app.use("/uploads",express.static(__dirname+"/uploads"))   // make the upload path available to the browser
app.set("view engine", "ejs")
app.set("views","./views")

// extract styles and scripts from the subpages into the layout
app.set('layout extractStyles', true) 
app.set('layout extractScripts', true)

// mongo store is used to store the session cookie in the DB
app.use(session({
    name:"codeial",
    secret:env.session_cookie_key,
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge: (1000*60*30)
    },
    store:  MongoStore.create({
        mongoUrl:process.env.MONGO_URI,  // new way to setup MongoDB
        autoRemoved :"disabled"
    })
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser)    

app.use(flash()) // initialize flash
app.use(customFlashMware.setFlash) //using flash middleware

//use express router
app.use("/", routes)

app.listen(port,()=>{
    console.log("Server is up and running at port ",port);
})