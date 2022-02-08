import { ArrowBack } from '@material-ui/icons'
import { Box, IconButton, Typography, Modal } from '@material-ui/core'
import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import SimpleCard from 'app/components/cards/SimpleCard'
import PaginationTable from './components/PaginationTable'
import {
    getPaidExamQuestion,
    getAllLanguageExams,
} from 'app/redux/actions/ExamAction'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import PaginationTableReplacement from './components/Custom/PaginationTableReplacement'

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
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    modalContent: {
        backgroundColor: '#fff',
        flexDirection: 'column',
        display: 'flex',
        width: '80%',
        height: '80vh',
        padding: theme.spacing(4),
        overflowY: 'auto',

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
    const allLanguageExam = useSelector((state) => state.exam.allLanguageExam)
    const questions = useSelector((state) => state.exam.questions)

    useEffect(() => {
        dispatch(getPaidExamQuestion(id, lang))
        dispatch(getAllLanguageExams())
    }, [])

    const [replacementPart, setReplacementPart] = React.useState()
    const [isReplacement, setIsReplacement] = React.useState(false)

    const handleChange = ({ part, questionId }) => {
        setIsReplacement(true)
        if (part === 'part 1' || part === 'الجزء 1' || part === 'Deel 1') {
            setReplacementPart({
                id,
                questionId,
                english: allLanguageExam.english.filter(
                    (item) => item.part === 'part 1'
                ),
                arabic: allLanguageExam.arabic.filter(
                    (item) => item.part === 'الجزء 1'
                ),
                netherlands: allLanguageExam.netherlands.filter(
                    (item) => item.part === 'Deel 1'
                ),
            })
        } else if (
            part === 'part 2' ||
            part === 'الجزء 2' ||
            part === 'Deel 2'
        ) {
            setReplacementPart({
                id,
                questionId,
                english: allLanguageExam.english.filter(
                    (item) => item.part === 'part 2'
                ),
                arabic: allLanguageExam.arabic.filter(
                    (item) => item.part === 'الجزء 2'
                ),
                netherlands: allLanguageExam.netherlands.filter(
                    (item) => item.part === 'Deel 2'
                ),
            })
        } else if (
            part === 'part 3' ||
            part === 'الجزء 3' ||
            part === 'Deel 3'
        ) {
            setReplacementPart({
                id,
                questionId,
                english: allLanguageExam.english.filter(
                    (item) => item.part === 'part 3'
                ),
                arabic: allLanguageExam.arabic.filter(
                    (item) => item.part === 'الجزء 3'
                ),
                netherlands: allLanguageExam.netherlands.filter(
                    (item) => item.part === 'Deel 3'
                ),
            })
        }
    }

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
            <Modal open={isReplacement}>
                <Box className={classes.modalRoot}>
                    <Box className={classes.modalContent}>
                        <IconButton onClick={() => setIsReplacement(false)}>
                            <ArrowBack />
                        </IconButton>
                        <Typography variant="h6">Replace Question</Typography>
                        <PaginationTableReplacement
                            replacementPart={replacementPart}
                            setModal={setIsReplacement}
                        />
                    </Box>
                </Box>
            </Modal>
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
                <PaginationTable
                    data={questionList.part1}
                    handleChange={handleChange}
                />
            </SimpleCard>
            <SimpleCard title="Part 2">
                <PaginationTable
                    data={questionList.part2}
                    handleChange={handleChange}
                />
            </SimpleCard>
            <SimpleCard title="Part 3">
                <PaginationTable
                    data={questionList.part3}
                    handleChange={handleChange}
                />
            </SimpleCard>
        </Box>
    )
}

export default PaidExamQuestion
