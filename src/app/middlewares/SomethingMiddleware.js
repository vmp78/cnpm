module.exports = function SomethingMiddleware(req, res, next) {
    res.locals.headerData = req.session.info || {};
    next()
}
