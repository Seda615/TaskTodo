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
import { useState } from "react";
import { Control, UseFormSetValue } from "react-hook-form";
import { Input } from "../Input";
import { CustomDatePicker } from "../DatePicker";


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

type FormValues = {
    title: string
    description?: string
    deadline?: string
    id?: string
}



interface IProps<T extends string> {
    data: (Partial<Record<T, string | undefined>> & { id: string })[],
    columns: T[],
    control?: Control<FormValues, any>,
    actionsName?: string[],
    action?: (action: string, column: Partial<Record<T, string | undefined>>) => void
    setValue?: UseFormSetValue<FormValues>
}

export function DataTable<T extends string>({ data, columns, control, action, actionsName, setValue }: IProps<T>) {
    const [isEditable, setIsEditable] = useState('');

    const renderEditableRow = (value: string, name: string) => {
        if (setValue && control) {
            setValue("id", isEditable)
            if (name === 'title' || name === 'description') {
                setValue(name, value)
                return (
                    <Input name={name} control={control} />
                )
            } else if (name === 'deadline') {
                setValue(name, value)
                return <CustomDatePicker control={control} name={name} />
            } else {
                return value
            }
        }

    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
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
                        <StyledTableRow key={index}>
                            {columns.map(column => (
                                <StyledTableCell component="th" scope="row" key={`${row.id}_${column}`}>
                                    {isEditable === row.id && control ?
                                        renderEditableRow(row[column] as string, column) :
                                        row[column]
                                    }
                                </StyledTableCell>
                            ))}
                            {(actionsName && actionsName?.length > 0) &&
                                <StyledTableCell>

                                    {actionsName?.map((name) => (
                                        <StyledTableCell>

                                            <button
                                                key={name}
                                                onClick={() => {
                                                    if ((name === 'edit' && !!isEditable) || name === 'delete') {
                                                        setIsEditable('')
                                                        action && action(name, row)
                                                    } else {
                                                        setIsEditable(row.id ? row.id : '')
                                                    }
                                                }}
                                                type={'submit'}
                                            >
                                                {name}
                                            </button>
                                        </StyledTableCell>

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