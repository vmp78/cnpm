const Authentication = require('../models/Authentication');
const Resident = require('../models/Resident');
const Accom = require('../models/Accommodation');
const { multipleMongooseToObject, mongooseObject } = require('../../utils/mongoose');

class PopController {
    // [GET] /pop
    show(req, res, next) {
        var info = req.session.info || null
        Accom.find({})
            .then((accom) => {
                Resident.find()
                    .then((resident) => {
                        // res.json(subResident)
                        res.render('population/my-populations', {
                            accom: multipleMongooseToObject(accom),
                            resident: multipleMongooseToObject(resident),
                            info,
                        })
                    })
                    .catch(next)
            })
        .catch(next)
    }
    

    // [GET] /pop/create
    create(req, res, next) {
        // Lấy giá trị houseId từ tham số động trong URL
        const houseId = req.params.id;
    
        // Tiếp tục xử lý hoặc trả về phản hồi
        res.render('population/create', { houseId: houseId });
    }
    

    // [GET] /pop/store
    store(req, res, next) {
        const resident = new Resident(req.body);
        resident.save()
            .then((pop) => {
                if (pop.relation === 'Chủ hộ') {
                    return Accom.updateMany({ houseId: pop.houseId }, { owned: true }).exec();
                }
            })
            .then(() => {
                res.redirect('/pop/');
            })
            .catch(next);
    }

    // [GET] /pop/renter
    renter(req, res, next) {
        var info = req.session.info || null
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
            Resident.findOne({ _id: req.params.id }) //
            .then((pop) => {
                console.log(pop);
                if (pop.relation === 'Chủ hộ') {
                    return Accom.updateMany({ houseId: pop.houseId }, { owned: false }).exec();
                }
            })
            .then(() => {
                return Resident.findOneAndDelete({ _id: req.params.id }).exec();
            })
            .then(() => {
                res.redirect('back');
            })
            .catch(next);
    }

    // [GET] /pop/:id/edit
    edit(req, res, next) {
        var info = req.session.info || null
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
        var info = req.session.info || null
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
        Accom.findById(req.params.id)
            .then((accom) => {
                Resident.find({ houseId: accom.houseId })
                    .then((resident) => {
                        res.render('population/detail', {
                            info,
                            accom: mongooseObject(accom),
                            resident: multipleMongooseToObject(resident),
                            _id: req.params.id,
                        })
                    })
                    .catch(next)
            })
            .catch(next)
    }
}



module.exports = new PopController();
