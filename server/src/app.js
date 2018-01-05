var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var morgan = require('morgan')

var app = express();
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.post('/register', (req, res) => {
    res.send({
        message: `Hello ${req.body.email}your user was registered`
        })
    })


app.listen(process.env.PORT || 8081)