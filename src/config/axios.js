import axios from 'axios';
import DEV_KEYS from './keys-dev';

const clienteAxios = axios.create({
     baseURL: DEV_KEYS.backendUrl
})


export default clienteAxios;