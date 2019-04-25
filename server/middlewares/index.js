const { jwt } = require('../helpers')
const { User } = require('../models')

module.exports = {
    isLogin: (req, res, next) => {
        console.log(req.headers)
        let payload = jwt.jwtVerify(req.headers["access-token"])
        if(payload) {
            User.findById(payload.id)
            .then(user => {
                if(user) {
                    req.user = {
                        id: user._id,
                        email: user.email,
                        accessToken: req.headers.accessToken,
                    }
                    next()
                } else {
                    res.status(401).json({
                        message: 'User not found'
                    })
                }
            })
            .catch(err => {
                res.send(500).json({
                    message: err.message
                })
            })
        } else {
            res.send(401).json({
                message: 'Please provide a valid accessToken'
            })
        }
    }
}