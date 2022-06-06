const express = require('express')
const app = express()
const ProductController = require('./src/controllers/products')

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.get('/products', ProductController.getProducts)

module.exports = app