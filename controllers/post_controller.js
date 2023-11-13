const Post = require("../model/post")
const Comment = require("../model/comment")
const Like = require("../model/like")

module.exports.createPost = (req, res)=>{
    Post.create({
        content:req.body.content,
        user:req.user._id
    })
    .then((t)=>t.populate("user"))
    .then((post)=>{
        if(req.xhr){
            return res.status(200).json({
                data:{
                    post:post
                },
                message:"Post created!"
            })
        }
        req.flash("success","Post created")
        return res.redirect("back")
    })
    .catch(err=>console.log("Error in creating post", err)) 
}


module.exports.destroy = async(req, res)=>{
    try{
        let post = await Post.findById(req.params.id)
        if(post.user == req.user.id){

            await Like.deleteMany({likeable:post, onModel: "Post"})
            await Like.deleteMany({_id: {$in:post.comments}})

            post.deleteOne()
            Comment.deleteMany({post:req.params.id})
            .then((err)=>{
                if(req.xhr){
                    return res.status(200).json({
                        data:{
                            post_id:req.params.id
                        },
                        message:"Post deleted successfully"
                    })
                }
                req.flash("success","The post and comments associated with it is deleted")
                return res.redirect("back");
            }) 
        }else{
            console.log("You can only delete your own post")
            res.redirect("back")
        }
    }catch(err){
        req.flash("Error",err)
    }


}
