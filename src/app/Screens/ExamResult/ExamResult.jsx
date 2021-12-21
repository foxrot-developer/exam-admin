import React, { useEffect, useState } from 'react'
import { Box, IconButton, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import SimpleCard from 'app/components/cards/SimpleCard'
import PaginationTable from './components/PaginationTable'
import { ArrowBack } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPaidExamResult, getPaidExam } from 'app/redux/actions/ExamAction'
import { getUserList } from 'app/redux/actions/UserActions'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

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
    btnContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
    },
    langSpinner: {
        width: '250px',
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
        dispatch(getAllPaidExamResult('en'))
        dispatch(getUserList())
        dispatch(getPaidExam('en'))
    }, [])
    const [filterResult, setFilterResult] = React.useState([])

    const [lang, setLang] = useState('en')
    useEffect(() => {
        var data = []
        if (result.length > 0 && userList.length > 0 && exam.length > 0) {
            result.map((item) =>
                data.push({
                    username: userList.find((user) => user._id === item.userId)
                        ?.username,
                    examName: exam.find(
                        (exam) => exam.id === item.results.examId
                    )?.name,
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
            <Box component="div" className={classes.btnContainer}>
                <FormControl className={classes.langSpinner}>
                    <InputLabel id="demo-simple-select-label">
                        Language
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Language"
                        value={lang}
                        onChange={(e) => {
                            setLang(e.target.value)
                            dispatch(getAllPaidExamResult(e.target.value))
                        }}
                        required
                    >
                        <MenuItem value={'en'}>English</MenuItem>
                        <MenuItem value={'ar'}>Arabic</MenuItem>
                        <MenuItem value={'nl'}>Netherland</MenuItem>
                    </Select>
                </FormControl>
                <FormControl className={classes.langSpinner}>
                    <InputLabel id="demo-simple-select-label">User</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="User"
                        onChange={(e) => {
                            var data = []
                            result
                                .filter(
                                    (item) => item.userId === e.target.value
                                )
                                .map((item) =>
                                    data.push({
                                        username: userList.find(
                                            (user) => user._id === item.userId
                                        )?.username,
                                        examName: exam.find(
                                            (exam) =>
                                                exam.id === item.results.examId
                                        )?.name,
                                        part1: `${item.results.result.part_one.correct}/${item.results.result.part_one.final_result.length}`,
                                        part1_status:
                                            item.results.result.part_one.pass,
                                        part2: `${item.results.result.part_two.correct}/${item.results.result.part_two.final_result.length}`,
                                        part2_status:
                                            item.results.result.part_two.pass,
                                        part3: `${item.results.result.part_three.correct}/${item.results.result.part_three.final_result.length}`,
                                        part3_status:
                                            item.results.result.part_three.pass,
                                    })
                                )
                            setFilterResult(data)
                        }}
                        required
                    >
                        {userList.map((item) => (
                            <MenuItem value={item._id}>
                                {item.username}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <SimpleCard title="List">
                <PaginationTable data={filterResult} />
            </SimpleCard>
        </Box>
    )
}

export default ExamResult
