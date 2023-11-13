const mongoose = require("mongoose");
 
const ResetPasswordTokenSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    access_token:{
        type:String
    },
    isValid:{
        type: Boolean,
        default: true
    }
})

const ResetPasswordToken = mongoose.model("resetpasswordtoken", ResetPasswordTokenSchema)
module.exports = ResetPasswordToken