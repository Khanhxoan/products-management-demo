import {
  createProduct,
  deleteProduct,
  getListProducts,
  updateProduct,
} from '@/apis/product';
import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

const API_URL = "https://api.example.com/products";

// Thunk để lấy danh sách sản phẩm
export const getProductsThunk = createAsyncThunk(
    "products/getProducts",
    getListProducts
);

// Thunk để tạo mới sản phẩm
export const createProductThunk = createAsyncThunk(
    "products/createProduct",
    createProduct
);

// Thunk để cập nhật sản phẩm
export const updateProductThunk = createAsyncThunk(
    "products/updateProduct",
    updateProduct
);

// Thunk để xóa sản phẩm
export const deleteProductThunk = createAsyncThunk(
    "products/deleteProduct",
    deleteProduct
);

const productSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        loading: false,
        error: null,
        // Loading for create udpate
        loadingCU: false,
        // Loading delete
        loadingDelete: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Lấy danh sách sản phẩm
            .addCase(getProductsThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProductsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(getProductsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Tạo mới sản phẩm
            .addCase(createProductThunk.fulfilled, (state, action) => {
                state.products.push(action.payload);
            })
            // Cập nhật sản phẩm
            .addCase(updateProductThunk.fulfilled, (state, action) => {
                const index = state.products.findIndex(
                    (product) => product.id === action.payload.id
                );
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
            })
            // Xóa sản phẩm
            .addCase(deleteProductThunk.fulfilled, (state, action) => {
                state.products = state.products.filter(
                    (product) => product.id !== action.payload
                );
            });
    },
});

export default productSlice.reducer;
