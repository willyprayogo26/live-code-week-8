const express = require('express')
const router = express.Router()

const { ApodController } = require('../controllers')

router.get('/', ApodController.getAllApod)
router.get('/:id', ApodController.getApodById)
router.post('/', ApodController.addApod)
router.delete('/:id', ApodController.deleteApod)
router.put('/:id', ApodController.updateApod)

module.exports = router