import axios from 'axios';
import ls from '@/utils/localStorage';

const axiosIns = axios.create({
    baseURL: '/api/v1',
    timeout: 30000,
    headers: {
        'content-type': 'application/json'
    }
});

axiosIns.interceptors.request.use(
    config => {
        const token = ls.getToken();
        if (token) {
            config.headers.authorization = 'Bearer ' + token;
        }
        return config;
    },
    err => Promise.reject(err)
);

export const get = path => axiosIns.get(path);
export const post = (path, data) => axiosIns.post(path, data);
