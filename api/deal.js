import api from './api';

export default {
  get: () => api.axios.get(`deal`),
  add: data => api.axios.post(`deal`, data),
  edit: data => api.axios.put(`deal/${data._id}`, data),
  delete: data => api.axios.delete(`deal/${data.id}`)
}
