const express = require('express')
const users = require('./routes/users')
const profiles = require('./routes/profiles')
const bodyParser = require('body-parser')
const passport = require('passport')

let app = express();
let port = 3000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api/users', users)
app.use('/api/profiles', profiles)

app.use(passport.initialize());
require('./config/possport')(passport);

app.listen(port, () => {
  console.log('start success')
})