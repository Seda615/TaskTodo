import { FC } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Control, useController } from 'react-hook-form';
import moment from 'moment';
import { Box } from '@mui/material';
import { FormValues } from '../../pages/Todos/todoTypes';
import { datePickerStyle } from './style';
import { DATE_FORMAT, HOUR_FORMAT } from '../../constants';

interface IProps {
    control: Control<FormValues, any>,
    name: "title" | "description" | "deadline"
}

export const CustomDatePicker: FC<IProps> = ({ control, name }) => {
    const { field } = useController({ control, name })

    const parsedDate = field.value && moment(field.value, DATE_FORMAT).isValid() ? moment(field.value, DATE_FORMAT).toDate() : null;

    const handleChange = (date: Date | null) => {
        const formattedDate = date ? moment(date).format(DATE_FORMAT) : '';
        field.onChange(formattedDate?.toString())
    }

    return (
        <Box sx={datePickerStyle}>
            <DatePicker
                selected={parsedDate}
                {...field}
                onChange={handleChange}
                name={name}
                showTimeSelect
                dateFormat={DATE_FORMAT}
                timeFormat={HOUR_FORMAT}
            />
        </Box>
    )
}

