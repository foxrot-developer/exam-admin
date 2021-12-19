import React, { useEffect } from 'react'
import { Box, IconButton, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import SimpleCard from 'app/components/cards/SimpleCard'
import PaginationTable from './components/PaginationTable'
import { ArrowBack } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPaidExamResult, getPaidExam } from 'app/redux/actions/ExamAction'
import { getUserList } from 'app/redux/actions/UserActions'

const useStyles = makeStyles(({ palette, ...theme }) => ({
    root: {
        backgroundColor: palette.background.default,
        padding: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
    },
    btnRoot: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    modalContent: {
        width: '100%',
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}))

const ExamResult = () => {
    const dispatch = useDispatch()
    const classes = useStyles()

    const result = useSelector((state) => state.exam.result)
    const exam = useSelector((state) => state.exam.exam)
    const userList = useSelector((state) => state.user.userList)
    console.log(userList)
    useEffect(() => {
        dispatch(getAllPaidExamResult())
        dispatch(getUserList())
        dispatch(getPaidExam())
    }, [])
    const [filterResult, setFilterResult] = React.useState([])

    useEffect(() => {
        var data = []
        if (result.length > 0 && userList.length > 0 && exam.length > 0) {
            result.map((item) =>
                data.push({
                    username: userList.find((user) => user.id === item.userId)
                        .username,
                    examName: exam.find(
                        (exam) => exam.id === item.results.examId
                    ).name,
                    part1: `${item.results.result.part_one.correct}/${item.results.result.part_one.final_result.length}`,
                    part1_status: item.results.result.part_one.pass,
                    part2: `${item.results.result.part_two.correct}/${item.results.result.part_two.final_result.length}`,
                    part2_status: item.results.result.part_two.pass,
                    part3: `${item.results.result.part_three.correct}/${item.results.result.part_three.final_result.length}`,
                    part3_status: item.results.result.part_three.pass,
                })
            )
            console.log({ data })
            setFilterResult(data)
        }
    }, [exam, result, userList])

    return (
        <Box component="div" className={classes.root}>
            <Box component="div" mb={4} className={classes.btnRoot}>
                <IconButton
                    onClick={() => {
                        window.history.back()
                    }}
                >
                    <ArrowBack />
                </IconButton>
                <Typography variant="h4">Paid Exams Result</Typography>
            </Box>
            <SimpleCard title="List">
                <PaginationTable data={filterResult} />
            </SimpleCard>
        </Box>
    )
}

export default ExamResult
