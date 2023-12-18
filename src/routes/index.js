const siteRouter = require('./site');
const meRouter = require('./me');
const PopRouter = require('./population');
const AccomRouter = require('./accommodation');
const PayRouter = require('./payment');

function route(app) {
    app.use('/me', meRouter);
    app.use('/pop', PopRouter);
    app.use('/accom', AccomRouter);
    app.use('/payment', PayRouter);
    app.use('/payment', PayRouter);
    app.use('/', siteRouter);
}

module.exports = route;