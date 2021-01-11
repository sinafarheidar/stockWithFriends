const stockRouter = require('./routes/stock')
const userRouter = require('./routes/user')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');

require('dotenv').config()
const app = express()


app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
const connection = mongoose.connection

connection.on('error', console.error.bind(console, 'connection error:'));

connection.once('open', function() {
  console.log('MongoDB connection successful')
});

app.use('/stock', stockRouter)
app.use('/user', userRouter)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build"))
  })
}
app.listen(process.env.PORT || 5000, (req, res) => {
    console.log('Listening')
})
