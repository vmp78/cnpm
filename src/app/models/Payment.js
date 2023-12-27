const mongoose = require('mongoose');
//const slug = require('mongoose-slug-generator');
// const slug = require('mongoose-slug-plugin');

const Schema = mongoose.Schema;

const Payment = new Schema({
    houseId: { type: String, required: true },
    name: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    status: { type: Boolean, required: true },
});

module.exports = mongoose.model('Payment', Payment);
