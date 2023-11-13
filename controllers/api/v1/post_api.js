const Post = require("../../../model/post")
const Comment = require("../../../model/comment")

module.exports.index = async(req,res)=>{
    let posts = await Post.find()
    .sort("-createdAt")
    .populate("user")
    .populate({
        path:"comments",
        populate:{
            path:"user"
        }
    })

    return res.status(200).json({
        message:"List of posts",
        posts:posts
    })
}

module.exports.destroy = async(req, res)=>{
    try{
        let post = await Post.findById(req.params.id)
        if(post.user == req.user.id){
            post.deleteOne()
            await Comment.deleteMany({post:req.params.id})
            res.json(200,{
                message:"Post and associated comments deleted successfully!"
            })
        }else{
            return res.status(401).json({
                message:"You can't delete this post!"
            })
        }

    }catch(err){
        console.log("********************", err)
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
}
