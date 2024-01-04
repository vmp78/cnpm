const mongoose = require('mongoose');
const unidecode = require('unidecode');
//const slug = require('mongoose-slug-generator');
// const slug = require('mongoose-slug-plugin');

const Schema = mongoose.Schema;

const Resident = new Schema({
    Id: { type: String, required: true },
    name: { type: String, required: true },
    birthday: { type: String, required: true },
    gender: { type: String, required: true },
    phoneNumber : { type: String },
    email: { type: String },
    houseId: { type: String, required: true},
    relation: {type: String, required: true},
    statusResident: {type: String, required: true},
    deleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: {
        type: Date,
        default: null,
    },
});

// Resident.pre('save', function(next) {
//     this.Id = unidecode(this.name).toLowerCase().replace(/\s+/g, '').toLowerCase().replace(/\s+/g, '');

//     next();
// });

Resident.statics.delete = function(popId) {
    if (Array.isArray(popId)) {
        const validIds = popId.map(id => mongoose.Types.ObjectId(id));
        const updatePromises = validIds.map(id => {
            return this.findByIdAndUpdate(id, {
            deleted: true,
            deletedAt: new Date(),
            });
        });
  
        return Promise.all(updatePromises);
    } else {
        return this.findByIdAndUpdate(popId, {
            deleted: true,
            deletedAt: new Date(),
        });
        }
    };

// define restore
Resident.statics.restore = function (popId) {
    return this.findByIdAndUpdate(popId, {
        deleted: false,
        deletedAt: null,
    });
};

module.exports = mongoose.model('Resident', Resident);
