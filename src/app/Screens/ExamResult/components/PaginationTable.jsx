import React from 'react'
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TablePagination,
} from '@material-ui/core'
import CustomTableCell from './CustomTableCell'

const PaginationTable = ({ data }) => {
    const [rowsPerPage, setRowsPerPage] = React.useState(8)
    const [page, setPage] = React.useState(0)

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
                        <TableCell>User name</TableCell>
                        <TableCell>Exam name</TableCell>
                        <TableCell>Part One</TableCell>
                        <TableCell>Part two</TableCell>
                        <TableCell>Part three</TableCell>
                        <TableCell>Result</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data
                        .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                        )
                        .map((subscriber, index) => (
                            <TableRow key={subscriber._id}>
                                <CustomTableCell subscriber={subscriber} />
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
