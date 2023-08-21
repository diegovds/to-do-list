export type Todo = {
    id: string,
    content: string,
    priority: string,
    status: string,
    createdAt: string,
    updatedAt: string,
    userId: string
}

export type Todos = {
    todos: Todo[]
}