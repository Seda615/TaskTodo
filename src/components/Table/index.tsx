import {
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Table,
    styled,
    TableCell,
    Paper,
} from "@mui/material"
import { tableCellClasses } from '@mui/material/TableCell';
import { Dispatch, useState } from "react";
import { Control, FieldErrors, FieldValues, UseFormSetValue } from "react-hook-form";
import { Input } from "../Input";
import { CustomDatePicker } from "../DatePicker";
import { FormValues } from "../../pages/Todos/todoTypes";
import { tableCellStyle, tableStyle } from "./style";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


interface IProps<T extends string> {
    data: (Partial<Record<T, string | undefined>> & { id: string })[],
    columns: T[],
    control?: Control<FormValues, any>,
    actionsName?: string[],
    action?: (action: string, column: Partial<Record<T, string | undefined>>, setIsEditable: Dispatch<React.SetStateAction<string>>) => void
    setValue?: UseFormSetValue<FormValues>
    errors?: FieldErrors<FieldValues>;
}

export function DataTable<T extends string>({ data, columns, control, action, actionsName, setValue, errors }: IProps<T>) {
    const [isEditable, setIsEditable] = useState<string>('');

    const renderEditableRow = (value: string, name: string) => {
        if ((name === 'title' || name === 'description' || name === 'deadline') && setValue && !isEditable) {
            setValue(name, value)
            setValue("id", isEditable)
        }
        
        if (setValue && control) {
            if (name === 'title' || name === 'description') {
                return (
                    <Input name={name} control={control} error={errors && errors?.[name]?.message  as string} />
                )
            } else if (name === 'deadline') {
                return <CustomDatePicker control={control} name={name} />
            } 
                return value
        }

    }

    return (
        <TableContainer component={Paper}>
            <Table sx={tableStyle} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        {columns.map(column => (
                            <StyledTableCell key={column as string}>{column as string}</StyledTableCell>
                        ))}
                        {actionsName?.length &&
                            <StyledTableCell>actions</StyledTableCell>

                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, index) => (
                        <StyledTableRow key={row.id}>
                            {columns.map(column => (
                                <StyledTableCell component="td" align={'justify'} scope="row" sx={tableCellStyle} key={`${row[column]}`}>
                                    {isEditable === row.id && control ?
                                        renderEditableRow(row[column] as string, column) :
                                        row[column]
                                    }
                                </StyledTableCell>
                            ))}
                            {(actionsName && actionsName?.length > 0) &&
                                <StyledTableCell>
                                    {actionsName?.map((name) => (
                                        <button
                                            key={name}
                                            onClick={() => {
                                                if ((name === 'edit' && !!isEditable) || name === 'delete') {
                                                    action && action(name, row, setIsEditable)
                                                } else {
                                                    setIsEditable(row.id ? row.id : '')
                                                }
                                            }}
                                            type={'submit'}
                                        >
                                            {name}
                                        </button>
                                    ))}
                                </StyledTableCell>
                            }
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}