const mongoose = require("mongoose")
const multer = require("multer");
const path = require("path")
const avatar_path = path.join("/uploads/users/avatars")

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        // unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true,
    },
    avatar:{
        type:String
    },
    friends:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"FriendShip"
        }
    ]
}, { 
    timestamps:true
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join('__dirname', "..", avatar_path))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix);
    }
  })
  
//Static methods

userSchema.statics.uploadedAvatar = multer({ storage: storage }).single("avatar")
userSchema.statics.avatarPath = avatar_path

const User = mongoose.model("User", userSchema)

module.exports = User