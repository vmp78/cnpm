const session = require('express-session');

class PayController {
    // [GET] /payment/show
    show(req, res) {
        var info = req.session.info || null
        res.render('payment/show', { info });
    }
}

module.exports = new PayController();
