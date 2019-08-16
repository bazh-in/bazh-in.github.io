import api from './api';

export default {
  getAll: () => api.axios.get(`counterparty`),
  getClients: () => api.axios.get(`counterparty/clients`),
  getProviders: () => api.axios.get(`counterparty/providers`),
  add: data => api.axios.post(`counterparty`, data),
  edit: data => api.axios.put(`counterparty/${data._id}`, data),
  delete: data => api.axios.delete(`counterparty/${data.id}`)
}
