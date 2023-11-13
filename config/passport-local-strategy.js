const passport = require("passport")
const localStrategy = require("passport-local").Strategy
const User = require("../model/user")

//authentication using passport

passport.use(new localStrategy({
    usernameField:"email",
    passReqToCallback:true
},function(req,email,password, done){
    //find an user and establish the identity
    User.findOne({email:email})
        .then((user)=>{
            if(!user || user.password != password){
                req.flash("success","Invalid Username/Password")
                console.log("Invalid Username/Password")
                return done(null, false)
            }
            return done(null, user)
        })
        .catch((err)=>{
            req.flash("Error",err)
            console.log("Error in finding user--->passport",err)
            return done(err)
        })
}))

// Serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id)
})


// Desrialize the user from the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id)
    .then(function(user){
        return done(null, user)
    })
    .catch((err)=>{
        console.log("Error in finding user--->passport",err)
        return done(err)
    })
})

// check if the user is authenticated

passport.checkAuthentication = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    // if the user is not signed in
    return res.redirect("/users/sign-in")
}

passport.setAuthenticatedUser = (req,res,next)=>{
    if(req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie & we are sending this to locals for the views
        res.locals.user = req.user
    }
    next()
}

module.exports = passport
// export default passport