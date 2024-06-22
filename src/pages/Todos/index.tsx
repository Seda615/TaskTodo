import { useAppDispatch, useAppSelector } from "../../store/hook"
import CreateTodos from "./CreateTodoForm"
import { DataTable } from "../../components"
import { todoTitles } from "./entities"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { todoSchema } from "../../validations/todosSchema"
import { todoDelete, todoUpdate } from "../../store/reducers/todos/todoSlice"
import { useState } from "react"
import { Box, Tab, Tabs } from "@mui/material"

const columns: todoTitles[] = [
    'title', 'description', 'deadline', 'status'
]

type FormValues = {
    title: string
    description?: string
    deadline?: string
    status?: string
    id?: string
}

const Todos = () => {
    const [tab, setTab] = useState('pending')
    const { todos } = useAppSelector(state => state.todos)
    const { deletedTodos } = useAppSelector(state => state.todos)


    const dispatch = useAppDispatch();

    const { handleSubmit, control, setValue } = useForm<FormValues>({
        defaultValues: {
            id: "",
            title: "",
            description: "",
            deadline: "",
        },
        resolver: yupResolver(todoSchema),
        mode: "onChange",
    })

    const onSubmit = (data: FormValues) => {
        dispatch(todoUpdate(data))
    }

    const TodoActions = (action: string, todo: Partial<Record<todoTitles, string | undefined>>) => {
        if (action === 'delete') {
            dispatch(todoDelete(todo))
        }

        if (action === 'edit') {

            handleSubmit(onSubmit)()
        }

    }

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue)
    }

    return (
        <div>
            <Box sx={{display: 'flex', justifyContent: 'center', margin: '20px 0'}}>
            <Tabs
                value={tab}
                sx={{maxWidth: '290px', width: '100%'}}
                onChange={handleChange}
                aria-label="wrapped label tabs example"
                
            >
                <Tab value="pending" label="Todo List" />
                <Tab value="deleted" label="Deleted TodoList" />
            </Tabs>
            </Box>
            {tab === 'pending' ?
                <DataTable<todoTitles>
                    data={todos}
                    columns={columns}
                    control={control}
                    actionsName={['edit', 'delete']}
                    action={TodoActions}
                    setValue={setValue}
                /> :
                <DataTable<todoTitles>
                    data={deletedTodos}
                    columns={columns}
                />
            }
            <CreateTodos />
        </div>
    )
}

export default Todos

