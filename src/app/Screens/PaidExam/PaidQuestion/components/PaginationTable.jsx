import React from 'react'
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TablePagination,
} from '@material-ui/core'
import { useDispatch } from 'react-redux'
import CustomTableCell from './CustomTableCell'

const PaginationTable = ({ data }) => {
    const [rowsPerPage, setRowsPerPage] = React.useState(8)
    const [page, setPage] = React.useState(0)
    const dispatch = useDispatch()

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    const updateQuestion = (data, id, setEditMode) => {}

    const removeQuestion = (id) => {}

    return (
        <div className="w-full " style={{ overflowX: 'auto' }}>
            <Table style={{ minWidth: 700 }} className="whitespace-pre">
                <TableHead>
                    <TableRow>
                        <TableCell>Part</TableCell>
                        <TableCell>Image</TableCell>
                        <TableCell colSpan={2}>Question</TableCell>
                        <TableCell>Option A </TableCell>
                        <TableCell>Option B</TableCell>
                        <TableCell>Option C</TableCell>
                        <TableCell>Answer</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data !== undefined &&
                        data
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((subscriber, index) => (
                                <TableRow key={subscriber.id}>
                                    <CustomTableCell
                                        subscriber={subscriber}
                                        removeUser={removeQuestion}
                                        updateData={updateQuestion}
                                    />
                                </TableRow>
                            ))}
                </TableBody>
            </Table>

            <TablePagination
                className="px-4"
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={data !== undefined ? data.length : 0}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                    'aria-label': 'Previous Page',
                }}
                nextIconButtonProps={{
                    'aria-label': 'Next Page',
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </div>
    )
}

export default PaginationTable
