var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var inventorySchema = new Schema({
      brandName: {type: String, required:false},
      itemName: {type: String, required:false},
      expirationMonth: {type: Number, required: false},
      expirationDay: {type: Number, required: false},
      expirationYear: {type: Number, required: false},
      quantity: {type: Number, required: false},
      location: {type: String, required: false},
      createdAt: {type: Date},
      updatedAt: {type: Date}
    });

module.exports = mongoose.model('Food', inventorySchema);
