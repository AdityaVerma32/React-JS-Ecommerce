import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from './rootReducer'; // Combine your slices here

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth"], // Persist only the 'auth' slice, add other slice names if needed
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer:  persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Disable serializable check for redux-persist
        }),
})

const persistor = persistStore(store)

export { store, persistor };