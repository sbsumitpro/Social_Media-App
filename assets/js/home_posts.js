{
    // method to submit the form data for new posts using Ajax
    let createPost = function(){
        let newPostForm = $("#new-post-form");
        newPostForm.submit(function(e){
            e.preventDefault()
            $.ajax({
                type:'post',
                url:"/posts/create",
                data:newPostForm.serialize(),
                success:function(data){
                    console.log("bhai inside js----------->>>>>>",data)
                    let newPost = newPostDom(data.data.post)
                    $(".post-container").prepend(newPost);
                    deletePost($(" .delete-post-btn", newPost))

                    new ToggleLike($(".toggle-like-btn", newPost));
                },
                error:function(error){
                    console.log(error.responseText)
                }

            })
        })
    }

    //Method to create post in DOM
    let newPostDom=function(post){ 
        return $(`<div class="posts" id="post-${post.id}">
        <small>
            <a class="delete-post-btn" href="/posts/destroy/${post._id}">X</a> 
        </small>
        <small style="background-color: yellow;">${post.user.name}</small>
        <h3>${post.content}</h3>

        <small>
                <a class="toggle-like-btn" data_likes="<%=post.likes.length%>" href="/likes/toggle/?id=<%=post._id%>&type=Post">
                    0 Likes
                </a>

        </small>

        <div class="post-comments">
                <form action="/comments/create" method="post">
                    <input type="text" name="content" placeholder="Type here to add comment..." required>
                    <input type="hidden" name="post" value="${post._id}">
                    <input type="submit" value="Add Comment">
                </form>
                <div class="post-comments-list">

                </div>
        </div>
    </div>`)
    }

    //Method to delete a post from Dom
  
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault()
            $.ajax({
                type:"GET",
                url:$(deleteLink).prop("href"),
                success:function(data){
                    $(`post-${data.data.post_id}`).remove()
                },
                error:function(err){
                    console.log(err.responseText)
                }
            })
        })
    }

    createPost()
}

