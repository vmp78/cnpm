const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/the_co_tam');
        console.log('Connect successfully!!!');
    } catch (error) {
        console.log('Connect failue!!!');
        console.log(error.stack);
    }
}

module.exports = { connect };
