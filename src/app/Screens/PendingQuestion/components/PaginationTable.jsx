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
import { createImproveFreeExam } from 'app/redux/actions/ExamAction'

const PaginationTable = ({ data, setData, mainQuestion }) => {
    const [rowsPerPage, setRowsPerPage] = React.useState(25)
    const [page, setPage] = React.useState(0)
    const dispatch = useDispatch()

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    const updateQuestion = (data) => {
        dispatch(createImproveFreeExam(data))
    }

    const removeQuestion = (id, part) => {
        const tempArray = mainQuestion
        if (part === 'part1') tempArray.part1.remove(id)
        else if (part === 'part2') tempArray.part2.remove(id)
        else if (part === 'part3') tempArray.part3.remove(id)
    }

    return (
        <div className="w-full " style={{ overflowX: 'auto' }}>
            <Table style={{ minWidth: 700 }} className="whitespace-pre">
                <TableHead>
                    <TableRow>
                        <TableCell width={100}>Part</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Image</TableCell>
                        <TableCell colSpan={2}>Question</TableCell>
                        <TableCell>Option A </TableCell>
                        <TableCell>Option B</TableCell>
                        <TableCell>Option C</TableCell>
                        <TableCell>Answer</TableCell>
                        <TableCell align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data
                        .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                        )
                        .map((subscriber, index) => (
                            <TableRow key={subscriber.question}>
                                <CustomTableCell
                                    setData={setData}
                                    index={index}
                                    data={data}
                                    mainQuestion={mainQuestion}
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
                rowsPerPageOptions={[25]}
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
