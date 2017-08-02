const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
//const findOrCreate = require('mongoose-findorcreate')
const findOrCreate = require('mongoose-find-or-create'); //mtimofiiv
module.exports = app;


const mongoose = require('mongoose');
require('../models/Accounts');

mongoose.connect(process.env.MONGODB_URI ||'mongodb://localhost/news');

let Account = mongoose.model('Account');
//console.log(Account.findOrCreate)

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

app.get('/findOrCreate', function(req, res, next) { //TODO: refactor for promise support
  Account.findOrCreate({PIN: 1234}, function(err, click, created) {
    // created will be true here
    console.log('A new account was inserted', click);
    Account.findOrCreate({}, function(err, click, created) {
      // created will be false here
      console.log('Did not create a new account', click);
    })
  });
  Account.findOrCreate({PIN: 5678}, function(err, click, created) {
    // created will be true here
    console.log('A new account was inserted', click);
    Account.findOrCreate({}, function(err, click, created) {
      // created will be false here
      console.log('Did not create a new account', click);
    })
  });
});

app.get('/login/:PIN', function(req, res, next) {
    // let search = new Account(req.params);
    // console.log("search", search);
    // search.save(function(err, search){
    //   if(err){ return next(err); }
    //   //res.json(search);
    // });
    let objForStorage = req.params;
    console.log("params", req.params)
  //   Account.findOrCreate(objForStorage, function(err, acct, created) {
  //   // created will be true here
  //   console.log('A new account was inserted', acct);
  //   res.json(acct)
  //   Account.findOrCreate({}, function(err, acct, created) {
  //     // created will be false here
  //     console.log('Did not create a new account', acct);
  //     res.json(acct)
  //   })
  // });
  Account.findOrCreate(objForStorage, (err, result) => {
  // my new or existing model is loaded as result
    console.log(result) 
    res.json(result)
  })
});


app.get('/transaction/:PIN/:type/:amount', function(req, res, next) { //one route to handles credits and withdrawals
    let objForStorage = req.params;
    console.log("params", req.params)
  //   Account.findOrCreate(objForStorage, function(err, acct, created) {
  //   // created will be true here
  //   console.log('A new account was inserted', acct);
  //   res.json(acct)
  //   Account.findOrCreate({}, function(err, acct, created) {
  //     // created will be false here
  //     console.log('Did not create a new account', acct);
  //     res.json(acct)
  //   })
  // });
  Account.findOrCreate(objForStorage, (err, result) => {
  // my new or existing model is loaded as result
    console.log(result) 
    res.json(result)
  })
});

//app.pos

//The route below clears all saved search from the DB. Uncomment to enable. 
//Note: this route is NOT connected to the Front End AT ALL. It can accessed through curl or the browser bar by appending '/wipe' tp whatever the base url is.

app.get('/wipe', function(req, res, next) { 
  Account.remove({}, function(err) { 
   console.log('account removed') 
  });
});


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname,  '../client/', 'index.html'));
});

var port = process.env.PORT || 4040;
app.listen(port);
console.log("Listening on port " + port);
