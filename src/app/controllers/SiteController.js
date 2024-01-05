const session = require('express-session');
const Accom = require('../models/Accommodation');
const Resident = require('../models/Resident');
const { multipleMongooseToObject, mongooseObject } = require('../../utils/mongoose');

class SiteController {
    // [GET] /
    home(req, res, next) {
        var info = req.session.info || null
        Resident.find({ deleted: false })
            .then((resident) => {
                Accom.find({ deleted: false })
                    .then((accom) =>{
                        res.render('home', {
                            info,
                            resident: multipleMongooseToObject(resident),
                            accom: multipleMongooseToObject(accom),
                        })
                    })
                    .catch(next)
            })
            .catch(next)
    }
}

module.exports = new SiteController();
