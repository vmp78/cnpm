const session = require('express-session');
const Fee = require('../models/Fee');
const Accom = require('../models/Accommodation');
const Payment = require('../models/Payment');
const { multipleMongooseToObject, mongooseObject } = require('../../utils/mongoose');

class FeeController {
    // [GET] /fee/show
    show(req, res, next) {
        var info = req.session.info || 'none'
        Fee.find()
            .then((fee) => {
                res.render('fee/show', {
                    fee: multipleMongooseToObject(fee),
                    info,
                })
            })
            .catch(next)
    }

    create(req, res, next) {
        var info = req.session.info || 'none'
        res.render('fee/create', { info })
    }

    // store(req, res, next) {
    //     const fee = new Fee(req.body);
    //     // res.json(accom)
    //     fee.save()
    //         .then(() => {
    //             res.redirect('/fee/show');
    //         })
    //         .catch(next);
    // }
    store(req, res, next) {
        const fee = new Fee(req.body);

        fee.save()
            .then(async () => {
                // Create Payment when Fee is saved
                const accommodations = await Accom.find();

                const paymentPromises = accommodations.map(async (accom) => {
                    const paymentData = {
                        houseId: accom.houseId,
                        feeId: fee.feeId,
                        totalPrice: fee.rate * accom.area,
                        status: false,
                        paid: 0,
                    };

                    const payment = new Payment(paymentData);
                    await payment.save();
                });

                await Promise.all(paymentPromises);

                res.redirect('/fee/show');
            })
            .catch(next);
    }

    // [GET] /accom/:id/edit
    edit(req, res, next) {
        var info = req.session.info || 'none'
        Fee.findById(req.params.id)
            .then((fee) => {
                res.render('fee/edit', {
                    fee: mongooseObject(fee),
                    info,
                })
            })
            .catch(next)
    }
    restore(req, res, next) {
        Fee.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }
    // [PUT] /accom/:id
    // update(req, res, next) {
    //     // res.json(req.params)
    //     // res.json(req.body)
    //     Fee.updateOne({ _id: req.params.id }, req.body)
    //         .then(() => res.redirect('show'))
    //         .catch(next)
    // }
    // delete(req, res, next) {
    //     Fee.deleteOne({ _id: req.params.id })
    //         .then(() => res.redirect('back'))
    //         .catch(next)
    // }


    update(req, res, next) {
        Fee.updateOne({ _id: req.params.id }, req.body)
            .then(async () => {
                // Update Payment when Fee is updated
                const fee = await Fee.findById(req.params.id);
                const accommodations = await Accom.find();

                const paymentPromises = accommodations.map(async (accom) => {
                    const paymentData = {
                        houseId: accom.houseId,
                        feeId: fee.feeId,
                        totalPrice: fee.rate * accom.area,
                    };

                    const payment = await Payment.findOneAndUpdate(
                        { houseId: accom.houseId, feeId: fee.feeId },
                        paymentData,
                        { upsert: true, new: true }
                    );
                });

                await Promise.all(paymentPromises);

                res.redirect('/fee/show');
            })
            .catch(next);
    }

    delete(req, res, next) {
        Fee.findByIdAndDelete(req.params.id)
            .then(async (fee) => {
                // Delete Payment when Fee is deleted
                const accommodations = await Accom.find();

                const paymentPromises = accommodations.map(async (accom) => {
                    await Payment.findOneAndDelete({ houseId: accom.houseId, feeId: fee.feeId });
                });

                await Promise.all(paymentPromises);

                res.redirect('back');
            })
            .catch(next);
    }
}
module.exports = new FeeController();