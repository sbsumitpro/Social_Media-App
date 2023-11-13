const User = require("../model/user");
const ResetPasswordToken = require("../model/reset_password")
const fs = require("fs");
const path = require("path");
const { executionAsyncResource } = require("async_hooks");
const jwt = require("jsonwebtoken");
const resetPasswordMailer = require("../mailers/resetPassword_mailer")


module.exports.getProfile = (req,res)=>{
    User.findById(req.params.id)
    .then((user)=>{
        return res.render("profile",{
            title:"User Profile",
            profile_user:user
        })
    })
}

module.exports.update = async(req,res)=>{
    if(req.user.id==req.params.id){
        try{
            let user = await User.findById(req.params.id)
            User.uploadedAvatar(req,res, function(err){
                if(err){console.log("****** Multer error",err)}
                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){

                    // console.log("*********************"+path.join(__dirname,"..",user.avatar))
                    if(user.avatar && fs.existsSync(path.join(__dirname, '..', user.avatar))){
                        try{
                            fs.unlinkSync(path.join(__dirname,"..",user.avatar))
                        }catch(err){
                            console.log("----------------Unable to delete file------------------------")
                        }
                    }

                    // This is saving the path of the uploaded file into the avatar field of the user
                    user.avatar = User.avatarPath+"/"+req.file.filename;
                }

                user.save();
                return res.redirect("back");
            })
        }catch(err){
             console.log("Error", err)
        }
    }else{
        req.flash("error","Unauthorized!")
        return res.status(401).send("Unauthorized")
    }

}
// module.exports.update = async(req,res)=>{
//     try{
//         if(req.user.id==req.params.id){
//             await User.findByIdAndUpdate(req.params.id,req.body)
//             req.flash("success","Updated!")
//             return res.redirect("back")
//         }else{
//             req.flash("error","Unauthorized!")
//             return res.status(401).send("Unauthorized")
//         }
//     }catch(err){
//         console.log("Error".err)
//     }

// }

module.exports.signUp = (req,res)=>{
    if(req.isAuthenticated()){
        return res.render("/users/profile")
    }
    return res.render("user_sign_up",{
        title:"Codeial | Sign Up"
    })
}

module.exports.signIn = (req,res)=>{
    if(req.isAuthenticated()){
        return res.redirect("/users/profile")
    }
    return res.render("user_sign_in",{
        title:"Codeial | Sign In"
    })
}

module.exports.create = async(req,res)=>{
    try{
        if(req.body.password != req.body.confirm_password){
            req.flash("error","Password and confirm password doesn't match")
            return res.redirect("back");
        }
        let user =await User.findOne({email:req.body.email})
        if(!user){
            await User.create(req.body)
            console.log("User created successfully");
            req.flash("success","Your sign up is successful, now sign in!")
            res.redirect("/users/sign-in")
        }else{
            console.log("User with this email id already exists")
            req.flash("error","User with this email id already exists")
            res.redirect("back")
        }
    }catch(err){
        console.log("Error", err)
        return
    }

}

module.exports.createSession = (req, res)=>{
    req.flash("success","Logged in successfully")
    return res.redirect("/");
}

module.exports.destroySession = (req,res)=>{
    req.logout(function(err){
        if(err){console.log("Error", err)}
        else{
            req.flash("success","You have Logged out!")
            return res.redirect("/")
        }
    });
}

module.exports.verifyEmailForResetPassword = (req,res)=>{
    return res.render("reset_email",{
        title:"Verify your Email"
    })
}

module.exports.sendResetPasswordEmail=async(req,res)=>{

    try{
        let user = await User.findOne({email:req.body.email})
        if(user){
            accessToken = jwt.sign(user.toJSON(), "CodeChef", {expiresIn:100000})
            await ResetPasswordToken.create({
                user:user._id,
                access_token : accessToken ,
                isValid:true
            })

            email_link = `localhost:7000/users/reset-password?access_token=${accessToken}`
            resetPasswordMailer.resetPassword(email_link, req.body.email)
            req.flash("success","Password reset link has been sent to your email");
            return res.redirect("/");
        }else{
            req.flash("error","Invalid email id");
            return res.redirect("back");
        }

    }catch(err){
        console.log("Error in finding the email id", err);
    }
}

module.exports.renderResetPassword = async(req,res)=>{
    try{
        let token = await ResetPasswordToken.findOne({access_token:req.query.access_token})
        .populate("user")
        console.log("isValid",token)
        if(token && token.isValid){
                return res.render("reset_password",{
                    title:"Reset password",
                    token:token
                })
        }else{
            req.flash("error","Your link has expired!")
            return res.redirect("/")
        }
    }catch(err){
        console.log("error",err);
        return;
    }

}

module.exports.resetPasswordAction=async(req,res)=>{
    try{
        let token = await ResetPasswordToken.findOne({access_token:req.query.access_token})
        .populate("user")
        if(req.body.password == req.body.confirm_password){
            await User.findOneAndUpdate({_id:token.user._id},{password:req.body.password})
            req.flash("success","Your password has been reset successfully!")
            await ResetPasswordToken.findOneAndUpdate({user:token.user._id},{isValid:false})
            return res.redirect("/");
        }else{
            req.flash("error","Your password/confirm password doesn't match!")
            return res.redirect("back")
        }

    }catch(err){
        console.log("error",err);
        return;
    }


    
}