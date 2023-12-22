const session = require('express-session');

class FeeController {
    // [GET] /tinhtien/show
    show(req, res) {
        var info = req.session.info || null
        res.render('fee/show', { info });
    };

    statistics(req, res) {
        var info = req.session.info || null
        res.render('fee/statistics', { info });
    }

    create(req, res) {
        var info = req.session.info || null
        res.render('fee/create', { info });
    }
}
module.exports = new FeeController();