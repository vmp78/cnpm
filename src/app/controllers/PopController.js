// const Authentication = require('../models/Authentication');
const exceljs = require('exceljs');
const Resident = require('../models/Resident');
const Accom = require('../models/Accommodation');
const { multipleMongooseToObject, mongooseObject } = require('../../utils/mongoose');

class PopController {
    // [GET] /pop
    show(req, res, next) {
        var info = req.session.info || null
        Accom.find({ deleted: false })
            .then((accom) => {
                Resident.find({ deleted: false })
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
        Resident.find({
            houseId: houseId,
            deleted: false,
        })
            .then((residents) => {
                const hasHouseholder = residents.some(resident => resident.relation === "Chủ hộ");
                // if (residents.some(resident => resident.relation === "Chủ hộ")) {
                //     res.send('Co roi em ơi')
                // } else {
                //     res.send('Deo co thang nao la chu ho')

                // Tiếp tục xử lý hoặc trả về phản hồi
                res.render('population/create', {
                    houseId,
                    hasHouseholder,
                });
            })
            .catch(next)
    }
    

    // [GET] /pop/store
    store(req, res, next) {
        const resident = new Resident(req.body);
        let dirHouseId;
        resident.save()
            .then((pop) => {
                dirHouseId = pop.houseId
                if (pop.relation === 'Chủ hộ') {
                    return Accom.updateOne({ houseId: pop.houseId }, { owned: true }).exec();
                }
            })
            .then(() => {
                var direct = '/pop/' + dirHouseId + '/detail';
                res.redirect(direct);
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

    // [DELETE] /pop/:id
    delete(req, res, next) {
        // res.json(req.params)
        Resident.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [DELETE] /pop/:id/permanent
    destroy(req, res, next) {
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

    // [GET] /pop/deleted-pops
    bin(req, res, next) {
        var info = req.session.info || null
        Resident.find({ deleted: true })
            .then((resident) => {
                res.render('population/deleted-pops', {
                    info,
                    resident: multipleMongooseToObject(resident),
                })
            })
            .catch(next)
    }

    // [PATCH] /pop/:id/restore
    restore(req, res, next) {
        Resident.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [GET] /:residentId/edit-2
    edit_2(req, res, next) {
        var info = req.session.info || null;
        let householderId;
        // res.json(req.params)
        Resident.findById(req.params.residentId)
            .then((pop) => {
                Resident.findOne({
                    houseId: pop.houseId,
                    relation: "Chủ hộ",
                })
                    .then((householder) => {
                        if (householder !== null)
                            householderId = householder._id
                            res.render('population/edit-2', {
                                info,
                                pop: mongooseObject(pop),
                                householderId,
                        })
                    })
                    .catch(next)
            })
            .catch(next)
    }

    // [PUT] /pop/:id
    update(req, res, next) {
        Resident.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/pop/renter'))
            .catch(next)
    }

    // [PUT] /:residentId/admin
    update_2(req, res, next) {
        // res.json(req.params)
        // res.json(link)
        Resident.updateOne({ _id: req.params.residentId }, req.body)
            .then(() =>{
                // res.json(req.body.houseId)
                let link = '/pop/' + req.body.houseId + '/detail';
                res.redirect(link)
            })
            .catch(next)
    }

    // [GET] /pop/:houseId/detail
    detail(req, res, next) {
        var info = req.session.info || null
        // res.json(req.params)
        Resident.find({
            houseId: req.params.houseId,
            deleted: false,
        })
            .then((resident) => {
                        res.render('population/detail', {
                            info,
                            resident: multipleMongooseToObject(resident),
                            houseId: req.params.houseId,
                        })
                    })
            .catch(next)
    }

    // [POST] /pop/search
    search(req, res, next) {
        var info = req.session.info || null
        // res.send(req.body.Id)
        Resident.findOne({
            Id: req.body.Id,
            deleted: false,
        })
            .then((resident) => {
                if (resident === null) {
                    res.redirect('back')
                };
                var link = '/pop/' + resident.houseId + "/detail";
                res.redirect(link);
            })
            .catch(next)
    }

    // [GET] /pop/export
    export(req, res, next) {
        Accom.find({ deleted: false })
        .then((accoms) => {
            Resident.find({ deleted: false })
            .then((residents) => {
                // Create a new workbook
                const workbook = new exceljs.Workbook();
                const worksheet = workbook.addWorksheet('Residents Data')

                // Add column headers
                const columns = [
                    { header: '#', key: 'index', width: 5 },
                    { header: 'Mã căn hộ', key: 'houseId', width: 15 },
                    { header: 'Tên chủ hộ', key: 'name', width: 20 },
                    { header: 'Số lượng nhân khẩu', key: 'count', width: 15 },
                ]
                worksheet.columns = columns;

                // Add data rows
                accoms.forEach((accom, index) => {
                    const houseId = accom.houseId
                    

                    const rowData = {
                        index: index + 1,
                        houseId: houseId,
                        name: (accom.owned) ? residents.find(r => r.houseId === houseId && r.relation === "Chủ hộ").name : 'Chưa có chủ hộ',
                        count: residents.filter(r => r.houseId === houseId ).length,
                    };
                    worksheet.addRow(rowData);
                });

                // Write the workbook to a buffer
                return workbook.xlsx.writeBuffer();
            })
            .then((buffer) => {
                // Set up response headers
                res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                res.setHeader('Content-Disposition', 'inline; filename=resident_data.xlsx');
            
                res.end(buffer);
            })
            .catch(next)
        })
        .catch(next)
    }

    // [GET] /pop/import
    import(req, res, next) {
        res.send('this is import')
    }
}



module.exports = new PopController();
