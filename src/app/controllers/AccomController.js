// const session = require('express-session');
const Accom = require('../models/Accommodation')
const { multipleMongooseToObject, mongooseObject } = require('../../utils/mongoose');

class PopController {
    // [GET] /accom
    show(req, res, next) {
        Accom.find({})
            .then((accom) => {
                res.render('accommodation/my-accommodation', {
                    accommodation: multipleMongooseToObject(accom)
                })
            })
            .catch(next)
    }

    // [GET] /accom/create
    create(req, res, next) {
        res.render('accommodation/create')
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
        // res.json(req.params)
        Accom.findById(req.params.id)
            .then((accom) => {
                // res.json(accom)
                res.render('accommodation/edit', {
                    accom: mongooseObject(accom),
                })
            })
            .catch(next)
    }
}



module.exports = new PopController();
