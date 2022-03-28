import { logger } from "./middleware/logger";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import errorReducer from "./errors";
import tasksReducer from "./task";

const rootReducer = combineReducers({
    errors: errorReducer,
    tasks: tasksReducer
})

function createStore() {
    return configureStore({
        reducer: rootReducer,
        middlewareEnhancer: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(logger),
        devTools: process.env.NODE_ENV !== 'production'
    })
}

export default createStore
