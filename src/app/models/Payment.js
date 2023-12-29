const mongoose = require('mongoose');
const moment = require('moment');
//const slug = require('mongoose-slug-generator');
// const slug = require('mongoose-slug-plugin');

const Schema = mongoose.Schema;

const Payment = new Schema({
    houseId: { type: String, required: true },
    feeId: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    status: { type: Boolean, required: true },
    paid: {type: Number, required: false},
    payDate: {type: String},
    note: {type: String},
});

module.exports = mongoose.model('Payment', Payment);
