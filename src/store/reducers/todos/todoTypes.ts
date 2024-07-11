export interface Todo {
    id: string,
    title: string,
    description?: string,
    deadline?: string,
    status?: string
}

export interface TodosState {
    todos: Todo[],
    deletedTodos: Todo[]
}