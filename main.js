//this is a comment for branching
// Create a function that creates a new post object and adds it to a posts array.

// Each post object should have two properties: text (the user's input, a string) and id (a number, dynamically generated).
// Each id should be unique to that post (no two post objects should have the same id).

var posts = [];
var postId = 0;

//add post to the array
var addPost = function(input, id) {
    var newPost = {
        userInput: input,
        userId: id,
        comments:[]
    }
    posts.push(newPost);
}
//render post to the html+remove button
var renderPost = function() {
    $('.posts').find('p').remove();
    for( var i = 0; i < posts.length; i++){
       $('.posts').append('<p class="post" data-index=' + i + '>' + posts[i].userInput + '</p>');
       $('p:last-child.post').attr('data-id', posts[i].userId);
       $('p:last-child.post').append('<button type="button" class="btn btn-primary remove">Remove</button>');
       $('p:last-child.post').append('<div class="comments"></div><form class="comment-form"><h3>Add a Comment</h3><div class="form-group"><input type="text" class="form-control username" placeholder="Username"><input type="text" class="form-control comment-name" placeholder="Comment Text"></div><button class="btn btn-primary add-comment" type="button">Post</button></form>');
       for(var j = 0; j < posts[i].comments.length; j++ ){
            $('.comments').append('<p class="post-comment" data-index=' + j + '><b>' + posts[i].comments[j].name + ' says:</b><br>' + posts[i].comments[j].text + '<br><button type="button" class="btn btn-primary remove-comment">Remove</button></p>');
            // $('p:last-child').append('<button type="button" class="btn btn-primary remove-comment">Remove</button>');
       }
    }
}




//remove post and button
var removePost = function(){
    var itemtoRemove = $(this).closest('p');
    console.log(itemtoRemove);
    posts.splice(itemtoRemove.data().index,1);
    renderPost();
}

//remove comment and button
var removeComment = function(){
    var closestDiv = $('.post-comment').closest('div');
    closestPara = $(closestDiv).closest('p');
    var itemtoRemove = $(this).closest('p');
    posts[closestPara.data().index].comments.splice(itemtoRemove.data().index,1);
    console.log(posts)
    renderPost();
}

//taking info from html
var addItem = function(){
    var postContent = $('#post-name');
    postId +=1;
    addPost(postContent.val(), postId);
    postContent.val("");
}

//taking comment from html
var inputComment = function() {
    var userName = $('.username').val();
    var comment = $('.comment-name').val();
    addComment(userName, comment);
    // userName.val("");
    // comment.val("");
}

var addComment = function(username, comment) {
    var newComment = {
        name: username,
        text: comment
    }
    var indexNumber = $('.comment-name').closest('p');
    console.log(indexNumber);
    posts[indexNumber.data().index].comments.push(newComment);
}


//click-add post
$('.add-post').on('click', function() {
    addItem();
    renderPost();
});

//click-remove post
$('.posts').on('click', '.remove', removePost);

//click-remove comment
$(document).on('click', '.remove-comment', removeComment);

//click-add comment
$(document).on('click', '.add-comment', function (){
    inputComment();
    console.log(posts);
    renderPost();
});

console.log(posts);
