const express = require('express')
const path = require('path')

const app = express()

app.use(express.json())

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

app.get('/style', (req, res)=>{
    res.sendFile(path.join(__dirname, '../styles.css'))
    rollbar.info('css file served')
})

let students = []

app.post('/api/student', (req, res)=>{
    let {name} = req.body
    name = name.trim()

    const index = students.findIndex(studentName=> studentName === name)

    if(index === -1 && name !== ''){
        students.push(name)
        rollbar.log('Student added successfully', {author: 'Scott', type: 'manual entry'})
        res.status(200).send(students)
    } else if (name === ''){
        rollbar.error('No name given')
        res.status(400).send('must provide a name.')
    } else {
        rollbar.error('student already exists')
        res.status(400).send('that student already exists')
    }

})

const port = process.env.PORT || 4545
app.use(rollbar.errorHandler())

app.listen(port, ()=>  console.log(`Take us to warp ${port}!`))