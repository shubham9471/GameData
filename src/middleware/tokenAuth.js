const jwt = require('jsonwebtoken')
const middleware = function (req, res, next) {
    try {
        let token = req.headers['x-api-key']
        if (!token) {
            return res.status(401).send({ status: false, msg: "no authentication token" })
        } else {
            let decodeToken = jwt.verify(token, 'secret_key')
            if (decodeToken) {
                req.decodeToken = decodeToken
                next()

            } else {
                res.status(401).send({ status: false, msg: "not a valid token" })
            }
        }

    } catch (error) {
        res.status(500).send({ status: false, msg: error })
    }


}
module.exports.middleware=middleware