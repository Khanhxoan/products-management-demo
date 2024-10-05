import axios from "axios";
import qs from "qs";

import { logout } from "@/apis/auth";
import { notify } from "@/components/custom-toast/custom-toast";
import { TOAST_STATUS } from "@/constants/contants";
import { clearUserLogout } from "@/stores/authSlice/authSlice";

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
        const { response, request, message } = error;

        if (response && response.status) {
            switch (response.status) {
                case 400:
                    notify("Bad Request! Please check the input data.", TOAST_STATUS.ERORR);
                    break;
                case 401:
                    handleLogout();
                    notify("Unauthorized! Please log in again.", TOAST_STATUS.ERORR);
                    break;
                case 500:
                    notify("Internal Server Error! Please try again later.", TOAST_STATUS.ERORR);
                    break;
                default:
                    notify("An unexpected error occurred!", TOAST_STATUS.ERORR);
                    break;
            }
        } else if (request) {
            notify("No response from server. Please check your internet connection.", TOAST_STATUS.ERORR);
        } else {
            notify("Request failed: " + message ?? "", TOAST_STATUS.ERORR);
        }
        return Promise.reject(error);
    }
);
