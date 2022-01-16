import axios from 'axios';

import config from '../configurations';

let instance;
export const updateIns = () => {
    let token = localStorage.getItem('token');
    let tokenHeader = token ? { Authorization: `Bearer ${token}` } : {};
    instance = axios.create({
        baseURL: config.backendURL,
        responseType: 'json',
        headers: {
            ...tokenHeader,
            'Content-Type': 'application/json',
        },
    });
};
updateIns();

async function post(path = '', data = {}) {
    try {
        const response = await instance.post(path, JSON.stringify(data));
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        if (error.response)
            return Promise.reject({
                code: error.response.status,
                response: error.response.data,
            });
    }
}

async function put(path = '', data = {}) {
    try {
        const response = await instance.put(path, JSON.stringify(data));
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        if (error.response)
            return Promise.reject({
                code: error.response.status,
                response: error.response.data,
            });
    }
}
async function get(path = '', data = {}) {
    try {
        const response = await instance.get(path, {
            params: data,
        });
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        if (error.response)
            return Promise.reject({
                code: error.response.status,
                response: error.response.data,
            });
    }
}
async function remove(path = '', data = {}) {
    try {
        const response = await instance.delete(path, {
            params: data,
        });
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        if (error.response)
            return Promise.reject({
                code: error.response.status,
                response: error.response.data,
            });
    }
}

export default { post, get, put, remove };
