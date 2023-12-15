module.exports = function AuthMiddleware(req, res, next) {
    if (req.session.info.username === 'anonymous' && req.session.info.pass === 'anonymous')
        
    next()
}