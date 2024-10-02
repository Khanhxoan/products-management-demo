import qs from 'qs';

import { defaultAxios } from '../libs/axios/axios';

export const getListProducts = async () => {
    const params = { page: 1, size: 999999999 };
    return await defaultAxios.get(
        `/products?${qs.stringify(params, {
            indices: false,
        })}`
    );
};

export const getProductDetail = async (productId) => {
    return await defaultAxios.get(`/products/${productId}`);
};

export const createProduct = async (product) => {
    const response = await defaultAxios.post("", product);
    return response.data;
};

export const updateProduct = async ({ productId, product }) => {
    const response = await defaultAxios.put(`""/${productId}`, product);
    return response.data;
};

export const deleteProduct = async (productId) => {
    const response = await defaultAxios.delete(`""/${productId}`);
    return response.data;
};
