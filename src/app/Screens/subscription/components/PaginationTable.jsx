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
    const updateHandler = (packages, id) => {
        const updateData = {
            package_name: packages.package_name,
            price: packages.price,
            description: JSON.stringify(packages.description),
            duration: packages.duration,
            no_exam: packages.no_exam,
            repeat: packages.repeat,
            langs: JSON.stringify(packages.langs),
            package_name_ar: packages.package_name_ar,
            price_ar: packages.price_ar,
            description_ar: JSON.stringify(packages.description_ar),
            duration_ar: packages.duration_ar,
            langs_ar: JSON.stringify(packages.langs_ar),
            package_name_nl: packages.package_name_nl,
            price_nl: packages.price_nl,
            description_nl: JSON.stringify(packages.description_nl),
            duration_nl: packages.duration_nl,
            langs_nl: JSON.stringify(packages.langs_nl),
        }
        dispatch(updatePackage(id, updateData, lang))
    }

    return (
        <div style={{ overflowX: 'auto' }} className="w-full overflow-auto">
            <Table style={{ minWidth: 700 }} className="whitespace-pre">
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={2}>Name</TableCell>
                        <TableCell>Price</TableCell>
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
                                    updateData={updateHandler}
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
