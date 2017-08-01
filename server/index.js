const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');


const mongoose = require('mongoose');
require('./models/Searches');

mongoose.connect(process.env.MONGODB_URI ||'mongodb://localhost/news');

// let Account = mongoose.model('Account');


const app = express();
module.exports = app;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static('client'))



app.get('/login/:pin', function(req, res, next) {
    // let search = new Account(req.params);
    // console.log("search", search);
    // search.save(function(err, search){
    //   if(err){ return next(err); }
    //   //res.json(search);
    // });
    let objForStorage = req.params;
    objForStorage.balance = 10;
    console.log(req.params)
    res.json("hi")
});

//app.pos

app.post('/repos/import', function (req, res) {
  for (var key in req.body) {
    var entry = req.body[key];
      knex.raw('INSERT OR REPLACE INTO repos (username, reponame, stargazers, url) values ("' + entry.username + '", "' + entry.reponame + '", "' + entry.stargazers + '", "' + entry.url  + ' ");')
         .then(function(response) {
             console.log("This bloody worked!")
             knex.select("*").from('repos').then(function(data) {console.log("Data successfully imported", data)})
         })
         .catch(function(err) {
             console.log(err);
         })
  }
  res.status(200);
  res.send("Repos Recieved.")
});


app.get('/repos', function (req, res) {
  res.status(200);
  res.type('html');

  knex.select("*").from("repos").orderBy('stargazers', 'desc')
      .then(function (data)  {
        data = data.splice(0,25);
        return data.map(function (repo) {
          return `<ul>
                <li><strong>Repository: </strong><a href="${repo.url}">"${repo.reponame}"</a></li>
                <li><i>Username: </i>"${repo.username}"</li>
                <li>Stargazers: "${repo.stargazers}"</li>
              </ul>`
        }).join('')
      })
      .then(function (data)  {res.send(data)})
});


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname,  '../client/', 'index.html'));
});

var port = process.env.PORT || 4040;
app.listen(port);
console.log("Listening on port " + port);
