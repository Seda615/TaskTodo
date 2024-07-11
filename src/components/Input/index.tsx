import { Box, TextField } from "@mui/material"
import { FC } from "react"
import { Control, useController } from "react-hook-form"
import { FormValues } from "../../pages/Todos/todoTypes"
import { inputBoxStyle, inputStyle } from "./style"

interface IProps {
    control: Control<FormValues, any>
    name: 'title' | 'description' | 'deadline',
    error?: string,
    value?: string,
}

export const Input: FC<IProps> = ({ control, name, error }) => {
    const { field, fieldState } = useController({ control, name })

    return (
        <Box sx={inputBoxStyle}>
            <TextField
                id="outlined-basic"
                label={name}
                variant="outlined"
                {...field}
                placeholder={name}
                sx={inputStyle}
            />
            {(fieldState.isTouched && !!error) &&
                <p> {error}</p>
            }
        </Box>
    )
}
