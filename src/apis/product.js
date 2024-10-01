import { defaultAxios } from "../libs/axios/axios";

export const getListProducts = async () => {
    const response = await defaultAxios.get("");
    return response.data;
};

export const createProduct = async (product) => {
    const response = await defaultAxios.post("", product);
    return response.data;
};

export const updateProduct = async ({ id, product }) => {
    const response = await defaultAxios.put(`""/${id}`, product);
    return response.data;
};

export const deleteProduct = async (id) => {
    const response = await defaultAxios.delete(`""/${id}`);
    return response.data;
};
