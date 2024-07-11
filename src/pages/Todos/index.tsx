import { useAppDispatch, useAppSelector } from "../../store/hook"
import CreateTodos from "./CreateTodoForm"
import { DataTable } from "../../components"
import { todoTitles } from "./todoTypes"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { todoSchema } from "../../validations/todosSchema"
import { todoDelete, todoUpdate } from "../../store/reducers/todos/todoSlice"
import { Dispatch, useState } from "react"
import { FormValues } from "./todoTypes"
import { Box, Tab, Tabs } from "@mui/material"
import { tabsBoxStyle, tabsStyle } from "./style"

const columns: todoTitles[] = [
    'title', 'description', 'deadline', 'status'
]

const Todos = () => {
    const [tab, setTab] = useState('pending')
    const { todos } = useAppSelector(state => state.todos)
    const { deletedTodos } = useAppSelector(state => state.todos)


    const dispatch = useAppDispatch();

    const { handleSubmit, control, setValue, formState: { errors } } = useForm<FormValues>({
        defaultValues: {
            id: "",
            title: "",
            description: "",
            deadline: "",
        },
        resolver: yupResolver(todoSchema),
        mode: "onChange",
    })

    const onSubmit = (data: FormValues, setIsEditable: Dispatch<React.SetStateAction<string>> ) => {
        dispatch(todoUpdate(data))
        setIsEditable('')
    }

    const TodoActions = (
        action: string, 
        todo: Partial<Record<todoTitles, string | undefined>>,  
        setIsEditable: Dispatch<React.SetStateAction<string>>
    ) => {
        if (action === 'delete') {
            dispatch(todoDelete(todo))
        }

        if (action === 'edit') {
            handleSubmit((data) => onSubmit(data, setIsEditable))()
        }
    }

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue)
    }

    return (
        <div>
            <Box sx={tabsBoxStyle}>
                <Tabs
                    value={tab}
                    sx={tabsStyle}
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
                    errors={errors}
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

