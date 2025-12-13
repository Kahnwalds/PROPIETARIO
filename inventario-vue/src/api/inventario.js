import axios from './axios'

const TOKEN = 'PEGA_AQUI_TU_TOKEN_JWT'

const headers = {
  Authorization: `Bearer ${TOKEN}`
}

export default {
  async getAll() {
    const res = await axios.get('/inventario', { headers })
    return res.data
  },

  async create(data) {
    const formData = new FormData()
    Object.keys(data).forEach(key => {
      if (data[key]) formData.append(key, data[key])
    })
    await axios.post('/inventario', formData, { headers })
  },

  async update(id, data) {
    const formData = new FormData()
    Object.keys(data).forEach(key => {
      if (data[key]) formData.append(key, data[key])
    })
    await axios.put(`/inventario/${id}`, formData, { headers })
  },

  async remove(id) {
    await axios.delete(`/inventario/${id}`, { headers })
  }
}
