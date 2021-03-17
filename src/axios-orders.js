import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://danie-burger-default-rtdb.firebaseio.com/'
});

export default instance;