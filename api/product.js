import api from './api';

export default {
  get: () => api.axios.get(`product`),
  add: data => api.axios.post(`product`, data),
  edit: data => api.axios.put(`product/${data._id}`, data),
  delete: data => api.axios.delete(`product/${data.id}`)
}
