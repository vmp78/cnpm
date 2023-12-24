const mongoose = require('mongoose');
//const slug = require('mongoose-slug-generator');
// const slug = require('mongoose-slug-plugin');

const Schema = mongoose.Schema;

const Resident = new Schema({
    Id: { type: String, required: true },
    name: { type: String, required: true },
    age: { type: String, required: true },
    gender: { type: String, required: true },
    phoneNumber : { type: String },
    email: { type: String },
    houseId: { type: String, required: true },
    isHouseholder: { type: Boolean, required: true },
});

module.exports = mongoose.model('Resident', Resident);
