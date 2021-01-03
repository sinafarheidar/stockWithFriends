const stockRouter = require('./routes/stock')
const userRouter = require('./routes/user')
const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const app = express()

app.use(express.json())
const port = process.env.port || 5000

mongoose.connect(process.env.ATLAS_URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
const connection = mongoose.connection

connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', function() {
  console.log('MongoDB connection successful')
});


app.use('/stock', stockRouter)
app.use('/user', userRouter)
app.listen(port, (req, res) => {
    console.log('Listening on Port: ' + port)
})
