const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
module.exports = app;


const mongoose = require('mongoose');
require('../models/Accounts');

mongoose.connect(process.env.MONGODB_URI ||'mongodb://localhost/news');

let Account = mongoose.model('Account');

[{PIN: 1234, Balance: 100}, {PIN: 4321}].forEach((entry)=>{var newAccount = new Account(entry);
console.log("newAccount: ", newAccount)
  newAccount.save(function (err, entry) {
    if (err) {
      return console.error(err);
    } else {console.log(entry)}
  });
})


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static('client'));

app.get('/accounts', function(req, res, next) { //route for getting all accounts - not linked to frontend, but can be accessed via cUrl
  Account.find(function(err, accounts){
    if(err){ return next(err); }

    res.json(accounts);
  });
});

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
