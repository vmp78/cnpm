const mongoose = require('mongoose');
//const slug = require('mongoose-slug-generator');
// const slug = require('mongoose-slug-plugin');

const Schema = mongoose.Schema;

const Accom = new Schema({
    houseId: { type: String, required: true , unique: true },
    area: { type: Number, required: true },
    parkingLot: { type: String },
    deleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: {
        type: Date,
        default: null,
    },
    owned: { type: Boolean, required: true},
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

// define restore
Accom.statics.restore = function (accomId) {
    return this.findByIdAndUpdate(accomId, {
        deleted: false,
        deletedAt: null,
    });
};

module.exports = mongoose.model('Acommodation', Accom);
