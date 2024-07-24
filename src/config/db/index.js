require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.DATABASE_URL;

async function connect() {
    console.log(uri);
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Kết nối thành công!!!');
    } catch (error) {
        console.log('Kết nối thất bại!!!');
        console.error(error);
    }
}

module.exports = { connect };
