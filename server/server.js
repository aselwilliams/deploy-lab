const express = require('express')
const path = require('path')
const app = express()

app.use(express.static('public'))
//app.use(express.static(`${__dirname}/public))

// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: '1b872c3f57894bea93b0ec97cf673fe5',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')


const toys = ['train', 'dino', 'heli']

app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'../public/index.html'))
})

app.get('/api/toys', (req, res) => {
    rollbar.info('Someone got the list of toys on page load')
    res.status(200).send(toys)
})


app.listen(4000, () => console.log(`running on 4000`))