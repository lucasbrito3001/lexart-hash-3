const URL_DATOS = 'https://gist.githubusercontent.com/Nicolas480/24529614ad30ffcec4ff9308946684e9/raw/dccdb14ca5616e52982cb42a93b894602c7ddcb2/products.json'
const request = require('axios')

const Product = {
    getProducts: async (weight, code) => {
        const { data } = await request.get(URL_DATOS)

        const maxWeight = weight + (weight * 0.05)
        const minWeight = weight - (weight * 0.05)

        const response = Product.filterProducts(data, maxWeight, minWeight, code)

        return response
    },
    filterProducts: (productList, maxWeight, minWeight, code) => {
        let precioTotal = 0;
        let listToReturn = []

        productList.forEach(product => {
            if(product.code === code && product.wigth >= minWeight && product.wigth <= maxWeight) {
                listToReturn.push({ nombre: product.name, precio: `${product.moneda}${product.price}` })
                precioTotal += product.price
            }
        })

        return { precioTotal, listToReturn }
    },

}

module.exports = Product