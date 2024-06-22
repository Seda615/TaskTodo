import { createSlice } from '@reduxjs/toolkit'
import { TodosState } from './entities'

const initialState: TodosState = {
    todos: [],
    deletedTodos: [],
}

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        todoAdded(state, action) {
            const { title, description, deadline } = action.payload
            state.todos.push({
                id: (Math.floor(Math.random() * (100 + 1)) + 1).toString(),
                title,
                description,
                deadline,
                status: 'pending',
            })
        },
        todoUpdate(state, action) {
              const matchingTodoIndex = state.todos.findIndex(
                (todo) => todo.id === action.payload.id
              )
              if (matchingTodoIndex !== -1) {
                state.todos[matchingTodoIndex] = action.payload
              }
        },
        todoDelete(state, action) {
            state.todos = state.todos.filter(item => item.id !== action.payload.id)
            state.deletedTodos.push(action.payload)
        },
    },
})


export const { todoAdded, todoUpdate, todoDelete } = todosSlice.actions

export default todosSlice.reducer