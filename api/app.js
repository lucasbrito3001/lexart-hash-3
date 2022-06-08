const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())

const ProductController = require('./src/controllers/products')

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.get('/products', ProductController.getProducts)

module.exports = app