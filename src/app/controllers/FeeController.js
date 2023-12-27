const session = require('express-session');
const Fee = require('../models/Fee');
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

    store(req, res, next) {
        const fee = new Fee(req.body);
        // res.json(accom)
        fee.save()
            .then(() => {
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
    update(req, res, next) {
        // res.json(req.params)
        // res.json(req.body)
        Fee.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('show'))
            .catch(next)
    }
    delete(req, res, next) {
        Fee.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }
}
module.exports = new FeeController();