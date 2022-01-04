import React, { useEffect, useState } from 'react'
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
    const [rowsPerPage, setRowsPerPage] = useState(30)
    const [page, setPage] = useState(0)
    const dispatch = useDispatch()
    const [part, setPart] = useState([])

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    useEffect(() => {
        setPart(data)
    }, [data])
    const updateQuestion = (data) => {
        dispatch(createImproveFreeExam(data))
    }
    console.log(mainQuestion)
    const removeQuestion = (id, tempPart) => {
        const tempArray = mainQuestion
        if (tempPart === 'part 1') {
            tempArray.part1 = tempArray.part1.filter((item) => item.id !== id)
        } else if (tempPart === 'part 2') {
            tempArray.part2 = tempArray.part2.filter((item) => item.id !== id)
        } else if (tempPart === 'part 3') {
            tempArray.part3 = tempArray.part3.filter((item) => item.id !== id)
        }
        setPart(part.filter((item) => item.id !== id))
        console.log(tempArray, mainQuestion, part)
        setData(tempArray)
    }

    return (
        <div className="w-full " style={{ overflowX: 'auto' }}>
            <Table style={{ minWidth: 1000 }} className="whitespace-pre">
                <TableHead>
                    <TableRow>
                        <TableCell width={100}>Part</TableCell>
                        <TableCell width={100}>Type</TableCell>
                        <TableCell width={150}>Image</TableCell>
                        <TableCell width={500}>Question</TableCell>
                        <TableCell width={200}>Option A </TableCell>
                        <TableCell width={200}>Option B</TableCell>
                        <TableCell width={200}>Option C</TableCell>
                        <TableCell width={200}>Answer</TableCell>
                        <TableCell width={500}>Reason</TableCell>
                        <TableCell width={200} align="center">
                            Actions
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {part
                        .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                        )
                        .map((subscriber, index) => (
                            <TableRow key={subscriber.id}>
                                <CustomTableCell
                                    setData={setData}
                                    key={subscriber.id}
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
                count={part.length}
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
