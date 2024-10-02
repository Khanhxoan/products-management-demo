import axios from 'axios';
import qs from 'qs';

const baseURL = "https://product-management-server-expressjs.vercel.app";

export const defaultAxios = axios.create({
    baseURL: baseURL,
    timeout: 30000,
    headers: {
        Accept: "application/json",
    },
    withCredentials: false,
    paramsSerializer: {
        serialize: (params) =>
            qs.stringify(params, { arrayFormat: "repeat", indices: false }),
    },
});
