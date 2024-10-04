import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import storage from 'redux-persist/lib/storage';

import authReducer from '@/stores/authSlice/authSlice';
import productReducer from '@/stores/productSlice/productSlice';
import {
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    products: productReducer,
    auth: authReducer,
});

// Cấu hình redux-persist
const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth", "products"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);
export default store;
