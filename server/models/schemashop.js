var mongoose        = require('mongoose');


var ShopSchema = mongoose.Schema({
  picture:{ type: String, required: true },
  name:{ type: String, required: true },
  email:{ type: String, required: true },
  city:{ type: String, required: true },
  location:{ type: Object, required: true }
});


var Shop = module.exports = mongoose.model('Shop', ShopSchema);