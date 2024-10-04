import axios from 'axios';
import qs from 'qs';

import { logout } from '@/apis/auth';
import { clearUserLogout } from '@/stores/authSlice/authSlice';

const baseURL = "https://product-management-server-expressjs.vercel.app";

export const defaultAxios = axios.create({
    baseURL: baseURL,
    timeout: 30000,
    headers: {
        Accept: "application/json",
    },
    withCredentials: true,
    paramsSerializer: {
        serialize: (params) => qs.stringify(params, { arrayFormat: "repeat", indices: false }),
    },
});
const handleLogout = async () => {
    try {
        const { default: store } = await import("@/stores/store");
        await logout();
        store.dispatch(clearUserLogout());
        window.location.href = "/login";
    } catch (err) {}
};

// handle toke expired
defaultAxios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const { response } = error;
        if (response && response.status === 401) {
            handleLogout();
        }
        return Promise.reject(error);
    }
);
