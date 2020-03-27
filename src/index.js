const app = require('express')()
const consign = require('consign')
const db = require('../config/db')

app.db = db

consign()
    .include('./config/middlewares.js')
    .then('./controllers')
    .then('./models')
    .then('./config/routes.js')
    .into(app)

app.listen(3000, () => {
    console.log('Backend is running...')
})