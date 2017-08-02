const mongoose = require('mongoose');
//const findOrCreate = require('mongoose-findorcreate'); //third party NPM module to add find or create functionality to Mongoose
const findOrCreate = require('mongoose-find-or-create'); //mtimofiiv

let AccountSchema = new mongoose.Schema({
  PIN: Number,
  Balance: {type: Number, default: 10}
});

AccountSchema.plugin(findOrCreate);
mongoose.model('Account', AccountSchema);