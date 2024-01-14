const session = require('express-session');
const Auth = require('../models/Authentication')

class MeController {

    // [GET] /login
    login(req, res, next) {
        res.render('login')
    }

    // [POST] /login
    identyfy(req, res, next) {
        const username = req.body.username
        const pass = req.body.pass
        if (username === 'admin' && pass === 'admin') {
            // login succesfully
            // req.session.info = result;
            req.session.info = 'admin';
            // res.locals.username = username;
            res.locals.username = 'admin';
            res.redirect('/')
        } else {
            res.redirect('back')
        }
    }

    // [GET] /login
    logout(req, res, next) {
        delete req.session.info
        res.redirect('/')
        // res.redirect('/?logout=true')
    }
}



module.exports = new MeController();
