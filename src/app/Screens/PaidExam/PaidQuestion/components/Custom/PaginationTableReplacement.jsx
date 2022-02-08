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
import CustomTableCell from './CustomTableCellReplacement'
import { getReplacedQuestion } from '../../../../../redux/actions/ExamAction'

const PaginationTableReplacement = ({ replacementPart, setModal }) => {
    const [rowsPerPage, setRowsPerPage] = React.useState(30)
    const [page, setPage] = React.useState(0)
    const dispatch = useDispatch()

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    const replace = (index) => {
        console.log(replacementPart, replacementPart.questionId)
        dispatch(
            getReplacedQuestion(
                replacementPart.id,
                {
                    question_id: replacementPart.questionId,
                    new_question_id: replacementPart.english[index]._id,
                    question_img: replacementPart.english[index].questionImage,
                    question: replacementPart.english[index].question,
                    draggable: replacementPart.english[index].draggable,
                    question_ar: replacementPart.arabic[index].question,
                    question_nl: replacementPart.netherlands[index].question,
                    answer: replacementPart.english[index].answer,
                    answer_ar: replacementPart.arabic[index].answer,
                    answer_nl: replacementPart.netherlands[index].answer,
                    options: replacementPart.english[index].options,
                    options_ar: replacementPart.arabic[index].options,
                    options_nl: replacementPart.netherlands[index].options,
                    part: replacementPart.english[index].part,
                    reason: replacementPart.english[index].reason,
                    reason_ar: replacementPart.arabic[index].reason,
                    reason_nl: replacementPart.netherlands[index].reason,
                },
                setModal
            )
        )
    }

    return (
        <div className="w-full " style={{ overflowX: 'auto' }}>
            <Table style={{ minWidth: 800 }} className="whitespace-pre">
                <TableHead>
                    <TableRow>
                        <TableCell width={100}>Part</TableCell>
                        <TableCell width={100}>Draggable</TableCell>
                        <TableCell width={150}>Image</TableCell>
                        <TableCell width={500}>Question</TableCell>
                        <TableCell width={200}>Option A </TableCell>
                        <TableCell width={200}>Option B</TableCell>
                        <TableCell width={200}>Option C</TableCell>
                        <TableCell width={200}>Answer</TableCell>
                        <TableCell width={500}>Reason</TableCell>
                        <TableCell width={80}>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {replacementPart !== undefined &&
                        replacementPart.english
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((subscriber, index) => (
                                <TableRow key={subscriber._id}>
                                    <CustomTableCell
                                        subscriber={subscriber}
                                        index={index}
                                        handleChange={replace}
                                    />
                                </TableRow>
                            ))}
                </TableBody>
            </Table>

            <TablePagination
                className="px-4"
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={
                    replacementPart !== undefined
                        ? replacementPart.english.length
                        : 0
                }
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

export default PaginationTableReplacement
