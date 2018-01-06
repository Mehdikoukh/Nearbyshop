var mongoose        = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator')

var UserSchema = mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  preferredShops: [],
  dislikedShops: []
});

UserSchema.plugin(uniqueValidator)

var passportLocalMongoose = require("passport-local-mongoose");

var User = module.exports = mongoose.model('User', UserSchema);