<template>
    <div id="app">
        <div class="container">
            <h1>Busca de productos</h1>
            <div class="div-inputs">
                <input
                    type="text"
                    placeholder="Código"
                    v-model="catalog.code"
                    class="inputs-styles input-code"
                />
                <input
                    type="number"
                    placeholder="Peso"
                    v-model="catalog.weight"
                    class="inputs-styles input-weight"
                />
                <button @click="searchProducts" class="inputs-styles btn">
                    Buscar
                </button>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Nombre del produto</th>
                            <th>Precio</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-if="products.length > 0">
                            <tr v-for="(product, idx) in products" :key="idx">
                                <td>{{ product.nombre }}</td>
                                <td>{{ product.precio }}</td>
                            </tr>
                        </template>
                        <tr v-else-if="loadingProducts">
                            <td colspan="2">
                                <div class="spinner text-center"></div>
                                <span>Buscando productos...</span>
                            </td>
                        </tr>
                        <tr v-else>
                            <td colspan="2">Sin productos, haz una nueva búsqueda</td>
                        </tr>
                    </tbody>
                    <tfoot v-if="products.length > 0">
                        <tr>
                            <td>Total</td>
                            <td>{{ totalPrice }}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import api from './services/api'
export default {
    name: "App",
    data: () => ({
        catalog: {
            code: null,
            weight: null,
        },
        products: [],
        totalPrice: 0,
        loadingProducts: false
    }),
    methods: {
        searchProducts: async function () {
            this.products = []
            this.totalPrice = 0
            this.loadingProducts = true

            const res = await api.getProducts(this.catalog.code, this.catalog.weight)
            if(res.status === 200) {
                this.products = res.productos
                this.totalPrice = res.precioTotal
                this.loadingProducts = false
            }
        },
    },
};
</script>

<style>
* {
    box-sizing: border-box;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
}

:root {
    --primary-color: rgb(16, 111, 219);
    --light-color: rgb(234, 244, 255);
    --dark-color: rgb(59, 59, 59);
}

.container {
    max-width: 1000px;
    margin: auto;
    padding: 5px;
}

.div-inputs {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 10px;
}

.inputs-styles {
    padding: 10px;
    border-radius: 3px;
    font-size: 16px;
    border: 1px solid rgb(207, 207, 207);
    outline: none;
    width: calc(40% - 5px);
}

.btn {
    width: calc(20% - 10px);
    font-size: 16px;
    padding: 10px;
    border: 1px solid var(--primary-color);
    background-color: var(--primary-color);
    color: white;
    cursor: pointer;
    transition: .3s;
}

.btn:hover {
    background: white;
    color: var(--primary-color);
}

table {
    margin-top: 5vh;
    width: 100%;
    border-collapse: collapse;
}

table thead tr {
    background-color: var(--primary-color);
    color: white;
}

table thead tr th {
    padding: 10px 0;
    width: 50%;
}

table tbody tr:nth-child(even) {
    background-color: var(--light-color)
}

table tbody tr td {
    text-align: center;
    padding: 10px;
    font-size: 16px;
}

table tfoot tr {
    background-color: var(--dark-color);
    color: white;
}

table tfoot tr td {
    padding: 10px;
    text-align: center;
}

@media screen and (max-width: 992px) {
    .div-inputs {
        flex-direction: column;
    }

    .inputs-styles {
        width: calc(50% - 5px);
    }

    .btn {
        width: 100%;
    }
}

.spinner {
    width: 35px;
    height: 35px;
    border: 5px solid #f3f3f3;
    border-top: 5px solid var(--dark-color);
    border-radius: 100px;
    animation: spin 1s linear infinite;
    margin: 0 auto 10px auto;
}

@keyframes spin {
    from {
        transform: rotate(0);
    } to {
        transform: rotate(360deg);
    }
}
</style>
