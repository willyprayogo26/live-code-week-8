const { User } = require('../models')
const { bcrypt, jwt } = require('../helpers')

class UserController {
    static register(req, res) {
        User.create({
            email: req.body.email,
            password: req.body.password,
        })
            .then(user => {
                res.status(201).json(user)
            })
            .catch(err => {
                if (err.errors.email) {
                    res.status(400).json({
                        message: err.errors.email.message
                    })
                } else if (err.errors.password) {
                    res.status(400).json({
                        message: err.errors.password.message
                    })
                } else {
                    res.status(500).json(err)
                }
            })
    }

    static login(req, res) {
        User.findOne({
            email: req.body.email
        })
            .then(user => {
                if (user && bcrypt.comparePassword(req.body.password, user.password)) {
                    let accessToken = jwt.jwtSign({
                        id: user._id
                    })
                    res.status(200).json({
                        id: user._id,
                        email: user.email,
                        accessToken: accessToken
                    })
                } else {
                    res.status(400).json({
                        message: 'Wrong username / password'
                    })
                }
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    }
}

module.exports = UserController