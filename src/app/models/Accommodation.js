const mongoose = require('mongoose');
//const slug = require('mongoose-slug-generator');
const slug = require('mongoose-slug-plugin');

const Schema = mongoose.Schema;

const Auth = new Schema({
    username: { type: String, required: true , unique: true },
    pass: { type: String, required: true },
    householer: { type: String, require: true },
    houseId: { type: String, require: true },
    phoneNumber : { type: String },
    email: { type: String },
});

module.exports = mongoose.model('ClientInfo', Auth);
