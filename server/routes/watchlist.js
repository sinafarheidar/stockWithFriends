const router = require('express').Router()
let Watchlist = require('../models/watchlist.model')

router.get('/', (req, res) => {
    Watchlist.find()
    .then(user => res.json(user))
    .catch(err => console.log(err))
})

router.post('/add', (req, res) => {
    const name = req.body.name
    const id = req.body.id
    const creator = req.body.creator

    const createdWatchlist = new Watchlist({name, id, creator})

    createdWatchlist.save()
    .then(() => res.json('New user saved!'))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.delete('/delete-watchlist/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id)
    .then(() => res.json('Watchlist successfully deleted'))
    .catch(err => res.json(err))
})

module.exports = router;