const session = require('express-session');

class SiteController {
    // [GET] /
    home(req, res, next) {
        var info = req.session.info || 'none'
        res.render('home', { info: info })
    }

    // [GET] /news/:slug
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
