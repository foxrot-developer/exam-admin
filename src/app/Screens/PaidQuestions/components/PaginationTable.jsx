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
import {
    deletePaidQuestion,
    updatePaidQuestion,
} from 'app/redux/actions/ExamAction'

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

    const updateQuestion = (examData, id, setEditMode) => {
        dispatch(updatePaidQuestion(examData, id, setEditMode, lang))
    }

    const removeQuestion = (id) => {
        dispatch(deletePaidQuestion(id, lang))
    }

    return (
        <div className="w-full " style={{ overflowX: 'auto' }}>
            <Table style={{ minWidth: 1000 }} className="whitespace-pre">
                <TableHead>
                    <TableRow>
                        <TableCell width={100}>Part</TableCell>
                        <TableCell width={150}>Image</TableCell>
                        <TableCell width={500}>Question</TableCell>
                        <TableCell width={200}>Option A </TableCell>
                        <TableCell width={200}>Option B</TableCell>
                        <TableCell width={200}>Option C</TableCell>
                        <TableCell width={200}>Answer</TableCell>
                        <TableCell width={500}>Reason</TableCell>
                        <TableCell width={200}>Actions</TableCell>
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
