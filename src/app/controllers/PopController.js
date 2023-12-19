const Authentication = require('../models/Authentication');
const session = require('express-session');
const Accom = require('../models/Accommodation')
const { multipleMongooseToObject, mongooseObject } = require('../../utils/mongoose');

class PopController {
    // [GET] /pop
    show(req, res, next) {
        var info = req.session.info || 'none'
        res.render('population/my-populations', { info: info })
}
    // [GET] /pop/create
    create(req, res, next) {
        res.render('population/create')
    }

    // [GET] /pop/store
    store(req, res, next) {
        const auth = new Authentication(req.body);
        auth.save()
            .then(() => {
                res.redirect('/');
            })
            .catch(next);
    }

    // [GET] /pop/renter
    renter(req, res, next) {
        var info = req.session.info || 'none'
        Authentication.find({ householer: info.householer })
            .then((renters) => {
                res.render('population/renter', {
                    info: info,
                    renters: multipleMongooseToObject(renters),
                })
            })
            .catch(next)
    }
}



module.exports = new PopController();
