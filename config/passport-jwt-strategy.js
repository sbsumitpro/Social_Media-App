const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const env = require("./environment")

const User = require("../model/user");

let opts = {
    jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: env.jwt_secret
}

passport.use(new JWTStrategy(opts, function(jwt_payload, done) {

    User.findById(jwt_payload._id) 
    .then((user)=>{
        if(user){
            return done(null,user);
        }else{
            return done(null,false);
        }
    }).catch((err)=>{
        console.log("Error in finding user from JWT"); return;
    })
        
}))

module.exports = passport