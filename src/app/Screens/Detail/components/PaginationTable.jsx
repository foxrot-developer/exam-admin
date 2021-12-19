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
import { getPackageList } from 'app/redux/actions/PackageActions'

const PaginationTable = ({ data }) => {
    const [rowsPerPage, setRowsPerPage] = React.useState(8)
    const [page, setPage] = React.useState(0)
    const dispatch = useDispatch()
    const packageList = useSelector((state) => state.package.packageList)

    useEffect(() => {
        dispatch(getPackageList())
    }, [])

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    const removeUser = (id) => {
        dispatch(deleteUser(id))
    }

    const blockUsers = (id, value) => {
        dispatch(blockUser(id, value))
    }

    const updateData = (id, value) => {
        dispatch(updateUser(id, value))
    }

    const blockPaymentUser = (id, value) => {
        dispatch(blockPayment(id, value))
    }

    return (
        <div style={{ overflowX: 'auto' }} className="w-full overflow-auto">
            <Table style={{ minWidth: 700 }} className="whitespace-pre">
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={2}>Address</TableCell>
                        <TableCell colSpan={2}>Location</TableCell>
                        <TableCell colSpan={2}>contact</TableCell>
                        <TableCell align="center">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data
                        .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                        )
                        .map((subscriber, index) => (
                            <TableRow key={index}>
                                <CustomTableCell
                                    subscriber={subscriber}
                                    updateData={updateData}
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
