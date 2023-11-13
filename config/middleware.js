// This middleware is used to send the user Flash message. It basically put all the success and error message in the locals 

module.exports.setFlash = (req,res, next)=>{
    res.locals.flash={
        "success":req.flash("success"),
        "error":req.flash("error")
    }
    next();
}