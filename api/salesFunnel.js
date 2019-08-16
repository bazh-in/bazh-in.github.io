import api from './api';

export default {
  get: () => api.axios.get(`sales_funnel`),
  add: data => api.axios.post(`sales_funnel`, data),
  edit: data => api.axios.put(`sales_funnel/${data._id}`, data),
  delete: data => api.axios.delete(`sales_funnel/${data.id}`)
}
