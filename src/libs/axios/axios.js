import axios from "axios";
import qs from "qs";
import { useDispatch } from "react-redux";

import { logoutThunk } from "@/stores/authSlice/authSlice";

const baseURL = "http://localhost:9001";

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

// handle toke expired
defaultAxios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const dispatch = useDispatch();
        const { response } = error;
        if (response && response.status === 401) {
            dispatch(logoutThunk);
            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);
