const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId
    },
    // This defines the objectid of the liked object
    likeable:{
        type:mongoose.Schema.ObjectId,
        required:true,
        refPath:"onModel" 
    },
    // This field is used for defining the type of the liked object since this is dynamic reference
    onModel:{
        type:String,
        required:true,
        enum:['Post','Comment']
    }
},{
    timestamps:true
})

const Like = mongoose.model("Like", likeSchema);
module.exports = Like;