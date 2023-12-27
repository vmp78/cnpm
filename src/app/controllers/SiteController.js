const session = require('express-session');

class SiteController {
    // [GET] /
    home(req, res, next) {
        var info = req.session.info || null
        res.render('home', { info })
    }

    // [GET] /news/:slug
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
