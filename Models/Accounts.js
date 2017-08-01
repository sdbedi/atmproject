let mongoose = require('mongoose');

let AccountSchema = new mongoose.Schema({
  PIN: Number,
  Balance: {type: Number, default: 10}
});

mongoose.model('Account', AccountSchema);