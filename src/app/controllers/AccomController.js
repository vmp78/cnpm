// const session = require('express-session');
const Accom = require('../models/Accommodation')
const Resident = require('../models/Resident')
const { multipleMongooseToObject, mongooseObject } = require('../../utils/mongoose');

class PopController {
    // [GET] /accom/my-accommodations
    show(req, res, next) {
        var info = req.session.info || null
        Accom.find({ deleted: false })
            .then((accom) => {
                res.render('accommodation/my-accommodation', {
                    accommodation: multipleMongooseToObject(accom),
                    info,
                })
            })
            .catch(next)
    }

    // [GET] /accom/create
    create(req, res, next) {
        var info = req.session.info || null

        res.render('accommodation/create', { info })
    }

    // [POST] /accom/store
    store(req, res, next) {
        const accom = new Accom(req.body);
        // res.json(accom)
        accom.save()
            .then(() => {
                res.redirect('/accom/my-accommodations');
            })
            .catch(next);
    }

    // [GET] /accom/:id/edit
    edit(req, res, next) {
        var info = req.session.info || null
        // res.json(req.params)
        Accom.findById(req.params.id)
            .then((accom) => {
                // res.json(accom)
                res.render('accommodation/edit', {
                    accom: mongooseObject(accom),
                    info,
                })
            })
            .catch(next)
    }

    // [PUT] /accom/:id
    update(req, res, next) {
        // res.json(req.params)
        // res.json(req.body)
        Accom.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('my-accommodations'))
            .catch(next)
    }

    // [DELETE] /accom/:id
    delete(req, res, next) {
        // res.json(req.params)
        Accom.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [GET] /accom/deleted-accom
    bin(req, res, next) {
        var info = req.session.info || null

        Accom.find({ deleted: true })
            .then((accom) => {
                res.render('accommodation/deleted-accommodations', {
                    accommodation: multipleMongooseToObject(accom),
                    info,
                })
            })
            .catch(next)
    }

    // [PATCH] /accom/:id/restore
    restore(req, res, next) {
        Accom.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }


    // [DELETE] /accom/:id/permanent
    destroy(req, res, next) {
        Accom.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }
}

module.exports = new PopController();
