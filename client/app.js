$(document).ready(function() { 
    generatelist();
});


function generatelist () {$.ajax ({
        url: "/repos", //issue get to repos
        type: "GET",
        success: function(data) {
          console.log(data)
                $('.top-repos').append(data); //just stick the data on the DOM
        }
    })}

$('#topRepos').on('click', function(e){
  e.preventDefault();
  var responsedata = [];
  var $body = $('.top-repos');
  $.get('https://api.github.com/search/repositories?q=stars:%3E30000', function(repos) {
    console.log("HERE ARE THE TOP REPOS", repos.items)
    $body.empty();
    var res = repos.items
    for (var i = 0; i < 25; i ++) {
      responsedata[i] = {username: res[i].owner.login, reponame: res[i].name, stargazers: res[i].stargazers_count, url: res[i].html_url}      
      var $repoForBody = `<ul>
                 <li><strong>Repository: </strong><a href="${res[i].html_url}">"${res[i].name}"</a></li>
                 <li><i>Username: </i>"${res[i].owner.login}"</li>
                 <li>Stargazers: "${res[i].stargazers_count}"</li>
               </ul>`
      $( $repoForBody ).appendTo($body);
    }
  });
});

$('#submitbtn').on('click', function (e){
  e.preventDefault();
  var username = $('.ghusername').val();
  var responsedata = [];
  var $body = $('.top-repos');
  $.get('https://api.github.com/users/' + username + '/repos', username, function (res) {
    console.log("I AM THE RES!", res)
    $body.empty();

    res = res.sort(function compareNumbers(a, b) {
      return b.stargazers_count - a.stargazers_count;
    });


    for (var i = 0; i < res.length; i ++) {
      responsedata[i] = {username: username, reponame: res[i].name, stargazers: res[i].stargazers_count, url: res[i].html_url}      
      //var $description = $.parseHTML(res[i].name );
      //var $repolink = $.parseHTML(res[i].html_url );
      var $repoForBody = `<ul>
                 <li><strong>Repository: </strong><a href="${res[i].html_url}">"${res[i].name}"</a></li>
                 <li><i>Username: </i>"${username}"</li>
                 <li>Stargazers: "${res[i].stargazers_count}"</li>
               </ul>`
      $( $repoForBody ).appendTo($body);
    }

    $.post("/repos/import", responsedata, function () {

       console.log("posted!" )});
  });
});