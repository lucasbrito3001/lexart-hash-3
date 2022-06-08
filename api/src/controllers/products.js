const ProductsModel = require('../models/products')

const Product = {
    getProducts: async (req, res) => {
        let { weight, code } = req.query

        if(code.charAt(0) !== '#') code = `#${code}`

        if(!weight || !code) res.send({ status: 200, message: "El codigo y peso son requeridos" })

        const response = await ProductsModel.getProducts(parseInt(weight), code)

        if(response.productos.length === 0) response.message = "No se encontraron productos para esta búsqueda"

        res.send(response)
    }
}

module.exports = Product