const Accom = require('../models/Accommodation');
const Fee = require('../models/Fee');
const Payment = require('../models/Payment');
const { multipleMongooseToObject, mongooseObject } = require('../../utils/mongoose');

class PaymentController {
    show(req, res, next) {
        var info = req.session.info || 'none'
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

    // pay(req, res, next) {
    //     var info = req.session.info || 'none'
    //     Payment.find()
    //         .then((payment) => {

    //         })
    //         .catch(next)
    // }
}
module.exports = new PaymentController();