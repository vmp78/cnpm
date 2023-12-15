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
        
        Auth.findOne({ 
            username: username,
            pass: pass,
            })
            .then(result => {
                if (result) {
                    // login succesfully
                    req.session.info = {
                        username: username,
                        pass: pass,
                    };

                    res.locals.username = username;
                    
                    res.redirect('/')
                } else {
                    res.redirect('back')
                }
            })
            .catch(next)
    }

    // [GET] /login
    logout(req, res, next) {
        delete req.session.info
        res.redirect('/')
        // res.redirect('/?logout=true')
    }
}



module.exports = new MeController();
