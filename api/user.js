import api from './api';

export default {
  get: () => api.axios.get(`user`),
  add: data => api.axios.post(`user`, data),
  edit: data => api.axios.put(`user/${data._id}`, data),
  delete: data => api.axios.delete(`user/${data.id}`)
}
