var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var GadgetSchema = new Schema({
    Yoo: { type: String, required: true },
    Hoo: { type: Number, default: 10 },
   });

module.exports = Mongoose.model('gadgets', GadgetSchema);