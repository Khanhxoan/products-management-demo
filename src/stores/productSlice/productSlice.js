import {
  createProduct,
  deleteProduct,
  getListProducts,
  getProductDetail,
  updateProduct,
} from '@/apis/product';
import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

export const getProductsThunk = createAsyncThunk(
    "products/getProducts",
    getListProducts
);

export const getProductDetailThunk = createAsyncThunk(
    "products/getProductDetail",
    getProductDetail
);

export const createProductThunk = createAsyncThunk(
    "products/createProduct",
    createProduct
);

export const updateProductThunk = createAsyncThunk(
    "products/updateProduct",
    updateProduct
);

export const deleteProductThunk = createAsyncThunk(
    "products/deleteProduct",
    deleteProduct
);

const productSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        productDetail: {},
        loadingGetProducts: false,
        error: null,
        loadingDetailProduct: false,
        // Loading for create udpate
        loadingCU: false,
        // Loading delete
        loadingDelete: false,
    },
    reducers: {
        getProductDetailAction: (state, action) => {
            state.productDetail = { ...action.payload };
        },
    },
    extraReducers: (builder) => {
        builder
            // Get products
            .addCase(getProductsThunk.pending, (state) => {
                state.loadingGetProducts = true;
            })
            .addCase(getProductsThunk.fulfilled, (state, action) => {
                state.loadingGetProducts = false;
                state.products = action.payload.data?.products ?? [];
            })
            .addCase(getProductsThunk.rejected, (state, action) => {
                state.loadingGetProducts = false;
                state.error = action.error.message;
            })

            // Create product
            .addCase(createProductThunk.fulfilled, (state, action) => {
                state.products.push(action.payload);
            })
            .addCase(createProductThunk.rejected, (state, action) => {})

            // Update product
            .addCase(updateProductThunk.fulfilled, (state, action) => {
                const index = state.products.findIndex(
                    (product) => product.id === action.payload.id
                );
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
            })

            // Product Detail
            .addCase(getProductDetailThunk.pending, (state, action) => {
                state.loadingDetailProduct = true;
            })
            .addCase(getProductDetailThunk.fulfilled, (state, action) => {
                const productDetailRes = action.payload.data ?? {};
                state.productDetail = { ...productDetailRes };
                state.loadingDetailProduct = false;
            })

            // Delete product
            .addCase(deleteProductThunk.fulfilled, (state, action) => {
                state.products = state.products.filter(
                    (product) => product.id !== action.payload
                );
            });
    },
});

export const { getProductDetailAction } = productSlice.actions;
export default productSlice.reducer;
