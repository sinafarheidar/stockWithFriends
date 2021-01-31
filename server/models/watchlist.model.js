const mongoose = require('mongoose')
const Schema = mongoose.Schema

const watchlistSchema = new Schema({
    name: {type: String, required: true},
    creator: {type: String, required: true},
    id: {type: String, required: true}
})

const Watchlist = mongoose.model('Watchlist', watchlistSchema)
module.exports = Watchlist