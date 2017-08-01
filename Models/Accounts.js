const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate')

let AccountSchema = new mongoose.Schema({
  PIN: Number,
  Balance: {type: Number, default: 10}
});

mongoose.model('Account', AccountSchema);