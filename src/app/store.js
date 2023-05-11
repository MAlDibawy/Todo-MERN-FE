import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import todosReducer from '../features/Todos/TodosSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        todos: todosReducer
    },
})