export type todoTitles = "title" | "description" | "deadline" | "status" | "id";

export interface FormValues {
    title: string
    description?: string
    deadline?: string
    id?: string
    status?: string
}
