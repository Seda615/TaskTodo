import { FC } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Control, useController } from 'react-hook-form';
import moment from 'moment';
import { Box } from '@mui/material';

type FormValues = {
    title: string
    description?: string
    deadline?: string
}

interface IProps {
    control: Control<FormValues, any>,
    name: "title" | "description" | "deadline"
}

export const CustomDatePicker: FC<IProps> = ({ control, name }) => {
    const { field } = useController({ control, name })

    const parsedDate = field.value && moment(field.value, 'MMM DD YYYY HH:mm:ss').isValid() ? moment(field.value, 'MMM DD YYYY HH:mm:ss').toDate() : null;

    const handleChange = (date: Date | null) => {
        const formattedDate = date ? moment(date).format('MMM DD YYYY HH:mm:ss') : '';
        field.onChange(formattedDate?.toString())
    }

    return (
        <Box
            sx={{
                div: {
                    div: {
                        input: {
                            height: '56px',
                            width: '140px',
                            padding: '0 0 0 10px'
                        }
                    }
                }
            }}
        >
            <DatePicker
                selected={parsedDate}
                {...field}
                onChange={handleChange}
                name={name}
                showTimeSelect
                dateFormat='MMM DD YYYY HH:mm:ss'
                timeFormat="HH:mm:ss"
            />
        </Box>
    )
}

