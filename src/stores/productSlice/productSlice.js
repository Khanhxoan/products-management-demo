import {
  createProduct,
  deleteProduct,
  getListProducts,
  getProductDetail,
  updateProduct,
} from '@/apis/product';
import { initFormValue } from '@/constants/contants';
import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

export const getProductsThunk = createAsyncThunk("products/getProducts", getListProducts);

export const getProductDetailThunk = createAsyncThunk("products/getProductDetail", getProductDetail);

export const createProductThunk = createAsyncThunk("products/createProduct", createProduct);

export const updateProductThunk = createAsyncThunk("products/updateProduct", updateProduct);

export const deleteProductThunk = createAsyncThunk("products/deleteProduct", deleteProduct);

const productSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        productDetail: {},
        productForm: { ...initFormValue },
        enableFetchProducts: true,
        loadingGetProducts: false,
        error: null,
        errorCreate: null,
        errorUpdate: null,
        errorDelete: null,
        errorGetDetail: null,
        loadingDetailProduct: false,
        loadingCU: false,
        loadingDelete: false,
    },
    reducers: {
        getProductDetailAction: (state, action) => {
            state.productDetail = { ...action.payload };
        },

        updateFormValueCU: (state, action) => {
            state.productForm = { ...action.payload };
        },
    },
    extraReducers: (builder) => {
        builder
            // Get products
            .addCase(getProductsThunk.pending, (state) => {
                state.loadingGetProducts = true;
                state.error = null;
            })
            .addCase(getProductsThunk.fulfilled, (state, action) => {
                state.loadingGetProducts = false;
                state.products = action.payload?.products ?? [];
            })
            .addCase(getProductsThunk.rejected, (state, action) => {
                state.loadingGetProducts = false;
                state.error = action.error.message;
            })

            // Create product
            .addCase(createProductThunk.pending, (state, action) => {
                state.errorCreate = null;
                state.loadingCU = true;
            })
            .addCase(createProductThunk.fulfilled, (state, action) => {
                state.loadingCU = false;
                state.productForm = { ...initFormValue };
            })
            .addCase(createProductThunk.rejected, (state, action) => {
                state.errorCreate = action.error.message;
                state.loadingCU = false;
            })

            // Update product
            .addCase(updateProductThunk.pending, (state, action) => {
                state.errorUpdate = null;
                state.loadingCU = true;
            })
            .addCase(updateProductThunk.fulfilled, (state, action) => {
                state.loadingCU = false;
            })
            .addCase(updateProductThunk.rejected, (state, action) => {
                state.loadingCU = false;
                state.errorUpdate = action.error.message;
            })

            // Product Detail
            .addCase(getProductDetailThunk.pending, (state, action) => {
                state.errorGetDetail = null;
                state.loadingDetailProduct = true;
            })
            .addCase(getProductDetailThunk.fulfilled, (state, action) => {
                const productDetailRes = action.payload.data ?? {};
                state.productDetail = { ...productDetailRes };
                state.loadingDetailProduct = false;
            })
            .addCase(getProductDetailThunk.rejected, (state, action) => {
                state.loadingDetailProduct = false;
                state.productDetail = {};
                state.errorGetDetail = action.error.message;
            })

            // Delete product
            .addCase(deleteProductThunk.pending, (state, action) => {
                state.errorDelete = null;
                state.loadingDelete = true;
            })
            .addCase(deleteProductThunk.fulfilled, (state, action) => {
                state.products = state.products.filter((product) => product._id !== action.payload);
                state.loadingDelete = false;
            })
            .addCase(deleteProductThunk.rejected, (state, action) => {
                state.products = state.products.filter((product) => product._id !== action.payload);
                state.errorDelete = action.error.message;
                state.loadingDelete = false;
            });
    },
});

export const { getProductDetailAction, updateFormValueCU } = productSlice.actions;
export default productSlice.reducer;
