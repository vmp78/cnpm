const mongoose = require('mongoose');
//const slug = require('mongoose-slug-generator');
// const slug = require('mongoose-slug-plugin');

const Schema = mongoose.Schema;

const Auth = new Schema({
    username: { type: String, required: true , unique: true },
    pass: { type: String, required: true },
    fullname: { type: String, required: true },
    birth: { type: String, required: true },
    phoneNumber : { type: String },
    email: { type: String },
    householer: { type: String, require: true },
    houseId: { type: String, require: true },
});

module.exports = mongoose.model('ClientInfo', Auth);
