const mongoose = require('mongoose');
const moment = require('moment');

const Accom = require('./Accommodation'); 
const Payment = require('./Payment');

const Schema = mongoose.Schema;

const Fee = new Schema({
    feeId: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    rate: { type: Number, required: true },
    time: {
        type: String,
        default: function () {
            return moment().format('YYYY-MM-DD');
        },
        required: true,
        get: function (time) {
            return moment(time).format('YYYY-MM-DD');
        }
    },
    deadline: { type: String, required: true },
    type: { type: String, required: true },
    note: { type: String, required: false },
});

// const createOrUpdatePayment = async function (doc, next) {
//     try {
//         const accommodations = await Accom.find();

//         const paymentPromises = accommodations.map(async (accom) => {
//             const paymentData = {
//                 houseId: accom.houseId,
//                 name: doc.name,
//                 totalPrice: doc.rate * accom.area,
//                 status: false, 
//             };

//             let payment;

//             if (this.op === 'update') {
//                 payment = await Payment.findOneAndUpdate(
//                     { houseId: accom.houseId, name: doc.name },
//                     paymentData,
//                     { upsert: true, new: true }
//                 );
//             } else if (this.op === 'delete') {
//                 payment = await Payment.findOneAndDelete({
//                     houseId: accom.houseId,
//                     name: doc.name,
//                 });
//             } else {
//                 payment = new Payment(paymentData);
//                 await payment.save();
//             }
//         });
//         await Promise.all(paymentPromises);

//         next();
//     } catch (error) {
//         next(error);
//     }
// };

// Fee.post('save', createOrUpdatePayment);
// Fee.post('findOneAndUpdate', createOrUpdatePayment);
// Fee.post('findOneAndDelete', createOrUpdatePayment);

module.exports = mongoose.model('Fee', Fee);

