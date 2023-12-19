const session = require('express-session');

class TinhtienController {
    // [GET] /tinhtien
    show(req, res) {
        var info = req.session.info || null
        res.render('tinhtien/show', { info });
    }
}
module.exports = new TinhtienController();