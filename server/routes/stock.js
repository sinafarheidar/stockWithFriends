const router = require('express').Router()
let Stock = require('../models/stock.models')

router.get('/', (req, res) => {
    Stock.find({})
    .then(stocks => res.json(stocks))
    .catch(err => console.log(err))
})

router.get('/user-stocks/:user', (req, res) => {
    Stock.find({ user: req.params.user})
    .then((stocks) => res.json(stocks))
    .catch(err => res.json(err))
})

router.delete('/delete/:id/:watchlist', (req, res) => {
    Stock.findByIdAndDelete(req.params.id)
    .then(() => res.json('Successfully Deleted Stock!'))
    .catch(err => res.json(err))

    Stock.findOne({})
})

router.post('/add-stock', (req, res) => {
    const watchlist = req.body.watchlist
    const id = req.body.id
    const symbol = req.body.symbol
    const target = req.body.target
    const stop = req.body.stop
    const description = req.body.description
    const date = Date.parse(req.body.date)

    const newStock = new Stock({watchlist, id, symbol, target, stop, description, date})

    newStock.save()
    .then(() => res.json('stock added'))
    .catch(err => res.json(err))
})

router.post('/update/:id', (req, res) => {
    Stock.findById(req.params.id)
    .then(stock => {
        stock.symbol = req.body.symbol
        stock.target = req.body.target
        stock.stop = req.body.stop
        stock.description = req.body.description

        stock.save()
        .then(() => res.json('Stock Successfully updated!'))
        .catch(err => res.json(err))
    })
})

module.exports = router;