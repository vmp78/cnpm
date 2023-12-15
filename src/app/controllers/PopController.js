const session = require('express-session');
const Accom = require('../models/Accommodation')

class PopController {

    // [GET] /population/c
    create(req, res, next) {
        res.send('hahah')
    }
}



module.exports = new PopController();
