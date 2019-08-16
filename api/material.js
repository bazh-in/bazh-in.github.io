import api from './api';

export default {
  get: () => api.axios.get(`material`),
  add: data => api.axios.post(`material`, data),
  edit: data => api.axios.put(`material/${data._id}`, data),
  delete: data => api.axios.delete(`material/${data.id}`)
}
