import api from './api';

export default {
  get: () => api.axios.get(`task`),
  add: data => api.axios.post(`task`, data),
  edit: data => api.axios.put(`task/${data._id}`, data),
  delete: data => api.axios.delete(`task/${data.id}`)
}
