

class PayController {
    // [GET] /payment/show
    show(req, res) {
        var info = req.session.info || null
        res.render('payment/show', { info });
    }

    // [GET] /payment/edit
    edit(req, res) {
        var info = req.session.info || null
        res.render('payment/edit', { info });
    }

    // [GET] /payment/edit
    update(req, res) {
        var info = req.session.info || null
        res.render('payment/edit', { info });
    }
}

module.exports = new PayController();
