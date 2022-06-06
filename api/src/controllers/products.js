const ProductsModel = require('../models/products')

const Product = {
    getProducts: async (req, res) => {
        let { weight, code } = req.query

        if(code.charAt(0) !== '#') code = `#${code}`

        const response = await ProductsModel.getProducts(parseInt(weight), code)

        res.json(response)
    }
}

module.exports = Product