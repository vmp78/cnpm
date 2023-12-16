const Authentication = require('../models/Authentication');
const session = require('express-session');
const Accom = require('../models/Accommodation')

class PopController {
    // [GET] /pop
    show(req, res, next) {
        res.render('population/my-population')
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
}



module.exports = new PopController();
