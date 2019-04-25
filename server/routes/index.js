const express = require('express')
const router = express.Router()
const userRouter = require('./users')
const apodRouter = require('./apods')
const { isLogin } = require('../middlewares')

router.use('/', userRouter)

router.use(isLogin)
router.use('/apods', apodRouter)

module.exports = router