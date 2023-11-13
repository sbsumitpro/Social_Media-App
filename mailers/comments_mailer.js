const nodeMailer = require("../config/nodemailer");

//this is another way of exporting a method
exports.newComment= (comment)=>{
    // console.log("Inside nodemailer", comment);
    let htmlString = nodeMailer.renderTemplate({comment:comment}, "/comments/new_comment.ejs");

    nodeMailer.transporter.sendMail({
        from:"sbsumitpro@gmail.com",
        to:comment.user.email,
        subject:"new Comment Published",
        // html: "<h1>Yep, your comment is now published </h1>"
        html: htmlString
    },(err,info)=>{
        if(err){
            console.log("Error in sending email", err);
            return;
        }
        console.log("Message Sent!");
        return;

    })
}