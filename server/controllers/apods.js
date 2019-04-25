const { Apod } = require('../models')

const axios = require('axios')

class ApodController {
    static getAllApod(req, res) {
        Apod.find({
            userId: req.user.id
        })
            .sort({ createdAt: 'descending' })
            .then(apods => {
                res.status(200).json(apods)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    }

    static getApodById(req, res) {
        Apod.findById(req.params.id)
            .then(apod => {
                res.status(200).json(apod)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    }

    static addApod(req, res) {
        axios.get(`https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}&date=${req.body.date}`)
            .then(({ data }) => {
                return Apod.create({
                    date: data.date,
                    title: data.title,
                    desc: data.explanation,
                    url: data.url,
                    mediaType: data.media_type,
                    userId: req.user.id
                })
            })
            .then(apod => {
                res.status(201).json(apod)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    }

    static updateApod(req, res) {
        axios.get(`https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}&date=${req.body.date}`)
            .then(({ data }) => {
                return Apod.findByIdAndUpdate(req.params.id, {
                    date: data.date,
                    title: data.title,
                    desc: data.explanation,
                    url: data.url,
                    mediaType: data.media_type
                }, {
                        new: true
                    })
            })
            .then(apod => {
                if (apod) {
                    res.status(200).json(apod)
                } else {
                    res.status(404).json({
                        message: 'Apod not found'
                    })
                }
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    }

    static deleteApod(req, res) {
        Apod.findByIdAndDelete(req.params.id)
            .then(apod => {
                if (apod) {
                    res.status(200).json(apod)
                } else {
                    res.status(404).json({
                        message: 'Apod not found'
                    })
                }
            })
            .catch(err => {
                res.send(500).json(err.message)
            })
    }
}

module.exports = ApodController