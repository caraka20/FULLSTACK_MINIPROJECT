const jwt = require('jsonwebtoken')

module.exports = {
    createJWT: (payload) => {
        try {
            return jwt.sign(payload, 'abc123',{
                expiresIn: '24h'
            })
        } catch (error) {
            return error
        }
    },

    verify: (req, res ,next) => {
        try {
            const {token} = req.body
            const decodeData = jwt.verify(token, 'abc123')
            req.dataToken = decodeData
            next()
        } catch (error) {
            console.log(error.message)
        }
    }
}
