const mongoose = require('mongoose')
const Schema = mongoose.Schema

const stockSchema = new Schema({
    watchlist: {type: String, required: true},
    symbol: {type: String, required: true},
    target: {type: Number, required: false},
    stop: {type: Number, required: false},
    description: {type: String, required: false},
    date: {type: Date, required: false}
})

const Stock = mongoose.model('Stock', stockSchema)
module.exports = Stock