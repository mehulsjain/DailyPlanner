import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { todoApi } from "./services/todoApi";
import todoReducer from "./services/todoReducer";

export const store = configureStore({
    reducer: {
        [todoApi.reducerPath]: todoApi.reducer,
        todoInfo: todoReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(todoApi.middleware)
});