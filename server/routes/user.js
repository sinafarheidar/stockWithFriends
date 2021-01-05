const router = require('express').Router()
let User = require('../models/users.model')

router.get('/', (req, res) => {
    User.find()
    .then(user => res.json(user))
    .catch(err => console.log(err))
})

router.post('/add', (req, res) => {
    const username = req.body.username
    const watchlist = req.body.watchlist

    const createdUser = new User({username, watchlist})

    createdUser.save()
    .then(() => res.json('New user saved!'))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.delete('/delete-user/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id)
    .then(() => res.json('User successfully deleted'))
    .catch(err => res.json(err))
})

module.exports = router;