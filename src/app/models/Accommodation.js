const mongoose = require('mongoose');
//const slug = require('mongoose-slug-generator');
// const slug = require('mongoose-slug-plugin');

const Schema = mongoose.Schema;

const Accom = new Schema({
    houseId: { type: String, required: true , unique: true },
    householder: { type: String,default: 'unrented', required: true },
    area: { type: Number, required: true },
    parkingLot: { type: String, default: 'none', required: true },
    deleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: {
        type: Date,
        default: null,
    },
});

Accom.statics.delete = function(accomId) {
    if (Array.isArray(accomId)) {
        const validIds = accomId.map(id => mongoose.Types.ObjectId(id));
        const updatePromises = validIds.map(id => {
            return this.findByIdAndUpdate(id, {
            deleted: true,
            deletedAt: new Date(),
            });
        });
  
        return Promise.all(updatePromises);
    } else {
        return this.findByIdAndUpdate(accomId, {
            deleted: true,
            deletedAt: new Date(),
        });
        }
    };

module.exports = mongoose.model('Acommodation', Accom);
