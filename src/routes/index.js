const siteRouter = require('./site');
const meRouter = require('./me');
const PopRouter = require('./population');
const AccomRouter = require('./accommodation');
const feeRouter = require('./fee')

function route(app) {
    app.use('/me', meRouter);
    app.use('/pop', PopRouter);
    app.use('/accom', AccomRouter);
    app.use('/fee', feeRouter);
    app.use('/', siteRouter);
}

module.exports = route;