const session = require('express-session');

class PayController {
    // [GET] /payment/show
    show(req, res) {
        res.render('payment/show');
    }
}

module.exports = new PayController();
