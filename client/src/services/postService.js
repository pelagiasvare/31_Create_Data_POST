// Post API service (GET, POST, PUT, DELETE)
import api from './axiosConfig.js';

export const postService = {
  getAll: async () => (await api.get('/posts')).data,
  getOne: async (id) => (await api.get(`/posts/${id}`)).data,
  create: async (title, content) => (await api.post('/posts', { title, content })).data,
  update: async (id, title, content) => (await api.put(`/posts/${id}`, { title, content })).data,
  remove: async (id) => (await api.delete(`/posts/${id}`)).data,
};

export default postService;