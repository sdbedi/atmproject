const mongoose = require('mongoose');
const findOrCreate = require('mongoose-find-or-create'); //third party NPM module to add find or create functionality to Mongoose

let AccountSchema = new mongoose.Schema({
  _id: Number,
  Balance: {type: Number, default: 10}
});

AccountSchema.plugin(findOrCreate);
mongoose.model('Account', AccountSchema);