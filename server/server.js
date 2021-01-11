const stockRouter = require('./routes/stock')
const userRouter = require('./routes/user')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');

require('dotenv').config()
const app = express()

const port = process.env.port || 5000

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb+srv://sina:sina@stockwithfriends.ivjub.mongodb.net/stockWithFriends?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
const connection = mongoose.connection

connection.on('error', console.error.bind(console, 'connection error:'));

connection.once('open', function() {
  console.log('MongoDB connection successful')
});

app.get('/', (req, res) => {
  console.log('Hellooooooo')
  res.send('Helloooo')
})

app.use('/stock', stockRouter)
app.use('/user', userRouter)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build"))
  })
}
app.listen(port, (req, res) => {
    console.log('Listening on Port: ' + port)
})
