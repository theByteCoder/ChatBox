const moment = require('moment')

const devLogger = (req, res, next) => {
    process.env.ENV === 'dev' && console.log(`\n${moment().format()} ${req.protocol}://${req.get('host')}${req.originalUrl}`)
    next()
}

module.exports = devLogger