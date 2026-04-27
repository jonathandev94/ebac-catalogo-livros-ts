import axios from 'axios';
const api = axios.create({
  baseURL: 'https://crudcrud.com/api/0145304f636f40c78d7456f58df8c851' // <--- Coloque seu ID aqui
});

export default api;