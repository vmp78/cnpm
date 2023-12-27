const mongoose = require('mongoose');
const unidecode = require('unidecode');
//const slug = require('mongoose-slug-generator');
// const slug = require('mongoose-slug-plugin');

const Schema = mongoose.Schema;

const Resident = new Schema({
    Id: { type: String },
    name: { type: String, required: true },
    age: { type: String, required: true },
    gender: { type: String, required: true },
    phoneNumber : { type: String },
    email: { type: String },
    houseId: { type: String, required: true },
    isHouseholder: { type: Boolean, required: true },
});

Resident.pre('save', function(next) {
    this.Id = unidecode(this.name).toLowerCase().replace(/\s+/g, '').toLowerCase().replace(/\s+/g, '');

    next();
});

module.exports = mongoose.model('Resident', Resident);
