const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Expense = new Schema({
    room: { type: Number, required: true },
    room: { type: Number, required: true },
    water: { type: Number, required: true },
    carParking: { type: Number, required: true },
    motorbikeParking: { type: Number, required: true },
    bikeParking: { type: Number, required: true },
});

// Accom.statics.delete = function(accomId) {
//     if (Array.isArray(accomId)) {
//         const validIds = accomId.map(id => mongoose.Types.ObjectId(id));
//         const updatePromises = validIds.map(id => {
//             return this.findByIdAndUpdate(id, {
//             deleted: true,
//             deletedAt: new Date(),
//             });
//         });
  
//         return Promise.all(updatePromises);
//     } else {
//         return this.findByIdAndUpdate(accomId, {
//             deleted: true,
//             deletedAt: new Date(),
//         });
//         }
//     };

// // define restore
// Accom.statics.restore = function (accomId) {
//     return this.findByIdAndUpdate(accomId, {
//         deleted: false,
//         deletedAt: null,
//     });
// };

module.exports = mongoose.model('Expense', Expense);
