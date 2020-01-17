import axios from 'axios';

const api = axios.create({
    //URL expo devendo ser alterada de acordo com o local e url de desenvolvimento
    baseURL: 'http://192.168.0.107:3333'
});

export default api;