import React, { useEffect } from 'react'
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TablePagination,
} from '@material-ui/core'
import {
    blockPayment,
    blockUser,
    deleteUser,
    updateUser,
} from 'app/redux/actions/UserActions'
import { useDispatch, useSelector } from 'react-redux'
import CustomTableCell from './CustomTableCell'

const PaginationTableContactInfo = ({ data }) => {
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

    return (
        <div style={{ overflowX: 'auto' }} className="w-full overflow-auto">
            <Table style={{ minWidth: 700 }} className="whitespace-pre">
                <TableHead>
                    <TableRow>
                        <TableCell>Address</TableCell>
                        <TableCell>Contact</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell calSpan={3}>Hours</TableCell>
                        <TableCell>Location</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow key={1}>
                        <TableCell>{data.address}</TableCell>
                        <TableCell>{data.contact}</TableCell>
                        <TableCell>{data.email}</TableCell>
                        <TableCell calSpan={3}>
                            {data.hours !== undefined ? (
                                <ul>
                                    <li>
                                        {JSON.parse(data.hours)
                                            .toString()
                                            .split(',')[0]
                                            .replace('[', '')
                                            .replace('"', '')
                                            .replace('"', '')}
                                    </li>
                                    <li>
                                        {JSON.parse(data.hours)
                                            .toString()
                                            .split(',')[1]
                                            .replace(']', '')
                                            .replace('"', '')
                                            .replace('"', '')}
                                    </li>
                                </ul>
                            ) : (
                                <span>No Time</span>
                            )}
                        </TableCell>
                        <TableCell>{data.location}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>

            <TablePagination
                className="px-4"
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={0}
                rowsPerPage={rowsPerPage}
                page={0}
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

export default PaginationTableContactInfo
