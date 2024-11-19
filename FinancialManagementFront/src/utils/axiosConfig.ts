import axios, { AxiosRequestConfig } from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        console.error('Erro na requisição:', error);
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {

        if (error.response) {

            console.log('Erro na resposta:', error);
        } else if (error.request) {

            console.log('Erro na requisição:', error.request);
        } else {

            console.log('Erro', error.message);
        }
        return Promise.reject(error);
    }
);

export const poster = async (url: string, data: any, config = {}) => {
    try {
        const response = await axiosInstance.post(url, data, config);
        return response.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log('Erro na requisição POST:', error.message);
        } else {
            console.log('Erro desconhecido:', error);
        }
        throw error;
    }
};


export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
    try {
        const [url, config] = Array.isArray(args) ? args : [args];
        const response = await axiosInstance.get(url, { ...config });
        return response.data;
    } catch (error) {
        console.log('Erro no fetcher (GET):', error);
        throw error;
    }
};


export const putter = async (url: string, data: any) => {
    try {
        const response = await axiosInstance.put(url, data);
        return response.data;
    } catch (error) {
        console.log(`Erro ao fazer PUT para ${url}:`, error);
        throw error;
    }
};

export const deleter = async (url: string, config = {}) => {
    try {
        const response = await axiosInstance.delete(url, config);
        return response.data;
    } catch (error) {
        console.log('Erro na requisição DELETE:', error);
        throw error;
    }
};

export default axiosInstance;

