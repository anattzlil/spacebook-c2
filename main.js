var SpacebookApp = function () {
  var posts = [
    // {text: "Hello world", id: 0, comments:[
    //   { text: "Man, this is a comment!"},
    //   { text: "Man, this is a comment!"},
    //   { text: "Man, this is a comment!"}
    // ]},
    // {text: "Hello world", id: 0, comments:[
    //   { text: "Man, this is a comment!"},
    //   { text: "Man, this is a comment!"},
    //   { text: "Man, this is a comment!"}
    // ]},
    // {text: "Hello world", id: 0, comments:[
    //   { text: "Man, this is a comment!"},
    //   { text: "Man, this is a comment!"},
    //   { text: "Man, this is a comment!"}
    // ]}
  ];

  // the current id to assign to a post
  var currentId = 0;
  var $posts = $('.posts');
  
  var _findPostById = function (id) {
    for (var i = 0; i < posts.length; i += 1) {
      if (posts[i].id === id) {
        return posts[i];
      }
    }
  }

  var createPost = function (text) {
    var post = {
      text: text,
      id: currentId,
      comment: []
    }

    currentId += 1;

    posts.push(post);
  }


  var createComment = function(text,id) {
    var comment = text;    
    var post = _findPostById(id);
    post.comment.push(comment);
    console.log(posts);
  }

  var renderComments = function(postId) {
    var comments = "";
    for (var i = 0; i < posts[postId].comment.length; i++) {
    comments += '<li class="comment" data-index = ' + i + '>' + posts[postId].comment[i] + '<a href="#" class="removeComment">remove comment</a> </li>';
    };
    return comments;
  };


  var renderPosts = function () {
    $posts.empty();

    for (var i = 0; i < posts.length; i += 1) {
      var post = posts[i];

      var commentsContainer = '<div class="comments-container"><ul>' +
      renderComments(i) + '</ul><input type="text" class="comment-name">' + 
      '<button class="btn btn-primary add-comment">Post Comment</button> </div>';

      $posts.append('<div class="post" data-id=' + post.id + '>'
        + '<a href="#" class="remove">remove</a> ' + '<a href="#" class="show-comments">comments</a> ' + post.text +
        commentsContainer + '</div>');
    }
  }

  var removeComment = function(currentComment) {
    var $clickedComment = $(currentComment).closest('.comment');
    var commentId = $clickedComment.data().index;
    var currentPost = $($clickedComment).closest('.post');
    var id = currentPost.data().id;
    var post = _findPostById(id);
    posts[posts.indexOf(post)].comment.splice(commentId, 1);
    $clickedComment.remove();
  }


  var removePost = function (currentPost) {
    var $clickedPost = $(currentPost).closest('.post');
    var id = $clickedPost.data().id;

    var post = _findPostById(id);

    posts.splice(posts.indexOf(post), 1);
    $clickedPost.remove();
  }

  var toggleComments = function (currentPost) {
    var $clickedPost = $(currentPost).closest('.post');
    $clickedPost.find('.comments-container').toggleClass('show');
  }

  return {
    createPost: createPost,
    renderPosts: renderPosts,
    removePost: removePost,

    // TODO: Implement
    createComment: createComment,

    // TODO: Implement
    renderComments: renderComments,

    // TODO: Implement
    removeComment: removeComment,
    toggleComments: toggleComments
  }
}

var app = SpacebookApp();

// immediately invoke the render method
app.renderPosts();

// Events
$('.add-post').on('click', function () {
  var text = $('#post-name').val();
  
  app.createPost(text);
  app.renderPosts();
});

$('.posts').on('click', '.remove', function () {
  app.removePost(this);
});

$('.posts').on('click','.show-comments', function () {
  app.toggleComments(this);
});

$('.posts').on('click', '.add-comment' ,function() {
  var text = $(this).siblings('.comment-name').val();
  var commentPostId = $(this).closest('.comments-container').closest('.post').data().id;
  app.createComment(text, commentPostId);
  app.renderPosts();
//   $(this).closest('.post').find('.comments-container').css('class', 'show');
    // app.renderComments(commentPostId);
});

$('.posts').on('click', '.removeComment', function(){
  app.removeComment(this);
})
