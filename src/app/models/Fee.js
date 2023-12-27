const mongoose = require('mongoose');
const moment = require('moment');

const Schema = mongoose.Schema;

const Fee = new Schema({
    name: { type: String, required: true, unique: true },
    rate: { type: Number, required: true },
    time: {
        type: String,
        default: function () {
            return moment().format('YYYY-MM-DD');
        },
        required: true,
        get: function (time) {
            // Sử dụng moment để định dạng thời gian khi lấy từ cơ sở dữ liệu
            return moment(time).format('YYYY-MM-DD');
        }
    },
    deadline: { type: String, required: true },
    type: { type: String, required: true },
    note: { type: String, required: false },
});

module.exports = mongoose.model('Fee', Fee);

