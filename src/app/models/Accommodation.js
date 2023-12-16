const mongoose = require('mongoose');
//const slug = require('mongoose-slug-generator');
// const slug = require('mongoose-slug-plugin');

const Schema = mongoose.Schema;

const Accom = new Schema({
    houseId: { type: String, required: true , unique: true },
    householder: { type: String,default: 'unrented', required: true },
    area: { type: Number, required: true },
    parkingLot: { type: String, default: 'none', required: true },
});

module.exports = mongoose.model('Acommodation', Accom);
