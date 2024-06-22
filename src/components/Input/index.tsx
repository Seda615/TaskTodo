import { Box, TextField } from "@mui/material"
import { FC } from "react"
import { Control, useController } from "react-hook-form"

type FormValues = {
    title: string
    description?: string
    deadline?: string
}

interface IProps {
    control: Control<FormValues, any>
    name: 'title' | 'description' | 'deadline',
    error?: string,
    value?: string,
}

export const Input: FC<IProps> = ({ control, name, error }) => {
    const { field, fieldState } = useController({ control, name })

    return (
        <Box sx={{p: {color: 'red'}}}>
            <TextField
                id="outlined-basic"
                label={name}
                variant="outlined"
                {...field}
                placeholder={name}
                sx={{ width: '150px' }}
            />
            {(fieldState.isTouched && !!error) &&
                <p> {error}</p>
            }
        </Box>
    )
}
