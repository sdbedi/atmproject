const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
module.exports = app;

const mongoose = require('mongoose');
require('../models/Accounts');

mongoose.connect(process.env.MONGODB_URI ||'mongodb://localhost/news');

let Account = mongoose.model('Account');

Account.remove({}, function(err) {  //wipe DB on startup
   console.log('account removed on startup'); 
});

[{_id: 1234, Balance: 100}, {_id: 4321}].forEach((entry)=>{var newAccount = new Account(entry); //pre load some dummy data
console.log("newAccount: ", newAccount);
  newAccount.save(function (err, entry) {
    if (err) {
      return console.error(err);
    } else {
      console.log(entry);
    }
  });
})


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static('client'));

app.get('/accounts', function(req, res, next) { //route for getting all accounts - not linked to frontend, but can be accessed via cUrl
  Account.find(function(err, accounts){
    if(err){ 
      return next(err); 
    };
    res.json(accounts);
  });
});

app.get('/login/:_id', function(req, res, next) {
  let acctForStorage = req.params;
  console.log("params", req.params);
  Account.findOrCreate(acctForStorage, (err, result) => {
    console.log("result: ", result); 
    res.json(result);
  })
});

app.get('/transaction/:PIN/:type/:amount', function(req, res, next) { //one route to handles credits and withdrawals
  console.log("transaction params", req.params);
  let transactionForStorage = req.params;
  transactionForStorage.amount = Number(transactionForStorage.amount);
  if (transactionForStorage.type === "withdraw") {
    transactionForStorage.amount = transactionForStorage.amount * (-1);
  }
  console.log("transaction: ", transactionForStorage);
  Account.findById({_id: req.params.PIN}, function (err, acct) {
    if (err) {console.log(err)};
  
    if (acct.Balance + transactionForStorage.amount <= 0) { //wont let the acct go into negative balance. 
      transactionForStorage.amount = acct.Balance;
      acct.Balance = 0;
    } else {
      acct.Balance += transactionForStorage.amount;
    }
    acct.save(function (err, updatedAcct) {
      if (err) {console.log(err)};

      console.log("updated acct: ", updatedAcct);
      let objForReturn = {Balance: updatedAcct.Balance, Amount: Math.abs(transactionForStorage.amount)};
      console.log(objForReturn);
      res.json(objForReturn);
    });
  });
});

//app.pos

//The route below clears all saved documents from the DB. Uncomment to enable. 
//Note: this route is NOT connected to the Front End AT ALL. It can accessed through curl or the browser bar by appending '/wipe' tp whatever the base url is.

app.get('/wipe', function(req, res, next) { 
  Account.remove({}, function(err) { 
   console.log('account removed'); 
  });
});


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname,  '../client/', 'index.html'));
});

var port = process.env.PORT || 4040;
app.listen(port);
console.log("Listening on port " + port);
