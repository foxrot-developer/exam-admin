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
import { deletePaidExam, updatePaidExam } from 'app/redux/actions/ExamAction'

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

    const removeUser = (id) => {
        dispatch(deletePaidExam(id, lang))
    }

    const updateData = (id, value, setEditMode) => {
        dispatch(updatePaidExam(id, value, setEditMode, lang))
    }

    return (
        <div style={{ overflowX: 'auto' }} className="w-full overflow-auto">
            <Table style={{ minWidth: 700 }} className="whitespace-pre">
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={2}>Name</TableCell>
                        <TableCell colSpan={2}>Description</TableCell>
                        <TableCell align="center">Action</TableCell>
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
                                        key={subscriber.id}
                                        subscriber={subscriber}
                                        removeUser={removeUser}
                                        updateData={updateData}
                                        lang={lang}
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
