const nodeMailer = require("../config/nodemailer");

exports.resetPassword= (password_reset_link, email)=>{
    // console.log("Inside nodemailer", comment);


    nodeMailer.transporter.sendMail({
        from:"sbsumitpro@gmail.com",
        to:email,
        subject:"Reset your password",
        html: password_reset_link
    },(err,info)=>{
        if(err){
            console.log("Error in sending email", err);
            return;
        }
        console.log("Password reset link Sent!");
        return;

    })
}