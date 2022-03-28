import reducer from "./task";
import { logger } from "./middleware/logger";
import { configureStore } from "@reduxjs/toolkit";

function createStore() {
    return configureStore({
        reducer,
        middlewareEnhancer: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(logger),
        devTools: process.env.NODE_ENV !== 'production'
    })
}

export default createStore
