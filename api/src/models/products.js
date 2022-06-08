const URL_DATOS = 'https://gist.githubusercontent.com/Nicolas480/24529614ad30ffcec4ff9308946684e9/raw/dccdb14ca5616e52982cb42a93b894602c7ddcb2/products.json'
const request = require('axios')

const Product = {
    getProducts: async (weight, code) => {
        const { data } = await request.get(URL_DATOS)

        const response = Product.filterProducts(data, weight, code)

        return { ...response, status: 200 }
    },
    filterProducts: (productList, weight, code) => {
        let precioTotal = 0
        let productos = []
        let maxWeight = 0
        let minWeight = 0
        
        productList.forEach(product => {
            maxWeight = parseInt(product.wigth) + (parseInt(product.wigth) * 0.05)
            minWeight = parseInt(product.wigth) - (parseInt(product.wigth) * 0.05)

            console.log(maxWeight, minWeight)

            if(product.code === code && weight >= minWeight && weight <= maxWeight) {
                productos.push({ nombre: product.name, precio: product.price })
                
                precioTotal += product.price
            }
        })
        
        const moneda = productos.length > 0 ? productList[0].moneda : ''

        return { moneda, precioTotal, productos }
    },

}

module.exports = Product