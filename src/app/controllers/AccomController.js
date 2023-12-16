const session = require('express-session');
const Accom = require('../models/Accommodation')

class PopController {
    // [GET] /accom
    show(req, res, next) {
        res.render('accommodation/my-accommodation')
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
}



module.exports = new PopController();
