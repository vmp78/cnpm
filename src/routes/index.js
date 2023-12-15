const siteRouter = require('./site');
const meRouter = require('./me');
const PopRouter = require('./population');


function route(app) {
    app.use('/me', meRouter);
    app.use('/pop', PopRouter);
    app.use('/', siteRouter);
}

module.exports = route;