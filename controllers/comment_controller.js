const Comment = require("../model/comment")
const Post = require("../model/post")
const commentsMailer = require("../mailers/comments_mailer")
const queue = require("../config/kue")
const commentEmailWorker = require("../workers/comment_email_worker") //This is the queue function to send the email
const Like = require("../model/like")

module.exports.create = async(req, res)=>{
    try{
        let post = await Post.findById(req.body.post)
        if(post){
            let comment = await Comment.create({
                content:req.body.content,
                post: post._id, 
                user:req.user._id
            })
            
            post.comments.push(comment);
            post.save();
            comment = await comment.populate("user","name email")
            // commentsMailer.newComment(comment);

            // const job = queue.create("emails", comment).save((err)=>{
            //     if(err){
            //         console.log("Error in sending the job to the queue"); 
            //         return;
            //     }

            //     console.log("Job enqued",job.data);
            //     return
            // })

            req.flash('success',"Comment added.")
            res.redirect("/")
        }
    }catch(err){
        console.log("Error",err)
        return
    }
}

module.exports.destroy = async(req,res)=>{
    try{
        let comment = await Comment.findById(req.params.id)
        if(comment.user == req.user.id){
            post_id = comment.post
            comment.deleteOne()

            await Like.deleteMany({likeable:comment._id, onModel:"Comment"})

            await Post.findByIdAndUpdate(post_id, {$pull:{comments:req.params.id}})
            req.flash('success',"Comment deleted.")
            return res.redirect("back")
        }else{
            return res.redirect("back");
        }
    }catch(err){
        console.log("Error",err)
        return
    }

}