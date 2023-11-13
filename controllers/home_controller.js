const Post = require("../model/post")
const User = require("../model/user")



// populate the user for each post
module.exports.home = async(req,res)=>{
    try{
        let posts = await Post.find()
        .sort("-createdAt")
        .populate("user") 
        .populate({
            path:"comments", 
            populate:[{
                path:"user",
                model:"User"
            },{
                path:"likes" ,
                model:"Like"
            }]
        })
        .populate("likes")
        
        let users = await User.find({})
        return res.render("home",{
            title:"FaceBook-App",
            listOfPosts:posts,
            all_users:users
        })

    }catch(err){
        console.log("Error", err)
        return
    }
}




