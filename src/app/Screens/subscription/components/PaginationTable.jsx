import React, { useState } from 'react'
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TablePagination,
} from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { deletePackage, updatePackage } from 'app/redux/actions/PackageActions'
import CustomTableCell from './CustomTableCell'

const PaginationTable = ({ data, lang }) => {
    const [rowsPerPage, setRowsPerPage] = useState(8)
    const [page, setPage] = useState(0)
    const dispatch = useDispatch()

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    const removeUser = (id) => {
        dispatch(deletePackage(id, lang))
    }

    return (
        <div style={{ overflowX: 'auto' }} className="w-full overflow-auto">
            <Table style={{ minWidth: 700 }} className="whitespace-pre">
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={2}>Name</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Inverval</TableCell>
                        <TableCell>Duration</TableCell>
                        <TableCell>No Of Exams</TableCell>
                        <TableCell colSpan={2} align="center">
                            Action
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data !== undefined &&
                        data.length > 0 &&
                        data
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((subscriber, index) => (
                                <CustomTableCell
                                    lang={lang}
                                    subscriber={subscriber}
                                    removeUser={removeUser}
                                />
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
