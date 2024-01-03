const Accom = require('../models/Accommodation');
const Fee = require('../models/Fee');
const Payment = require('../models/Payment');
const { multipleMongooseToObject, mongooseObject } = require('../../utils/mongoose');

class PaymentController {
    show(req, res, next) {
        var info = req.session.info || null
        Payment.find()
            .then((payment) => {
                Accom.find()
                    .then((accom) => {
                        Fee.find()
                            .then((fee) =>{
                                res.render('payment/show', {
                                    payment: multipleMongooseToObject(payment),
                                    fee: multipleMongooseToObject(fee),
                                    accom: multipleMongooseToObject(accom),
                                    info,
                                })
                            })
                            .catch(next)
                    })
                    .catch(next)
            })
            .catch(next)
    }

    edit(req, res, next) {
        var info = req.session.info || null
        Payment.findById(req.params.id)
            .then((payment) => {
                res.render('payment/edit', {
                    payment: mongooseObject(payment),
                    info,
                })
            })
            .catch(next)
    }

    restore(req, res, next) {
        Payment.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    update(req, res, next) {
        Payment.updateOne({ _id: req.params.id }, req.body)
            .then(async () => {
                res.redirect('/payment/show');
            })
            .catch(next);
    }
}
module.exports = new PaymentController();