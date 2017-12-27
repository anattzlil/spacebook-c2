// Create a function that creates a new post object and adds it to a posts array.

// Each post object should have two properties: text (the user's input, a string) and id (a number, dynamically generated).
// Each id should be unique to that post (no two post objects should have the same id).

var posts = [];
var postId = 0;

//add post to the array
var addPost = function(input, id) {
    var newPost = {
        userInput: input,
        userId: id
    }
    console.log(newPost);
    posts.push(newPost);
}
//render post to the html+remove button
var renderPost = function() {
    $('.posts').find('p').remove();
    for( var i = 0; i < posts.length; i++){
       $('.posts').append('<p class="post">' + posts[i].userInput + '</p>');
       $('p:last-child').attr('data-id', posts[i].userId);
       $('p:last-child').append('<button type="button" class="btn btn-primary remove">Remove</button>');
       $('.remove:last-child').on('click', removePost);
    }
}


//remove post and button
var removePost = function(){
    var itemtoRemove = $(this).closest('p');
    console.log(itemtoRemove);
    posts.splice($.inArray(itemtoRemove.data().id, posts),1);
    itemtoRemove.remove();
}

//taking info from html
var addItem = function(){
    var postContent = $('#post-name');
    postId +=1
    addPost(postContent.val(), postId);
    postContent.val("");
}

$('.add-post').on('click', function() {
    addItem();
    renderPost();
});

