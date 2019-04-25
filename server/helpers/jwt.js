const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

module.exports = {
    jwtSign: (data) => {
        return jwt.sign(data, JWT_SECRET)
    },
    jwtVerify: (accessToken) => {
        try {
            return jwt.verify(accessToken, JWT_SECRET)
        }
        catch (error) {
            return null
        }
    }
}