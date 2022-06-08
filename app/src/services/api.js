const API_URL = "http://localhost:3333"
import axios from 'axios'

const api = {
    async getProducts(code, weight) {
        const queries = `weight=${weight}&code=${code}`
        const { data } = await axios.get(`${API_URL}/products?${queries}`)

        return data
    }
}

export default api