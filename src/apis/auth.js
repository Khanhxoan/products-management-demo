import { defaultAxios } from '@/libs/axios/axios';

export const login = async (payload) => {
    const response = await defaultAxios.post("/auth/login", payload);
    return response.data;
};
export const register = async (userData) => {
    const response = await defaultAxios.post("/auth/register", userData);
    return response.data;
};
export const logout = async () => {
    const response = await defaultAxios.post("/auth/logout");
    return response.data;
};
