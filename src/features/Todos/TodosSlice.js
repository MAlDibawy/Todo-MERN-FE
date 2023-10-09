import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import TodosService from './TodosService'

const initialState = {
    todos: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const addTodo = createAsyncThunk('todos/addTodo', async (todo, thunkAPI) => {
    try {
        const userToken = thunkAPI.getState().auth.user.token;
        return await TodosService.createTodo(todo, userToken);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const getTodos = createAsyncThunk('todos/getTodos', async (_, thunkAPI) => {
    try {
        const userToken = thunkAPI.getState().auth.user.token;
        return await TodosService.getTodos(userToken);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const updateTodo = createAsyncThunk('todos/updateTodo', async (updateObj, thunkAPI) => {
    try {
        const userToken = thunkAPI.getState().auth.user.token;
        await TodosService.updateTodo(updateObj.editValue, updateObj._id, userToken);
        return { id: updateObj._id, value: { item: updateObj.editValue } }
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const checkTodo = createAsyncThunk('todos/checkTodo', async (updateObj, thunkAPI) => {
    try {
        const userToken = thunkAPI.getState().auth.user.token;
        await TodosService.checkTodo(updateObj.editValue, updateObj._id, userToken);
        return { id: updateObj._id, done: updateObj.editValue };
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const deleteTodo = createAsyncThunk('/todos/deleteTodo', async (todoID, thunkAPI) => {
    try {
        const userToken = thunkAPI.getState().auth.user.token;
        await TodosService.deleteTodo(todoID, userToken);
        return { id: todoID };
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(addTodo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addTodo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.todos.push(action.payload);
            }).addCase(addTodo.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getTodos.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTodos.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.todos = action.payload;
            }).addCase(getTodos.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

            .addCase(updateTodo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateTodo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.todos = state.todos.map(todo => todo._id === action.payload.id ? { ...todo, item: action.payload.value.item } : todo)
            }).addCase(updateTodo.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(checkTodo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(checkTodo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.todos = state.todos.map(todo => todo._id === action.payload.id ? { ...todo, done: action.payload.done } : todo)
            }).addCase(checkTodo.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteTodo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.todos = state.todos.filter(todo => todo._id != action.payload.id);
            }).addCase(deleteTodo.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

    }

})


export const { reset } = todosSlice.actions;
export default todosSlice.reducer;