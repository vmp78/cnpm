const Authentication = require('../models/Authentication');
const Resident = require('../models/Resident');
const { multipleMongooseToObject, mongooseObject } = require('../../utils/mongoose');

class PopController {
    // [GET] /pop
    show(req, res, next) {
        var info = req.session.info || 'none'
        // Authentication.distinct('householer')
        //     .then((pop) => res.render('population/my-populations', {
        //         info,
        //         pop,
        //     }))
        //     .catch(next)

        // Resident.find({ isHouseholder: true })
        // .then((resident) => {
        //     // res.json(resident)
        //     res.render('population/my-populations', {
        //         resident: multipleMongooseToObject(resident),
        //         info,
        //     })
        // })
        // .catch(next)

        Resident.find({ isHouseholder: true })
        .then((resident) => {
            // res.json(resident)
            Resident.find({ isHouseholder: false })
                .then((subResident) => {
                    // res.json(subResident)
                    res.render('population/my-populations', {
                        resident: multipleMongooseToObject(resident),
                        subResident: multipleMongooseToObject(subResident),
                        info,
                    })
                })
                .catch(next)
        })
        .catch(next)
    }
    
    // [GET] /pop/create
    create(req, res, next) {
        res.render('population/create')
    }

    // [GET] /pop/store
    store(req, res, next) {
        // const auth = new Authentication(req.body);
        // auth.save()
        const resident = new Resident(req.body);
        resident.save()
            .then(() => {
                res.redirect('/');
            })
            .catch(next);
    }

    // [GET] /pop/renter
    renter(req, res, next) {
        var info = req.session.info || 'none'
        // Authentication.find({ householer: info.householer })
        // Resident.find({ Id: info })
        //     .then((renters) => {
        //         res.render('population/renter', {
        //             info: info,
        //             renters: multipleMongooseToObject(renters),
        //         })
        //     })
        //     .catch(next)

        Resident.findOne({ Id: info})
            .then((resident) => {
                const houseId = resident.houseId;
                
                Resident.find({ houseId: houseId })
                    .then((renters) => {
                        res.render('population/renter', {
                            info: info,
                            renters: multipleMongooseToObject(renters),
                        })
                    })
                    .catch(next)
            })
            .catch(next)
    }

    // [GET] /pop/deleted-pops
    delete(req, res, next) {
        // var info = req.session.info || 'none'
        // Authentication.find({ householer: info.householer })
        //     .then((renters) => {
        //         res.render('population/renter', {
        //             info: info,
        //             renters: multipleMongooseToObject(renters),
        //         })
        //     })
        //     .catch(next)
        res.render('population/deleted-pops')
    }

    // [GET] /pop/:id/edit
    edit(req, res, next) {
        var info = req.session.info || 'none'
        Resident.findById(req.params.id)
            .then((pop) => {
                res.render('population/edit', {
                    info,
                    pop: mongooseObject(pop),
                })
            })
            .catch(next)
    }

    // [GET] /:residentId/:householderId/edit
    edit_2(req, res, next) {
        var info = req.session.info || 'none'
        // res.json(req.params)
        Resident.findById(req.params.residentId)
            .then((pop) => {
                res.render('population/edit-2', {
                    info,
                    pop: mongooseObject(pop),
                    householderId: req.params.householderId,
                })
            })
            .catch(next)
    }

    // [PUT] /pop/:id
    update(req, res, next) {
        Resident.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/pop/renter'))
            .catch(next)
    }

    // [PUT] /:residentId/:householderId/admin
    update_2(req, res, next) {
        // res.json(req.params)
        var link = '/pop/' + req.params.householderId + '/detail';
        // res.json(link)
        Resident.updateOne({ _id: req.params.residentId }, req.body)
            .then(() => res.redirect(link))
            .catch(next)
    }

    // [GET] /pop/:id/detail
    detail(req, res, next) {
        var info = req.session.info || 'none'
        // res.json(req.params)
        Resident.findById(req.params.id)
            .then((pop) => {
                var houseId = pop.houseId
                Resident.find({ houseId: houseId })
                    .then((pops) => {
                        res.render('population/detail', {
                            info,
                            pop: multipleMongooseToObject(pops),
                            _id: req.params.id,
                        })
                    })
                    .catch(next)
            })
            .catch(next)
    }
}



module.exports = new PopController();
