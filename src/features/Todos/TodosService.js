import axios from 'axios';

export const createTodo = async (todoData, userToken) => {
    const config = {
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    };
    const response = await axios.post('/api/addItem', todoData, config);
    return response.data;
}

export const getTodos = async (userToken) => {
    const config = {
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    };
    const response = await axios.get('/api/getAllTodos', config);
    return response.data;
}

export const updateTodo = async (updateValue, todoID, userToken) => {
    const config = {
        headers: {
            Authorization: `Bearer ${userToken}`
        },
    }
    const newValue = { item: updateValue };
    const response = await axios.patch(`/api/updateTodo/${todoID}`, newValue, config)
    return response.data;
}

export const checkTodo = async (editValue, todoID, userToken) => {
    const config = {
        headers: {
            Authorization: `Bearer ${userToken}`
        },
    }
    const newValue = { done: editValue };
    const response = await axios.patch(`/api/updateTodo/${todoID}`, newValue, config);
    return response.data;
}

export const deleteTodo = async (todoID, userToken) => {
    const config = {
        headers: {
            Authorization: `Bearer ${userToken}`
        },
    }
    const response = await axios.delete(`/api/deleteTodo/${todoID}`, config)
    return response.data;
}

const goalService = {
    createTodo,
    getTodos,
    updateTodo,
    deleteTodo,
    checkTodo
}

export default goalService;