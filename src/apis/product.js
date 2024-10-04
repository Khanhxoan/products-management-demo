import qs from 'qs';

import { defaultAxios } from '../libs/axios/axios';

export const getListProducts = async () => {
    const params = { page: 1, size: 999999999 };
    const response = await defaultAxios.get(
        `/products?${qs.stringify(params, {
            indices: false,
        })}`
    );
    return response.data;
};

export const getProductDetail = async (productId) => {
    return await defaultAxios.get(`/products/${productId}`);
};

export const createProduct = async (product) => {
    const response = await defaultAxios.post("/products", product);
    return response.data;
};

export const updateProduct = async ({ productId, payloadUpdate }) => {
    const response = await defaultAxios.put(`/products/${productId}`, payloadUpdate);
    return response.data;
};

export const deleteProduct = async (productId) => {
    await defaultAxios.delete(`/products/${productId}`);
    return productId;
};
