export type Todo = {
    id: string,
    content: string,
    priority: "high" | "medium" | "low",
    status: "todo" | "progress" | "done",
    createdAt: string,
    updatedAt: string,
    userId: string
}

export type Todos = {
    todos: Todo[]
}