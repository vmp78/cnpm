const mongoose = require('mongoose');

const uri = 'mongodb+srv://ttphong148:Phong148@phong.gsxpxuh.mongodb.net/?retryWrites=true&w=majority';

async function connect() {
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Kết nối thành công!!!');
    } catch (error) {
        console.log('Kết nối thất bại!!!');
        console.error(error);
    }
}

module.exports = { connect };

// const mongoose = require('mongoose');

// async function connect() {
//     try {
//         await mongoose.connect('mongodb://127.0.0.1:27017/the_co_tam');
//         console.log('Connect successfully!!!');
//     } catch (error) {
//         console.log('Connect failue!!!');
//         console.log(error.stack);
//     }
// }

// module.exports = { connect };