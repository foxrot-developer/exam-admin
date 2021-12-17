import { ArrowBack } from '@material-ui/icons'
import { Box, IconButton, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import SimpleCard from 'app/components/cards/SimpleCard'
import PaginationTable from './components/PaginationTable'
import { getPaidExamQuestion } from 'app/redux/actions/ExamAction'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

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
    modalRoot: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
    },
    modalContent: {
        width: '100%',
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    languageBtnContainer: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
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

const PaidExamQuestion = () => {
    const { id, lang } = useParams()
    const dispatch = useDispatch()
    const classes = useStyles()
    const [questionList, setQuestionList] = React.useState({
        part1: [],
        part2: [],
        part3: [],
    })

    const questions = useSelector((state) => state.exam.questions)
    console.log(questions)

    useEffect(() => {
        dispatch(getPaidExamQuestion(id, lang))
    }, [])

    useEffect(() => {
        if (questions) {
            const { part1, part2, part3 } = questions

            if (
                part1 !== undefined &&
                part2 !== undefined &&
                part3 !== undefined
            ) {
                setQuestionList({
                    part1: JSON.parse(questions.part1),
                    part2: JSON.parse(questions.part2),
                    part3: JSON.parse(questions.part3),
                })
            }
        }
    }, [questions])

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
                <Typography variant="h4">Questions</Typography>
            </Box>
            <SimpleCard title="Part 1">
                <PaginationTable data={questionList.part1} />
            </SimpleCard>
            <SimpleCard title="Part 2">
                <PaginationTable data={questionList.part2} />
            </SimpleCard>
            <SimpleCard title="Part 3">
                <PaginationTable data={questionList.part3} />
            </SimpleCard>
        </Box>
    )
}

export default PaidExamQuestion
