const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../model/user");
const env = require("../config/environment")

passport.use(new googleStrategy({
    clientID: env.google_client_id,
    clientSecret: env.google_client_secret,
    callbackURL: env.google_callback_url
    },
    async (accessToken, refreshToken, profile, done)=>{
        try{
            const user = await User.findOne({email:profile.emails[0].value});

            if(user){
                // if found,then set the user as req.user 
                return done(null, user)
            }else{
                // if not found, then create the user and then set it as req.user
                try {
                    const user = await User.create({
                        name:profile.displayName,
                        email:profile.emails[0].value,
                        password: crypto.randomBytes(20).toString("hex")
                    })
                    return done(null, user);
                } catch (err) {
                    console.log("error in creating new user from google auth",err);
                    return
                }
            }

        }catch(err){
            console.log("error in creating google strategy -passport",err);
            return;
        }

    }

))

module.exports = passport;
