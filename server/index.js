const express = require('express')
const path = require('path')

const app = express()

// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: 'b787c45a8a2044648c80360c9031f8a5',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')
// rest of my code VV
app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, '../index.html'))
})
const port = process.env.PORT || 4545

app.listen(port, ()=>  console.log(`Take us to warp ${port}!`))