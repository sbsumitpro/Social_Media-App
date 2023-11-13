const mongoose = require("mongoose");

const frinedshipSchema = new mongoose.Schema({
    from_user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    to_user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{
    timestamps:true
}
)

const FriendShip = mongoose.model("FriendShip",frinedshipSchema);
module.exports = FriendShip;