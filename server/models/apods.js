const mongoose = require('mongoose')
const Schema = mongoose.Schema

const apodSchema = new Schema ({
    date: String,
    title: String,
    desc: String,
    url: String,
    mediaType: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: {}
})

const Apod = mongoose.model('Apod', apodSchema)

module.exports = Apod