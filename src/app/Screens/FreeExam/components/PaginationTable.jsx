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
import { deleteFreeExam, updateFreeExam } from 'app/redux/actions/ExamAction'

const PaginationTable = ({ data, lang }) => {
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

    const updateQuestion = (data, id, setEditMode) => {
        dispatch(updateFreeExam(data, id, setEditMode, lang))
    }

    const removeQuestion = (id) => {
        dispatch(deleteFreeExam(id, lang))
    }

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
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data
                        .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                        )
                        .map((subscriber, index) => (
                            <TableRow key={subscriber.id}>
                                <CustomTableCell
                                    lang={lang}
                                    key={subscriber.id}
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
                count={data.length}
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
