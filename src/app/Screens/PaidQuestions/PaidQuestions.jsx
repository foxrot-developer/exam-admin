import { ArrowBack } from '@material-ui/icons'
import { Box, IconButton, Typography, Grid, Button } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CustomButton from 'app/components/Custom/CustomButton'
import CustomModal from 'app/components/Custom/Modal'
import SimpleCard from 'app/components/cards/SimpleCard'
import PaginationTable from './components/PaginationTable'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import {
    createPaidExamQuestion,
    getPaidQuestion,
} from 'app/redux/actions/ExamAction'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

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

const PaidQuestion = () => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const [open, setOpen] = React.useState(false)
    const [questionList, setQuestionList] = React.useState({
        part1: [],
        part2: [],
        part3: [],
    })

    const questions = useSelector((state) => state.exam.questions)
    console.log(questions)
    const [language, setLanguage] = useState({
        isEnglish: true,
        isArabic: false,
        isNetherlands: false,
    })

    useEffect(() => {
        dispatch(getPaidQuestion('en'))
    }, [])

    const [question, setQuestion] = useState({
        question: '',
        options: ['', '', ''],
        answer: '',
        part: '',
        question_ar: '',
        options_ar: ['', '', ''],
        answer_ar: '',
        part_ar: '',
        question_nl: '',
        options_nl: ['', '', ''],
        answer_nl: '',
        part_nl: '',
        reason: '',
        reason_ar: '',
        reason_nl: '',
        image: null,
    })

    const [dragAndDropQuestion, setDragAndDropQuestion] = useState({
        question: '',
        options: ['', '', '', '', ''],
        answer: [],
        part: '',
        question_ar: '',
        options_ar: ['', '', '', '', ''],
        answer_ar: [],
        part_ar: '',
        question_nl: '',
        options_nl: ['', '', '', '', ''],
        answer_nl: [],
        part_nl: '',
        circles: [],
        reason: '',
        reason_ar: '',
        reason_nl: '',
        image: null,
        draggable: true,
    })

    const englishPart = ['part 1', 'part 2', 'part 3']
    const arabicPart = ['الجزء 1', 'الجزء 2', 'الجزء 3']
    const netherlandsPart = ['Deel 1', 'Deel 2', 'Deel 3']
    const dragDropenglishPart = ['part 2', 'part 3']
    const dragDroparabicPart = ['الجزء 2', 'الجزء 3']
    const dragDropnetherlandsPart = ['Deel 2', 'Deel 3']
    const [lang, setLang] = useState('en')
    useEffect(() => {
        if (questions) {
            if (lang === '' || lang === 'en') {
                setQuestionList({
                    part1: questions.filter(
                        (question) => question.part === 'part 1'
                    ),
                    part2: questions.filter(
                        (question) => question.part === 'part 2'
                    ),
                    part3: questions.filter(
                        (question) => question.part === 'part 3'
                    ),
                })
            } else if (lang === 'ar') {
                setQuestionList({
                    part1: questions.filter(
                        (question) => question.part === 'الجزء 1'
                    ),
                    part2: questions.filter(
                        (question) => question.part === 'الجزء 2'
                    ),
                    part3: questions.filter(
                        (question) => question.part === 'الجزء 3'
                    ),
                })
            } else if (lang === 'nl') {
                setQuestionList({
                    part1: questions.filter(
                        (question) => question.part === 'Deel 1'
                    ),
                    part2: questions.filter(
                        (question) => question.part === 'Deel 2'
                    ),
                    part3: questions.filter(
                        (question) => question.part === 'Deel 3'
                    ),
                })
            }
        }
    }, [questions])

    const [dragAbleOpen, setDragAbleOpen] = useState(false)

    const createQuestion = () => {
        if (language.isNetherlands) {
            console.log(question)
            if (!dragAbleOpen) {
                const data = new FormData()
                data.append('question', question.question)
                data.append('options', JSON.stringify(question.options))
                data.append('answer', question.answer)
                data.append('part', question.part)
                data.append('question_ar', question.question_ar)
                data.append('options_ar', JSON.stringify(question.options_ar))
                data.append('answer_ar', question.answer_ar)
                data.append('part_ar', question.part_ar)
                data.append('question_nl', question.question_nl)
                data.append('options_nl', JSON.stringify(question.options_nl))
                data.append('answer_nl', question.answer_nl)
                data.append('part_nl', question.part_nl)
                data.append('questionImage', question.image)
                data.append('reason', question.reason)
                data.append('reason_ar', question.reason_ar)
                data.append('reason_nl', question.reason_nl)
                data.append('draggable', false)
                dispatch(
                    createPaidExamQuestion(
                        data,
                        setOpen,
                        setQuestion,
                        lang,
                        setCircles
                    )
                )
            } else {
                const data = new FormData()
                console.log({ dragAndDropQuestion })
                data.append('question', dragAndDropQuestion.question)
                data.append(
                    'options',
                    JSON.stringify(dragAndDropQuestion.options)
                )
                data.append(
                    'answer',
                    JSON.stringify(dragAndDropQuestion.circles)
                )
                data.append('part', dragAndDropQuestion.part)
                data.append('question_ar', dragAndDropQuestion.question_ar)
                data.append(
                    'options_ar',
                    JSON.stringify(dragAndDropQuestion.options_ar)
                )
                data.append(
                    'answer_ar',
                    JSON.stringify(dragAndDropQuestion.circles)
                )
                data.append('part_ar', dragAndDropQuestion.part_ar)
                data.append('question_nl', dragAndDropQuestion.question_nl)
                data.append(
                    'options_nl',
                    JSON.stringify(dragAndDropQuestion.options_nl)
                )
                data.append(
                    'answer_nl',
                    JSON.stringify(dragAndDropQuestion.circles)
                )
                data.append('part_nl', dragAndDropQuestion.part_nl)
                data.append('questionImage', dragAndDropQuestion.image)
                data.append('reason', dragAndDropQuestion.reason)
                data.append('reason_ar', dragAndDropQuestion.reason_ar)
                data.append('reason_nl', dragAndDropQuestion.reason_nl)
                data.append('draggable', true)

                dispatch(
                    createPaidExamQuestion(
                        data,
                        setDragAbleOpen,
                        setDragAndDropQuestion,
                        lang,
                        setCircles
                    )
                )
            }
        } else if (language.isEnglish) {
            setLanguage({
                isEnglish: false,
                isArabic: true,
                isNetherlands: false,
            })
        } else if (language.isArabic) {
            setLanguage({
                isEnglish: false,
                isArabic: false,
                isNetherlands: true,
            })
        }
    }

    const [circles, setCircles] = useState([])

    const getClickCoords = (event) => {
        var e = event.target
        var dim = e.getBoundingClientRect()
        var x = event.clientX - dim.left
        var y = event.clientY - dim.top
        return [x, y]
    }

    const addCircle = (event) => {
        if (circles.length < 5) {
            let [x, y] = getClickCoords(event)
            let newCircle = (
                <g id="UrTavla">
                    <circle
                        key={circles.length + 1}
                        cx={x}
                        cy={y}
                        r="20"
                        stroke="black"
                        strokeWidth="1"
                        fill="white"
                    ></circle>
                    <text
                        x={x}
                        y={y}
                        text-anchor="middle"
                        stroke="#51c5cf"
                        stroke-width="2px"
                        dy=".3em"
                    >
                        {circles.length + 1}
                    </text>
                </g>
            )
            let allCircles = [...circles, newCircle]
            setCircles(allCircles)
            setDragAndDropQuestion({
                ...dragAndDropQuestion,
                circles: [
                    ...dragAndDropQuestion.circles,
                    {
                        x: x,
                        y: y,
                        id: circles.length + 1,
                    },
                ],
            })
        }
    }

    const navigation = useHistory()

    return (
        <Box component="div" className={classes.root}>
            <CustomModal open={open} setOpen={setOpen}>
                <FormControl encType="multipart/form-data">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6">
                                Create Question
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                margin="dense"
                                fullWidth
                                variant="outlined"
                                required
                                accept=".jpg, .png, .jpeg"
                                type={'file'}
                                onChange={(e) => {
                                    setQuestion({
                                        ...question,
                                        image: e.target.files[0],
                                    })
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Box
                                component="div"
                                className={classes.languageBtnContainer}
                            >
                                <Button
                                    variant="contained"
                                    style={{
                                        width: '30%',
                                        backgroundColor: language.isEnglish
                                            ? '#EEBC1D'
                                            : '#FFF',
                                        fontWeight: '600',
                                        boxShadow: '0px 0px 10px #EEBC1D',
                                        marginBottom: '10px',
                                        padding: '10px',
                                        paddingLeft: '30px',
                                        paddingRight: '30px',
                                    }}
                                    onClick={() => {
                                        setLanguage({
                                            isEnglish: true,
                                            isArabic: false,
                                            isNetherlands: false,
                                        })
                                    }}
                                >
                                    English
                                </Button>
                                <Button
                                    dis
                                    variant="contained"
                                    style={{
                                        width: '30%',
                                        backgroundColor: language.isArabic
                                            ? '#EEBC1D'
                                            : '#FFF',
                                        fontWeight: '600',
                                        boxShadow: '0px 0px 10px #EEBC1D',
                                        marginBottom: '10px',
                                        padding: '10px',
                                        paddingLeft: '30px',
                                        paddingRight: '30px',
                                    }}
                                    onClick={() => {
                                        setLanguage({
                                            isEnglish: false,
                                            isArabic: true,
                                            isNetherlands: false,
                                        })
                                    }}
                                >
                                    Arabic
                                </Button>
                                <Button
                                    variant="contained"
                                    style={{
                                        width: '30%',
                                        backgroundColor: language.isNetherlands
                                            ? '#EEBC1D'
                                            : '#FFF',
                                        fontWeight: '600',
                                        boxShadow: '0px 0px 10px #EEBC1D',
                                        marginBottom: '10px',
                                        padding: '10px',
                                        paddingLeft: '30px',
                                        paddingRight: '30px',
                                    }}
                                    onClick={() => {
                                        setLanguage({
                                            isEnglish: false,
                                            isArabic: false,
                                            isNetherlands: true,
                                        })
                                    }}
                                >
                                    Netherland
                                </Button>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                    Part
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Age"
                                    value={
                                        language.isEnglish
                                            ? question.part
                                            : language.isArabic
                                            ? question.part_ar
                                            : question.part_nl
                                    }
                                    onChange={(e) => {
                                        var index = englishPart.indexOf(
                                            e.target.value
                                        )
                                        setQuestion({
                                            ...question,
                                            part: englishPart[index],
                                            part_ar: arabicPart[index],
                                            part_nl: netherlandsPart[index],
                                        })
                                    }}
                                    required
                                >
                                    {language.isEnglish
                                        ? englishPart.map((part, index) => (
                                              <MenuItem
                                                  key={index}
                                                  value={part}
                                              >
                                                  {part}
                                              </MenuItem>
                                          ))
                                        : language.isArabic
                                        ? arabicPart.map((part, index) => (
                                              <MenuItem
                                                  key={index}
                                                  value={part}
                                              >
                                                  {part}
                                              </MenuItem>
                                          ))
                                        : language.isNetherlands
                                        ? netherlandsPart.map((part, index) => (
                                              <MenuItem
                                                  key={index}
                                                  value={part}
                                              >
                                                  {part}
                                              </MenuItem>
                                          ))
                                        : null}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                margin="dense"
                                fullWidth
                                label="Question"
                                variant="outlined"
                                required
                                lang="nl"
                                value={
                                    language.isEnglish
                                        ? question.question
                                        : language.isArabic
                                        ? question.question_ar
                                        : question.question_nl
                                }
                                onChange={(e) => {
                                    if (language.isEnglish) {
                                        setQuestion({
                                            ...question,
                                            question: e.target.value,
                                        })
                                    } else if (language.isArabic) {
                                        setQuestion({
                                            ...question,
                                            question_ar: e.target.value,
                                        })
                                    } else if (language.isNetherlands) {
                                        setQuestion({
                                            ...question,
                                            question_nl: e.target.value,
                                        })
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                margin="dense"
                                fullWidth
                                label="Option A"
                                variant="outlined"
                                required
                                value={
                                    language.isEnglish
                                        ? question.options[0]
                                        : language.isArabic
                                        ? question.options_ar[0]
                                        : question.options_nl[0]
                                }
                                onChange={(e) => {
                                    if (language.isEnglish) {
                                        setQuestion({
                                            ...question,
                                            options: [
                                                e.target.value,
                                                question.options[1],
                                                question.options[2],
                                            ],
                                        })
                                    } else if (language.isArabic) {
                                        setQuestion({
                                            ...question,
                                            options_ar: [
                                                e.target.value,
                                                question.options_ar[1],
                                                question.options_ar[2],
                                            ],
                                        })
                                    } else if (language.isNetherlands) {
                                        setQuestion({
                                            ...question,
                                            options_nl: [
                                                e.target.value,
                                                question.options_nl[1],
                                                question.options_nl[2],
                                            ],
                                        })
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                margin="dense"
                                fullWidth
                                label="Option B"
                                variant="outlined"
                                required
                                value={
                                    language.isEnglish
                                        ? question.options[1]
                                        : language.isArabic
                                        ? question.options_ar[1]
                                        : question.options_nl[1]
                                }
                                onChange={(e) => {
                                    if (language.isEnglish) {
                                        setQuestion({
                                            ...question,
                                            options: [
                                                question.options[0],
                                                e.target.value,
                                                question.options[2],
                                            ],
                                        })
                                    } else if (language.isArabic) {
                                        setQuestion({
                                            ...question,
                                            options_ar: [
                                                question.options_ar[0],
                                                e.target.value,
                                                question.options_ar[2],
                                            ],
                                        })
                                    } else if (language.isNetherlands) {
                                        setQuestion({
                                            ...question,
                                            options_nl: [
                                                question.options_nl[0],
                                                e.target.value,
                                                question.options_nl[2],
                                            ],
                                        })
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                margin="dense"
                                fullWidth
                                label="Option C"
                                variant="outlined"
                                required
                                value={
                                    language.isEnglish
                                        ? question.options[2]
                                        : language.isArabic
                                        ? question.options_ar[2]
                                        : question.options_nl[2]
                                }
                                onChange={(e) => {
                                    if (language.isEnglish) {
                                        setQuestion({
                                            ...question,
                                            options: [
                                                question.options[0],
                                                question.options[1],
                                                e.target.value,
                                            ],
                                        })
                                    } else if (language.isArabic) {
                                        setQuestion({
                                            ...question,
                                            options_ar: [
                                                question.options_ar[0],
                                                question.options_ar[1],
                                                e.target.value,
                                            ],
                                        })
                                    } else if (language.isNetherlands) {
                                        setQuestion({
                                            ...question,
                                            options_nl: [
                                                question.options_nl[0],
                                                question.options_nl[1],
                                                e.target.value,
                                            ],
                                        })
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                margin="dense"
                                fullWidth
                                label="Reason"
                                variant="outlined"
                                required
                                value={
                                    language.isEnglish
                                        ? question.reason
                                        : language.isArabic
                                        ? question.reason_ar
                                        : question.reason_nl
                                }
                                onChange={(e) => {
                                    if (language.isEnglish) {
                                        setQuestion({
                                            ...question,
                                            reason: e.target.value,
                                        })
                                    } else if (language.isArabic) {
                                        setQuestion({
                                            ...question,
                                            reason_ar: e.target.value,
                                        })
                                    } else if (language.isNetherlands) {
                                        setQuestion({
                                            ...question,
                                            reason_nl: e.target.value,
                                        })
                                    }
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="correct-answer">
                                    Correct Aswer
                                </InputLabel>
                                <Select
                                    labelId="correct-answer"
                                    id="correct-answer"
                                    label="Correct Answer"
                                    value={
                                        language.isEnglish
                                            ? question.answer
                                            : language.isArabic
                                            ? question.answer_ar
                                            : question.answer_nl
                                    }
                                    required
                                    onChange={(e) => {
                                        var index = language.isEnglish
                                            ? question.options.indexOf(
                                                  e.target.value
                                              )
                                            : language.isArabic
                                            ? question.options_ar.indexOf(
                                                  e.target.value
                                              )
                                            : question.options_nl.indexOf(
                                                  e.target.value
                                              )
                                        setQuestion({
                                            ...question,
                                            answer: question.options[index],
                                            answer_ar:
                                                question.options_ar[index],
                                            answer_nl:
                                                question.options_nl[index],
                                        })
                                    }}
                                >
                                    {language.isEnglish
                                        ? question.options.map(
                                              (option, index) => (
                                                  <MenuItem
                                                      key={index}
                                                      value={option}
                                                  >
                                                      {option}
                                                  </MenuItem>
                                              )
                                          )
                                        : language.isArabic
                                        ? question.options_ar.map(
                                              (option, index) => (
                                                  <MenuItem
                                                      key={index}
                                                      value={option}
                                                  >
                                                      {option}
                                                  </MenuItem>
                                              )
                                          )
                                        : question.options_nl.map(
                                              (option, index) => (
                                                  <MenuItem
                                                      key={index}
                                                      value={option}
                                                  >
                                                      {option}
                                                  </MenuItem>
                                              )
                                          )}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Box component="div" className={classes.modalContent}>
                            <Button
                                onClick={createQuestion}
                                variant="contained"
                                style={{
                                    backgroundColor: '#EEBC1D',
                                    fontWeight: '600',
                                    boxShadow: '3px 3px 10px #EEBC1D',
                                    marginBottom: '10px',
                                    padding: '10px',
                                    paddingLeft: '30px',
                                    paddingRight: '30px',
                                }}
                            >
                                Create
                            </Button>
                        </Box>
                    </Grid>
                </FormControl>
            </CustomModal>
            <CustomModal
                open={dragAbleOpen}
                setOpen={() => setDragAbleOpen(false)}
            >
                <FormControl encType="multipart/form-data">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6">
                                Create Question
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <svg
                                onClick={addCircle}
                                style={{
                                    width: '750px',
                                    height: '550px',
                                    backgroundImage:
                                        dragAndDropQuestion.image !== null &&
                                        `url(${URL.createObjectURL(
                                            dragAndDropQuestion.image
                                        )})`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center',
                                    backgroundColor: '#ccc',
                                    backgroundSize: 'cover',
                                    alignSelf: 'center',
                                }}
                            >
                                {circles}
                            </svg>
                        </Grid>
                        <Button
                            onClick={() => {
                                setCircles([])
                                setDragAndDropQuestion({
                                    ...dragAndDropQuestion,
                                    circle: [],
                                })
                            }}
                            variant="outlined"
                        >
                            Reset
                        </Button>
                        <Grid item xs={12}>
                            <TextField
                                margin="dense"
                                fullWidth
                                variant="outlined"
                                required
                                accept=".jpg, .png, .jpeg"
                                type={'file'}
                                onChange={(e) => {
                                    setDragAndDropQuestion({
                                        ...dragAndDropQuestion,
                                        image: e.target.files[0],
                                    })
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Box
                                component="div"
                                className={classes.languageBtnContainer}
                            >
                                <Button
                                    variant="contained"
                                    style={{
                                        width: '30%',
                                        backgroundColor: language.isEnglish
                                            ? '#EEBC1D'
                                            : '#FFF',
                                        fontWeight: '600',
                                        boxShadow: '0px 0px 10px #EEBC1D',
                                        marginBottom: '10px',
                                        padding: '10px',
                                        paddingLeft: '30px',
                                        paddingRight: '30px',
                                    }}
                                    onClick={() => {
                                        setLanguage({
                                            isEnglish: true,
                                            isArabic: false,
                                            isNetherlands: false,
                                        })
                                    }}
                                >
                                    English
                                </Button>
                                <Button
                                    dis
                                    variant="contained"
                                    style={{
                                        width: '30%',
                                        backgroundColor: language.isArabic
                                            ? '#EEBC1D'
                                            : '#FFF',
                                        fontWeight: '600',
                                        boxShadow: '0px 0px 10px #EEBC1D',
                                        marginBottom: '10px',
                                        padding: '10px',
                                        paddingLeft: '30px',
                                        paddingRight: '30px',
                                    }}
                                    onClick={() => {
                                        setLanguage({
                                            isEnglish: false,
                                            isArabic: true,
                                            isNetherlands: false,
                                        })
                                    }}
                                >
                                    Arabic
                                </Button>
                                <Button
                                    variant="contained"
                                    style={{
                                        width: '30%',
                                        backgroundColor: language.isNetherlands
                                            ? '#EEBC1D'
                                            : '#FFF',
                                        fontWeight: '600',
                                        boxShadow: '0px 0px 10px #EEBC1D',
                                        marginBottom: '10px',
                                        padding: '10px',
                                        paddingLeft: '30px',
                                        paddingRight: '30px',
                                    }}
                                    onClick={() => {
                                        setLanguage({
                                            isEnglish: false,
                                            isArabic: false,
                                            isNetherlands: true,
                                        })
                                    }}
                                >
                                    Netherland
                                </Button>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                    Part
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Part"
                                    value={
                                        language.isEnglish
                                            ? dragAndDropQuestion.part
                                            : language.isArabic
                                            ? dragAndDropQuestion.part_ar
                                            : dragAndDropQuestion.part_nl
                                    }
                                    onChange={(e) => {
                                        if (language.isEnglish) {
                                            const index =
                                                dragDropenglishPart.indexOf(
                                                    e.target.value
                                                )
                                            setDragAndDropQuestion({
                                                ...dragAndDropQuestion,
                                                part: dragDropenglishPart[
                                                    index
                                                ],
                                                part_ar:
                                                    dragDroparabicPart[index],
                                                part_nl:
                                                    dragDropnetherlandsPart[
                                                        index
                                                    ],
                                            })
                                        } else if (language.isArabic) {
                                            const index =
                                                dragDroparabicPart.indexOf(
                                                    e.target.value
                                                )
                                            setDragAndDropQuestion({
                                                ...dragAndDropQuestion,
                                                part: dragDropenglishPart[
                                                    index
                                                ],
                                                part_ar:
                                                    dragDroparabicPart[index],
                                                part_nl:
                                                    dragDropnetherlandsPart[
                                                        index
                                                    ],
                                            })
                                        } else {
                                            const index =
                                                dragDropnetherlandsPart.indexOf(
                                                    e.target.value
                                                )
                                            setDragAndDropQuestion({
                                                ...dragAndDropQuestion,
                                                part: dragDropenglishPart[
                                                    index
                                                ],
                                                part_ar:
                                                    dragDroparabicPart[index],
                                                part_nl:
                                                    dragDropnetherlandsPart[
                                                        index
                                                    ],
                                            })
                                        }
                                    }}
                                    required
                                >
                                    {language.isEnglish
                                        ? dragDropenglishPart.map(
                                              (part, index) => (
                                                  <MenuItem
                                                      key={index}
                                                      value={part}
                                                  >
                                                      {part}
                                                  </MenuItem>
                                              )
                                          )
                                        : language.isArabic
                                        ? dragDroparabicPart.map(
                                              (part, index) => (
                                                  <MenuItem
                                                      key={index}
                                                      value={part}
                                                  >
                                                      {part}
                                                  </MenuItem>
                                              )
                                          )
                                        : language.isNetherlands
                                        ? dragDropnetherlandsPart.map(
                                              (part, index) => (
                                                  <MenuItem
                                                      key={index}
                                                      value={part}
                                                  >
                                                      {part}
                                                  </MenuItem>
                                              )
                                          )
                                        : null}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                margin="dense"
                                fullWidth
                                label="Question"
                                variant="outlined"
                                required
                                lang="nl"
                                value={
                                    language.isEnglish
                                        ? dragAndDropQuestion.question
                                        : language.isArabic
                                        ? dragAndDropQuestion.question_ar
                                        : dragAndDropQuestion.question_nl
                                }
                                onChange={(e) => {
                                    if (language.isEnglish) {
                                        setDragAndDropQuestion({
                                            ...dragAndDropQuestion,
                                            question: e.target.value,
                                        })
                                    } else if (language.isArabic) {
                                        setDragAndDropQuestion({
                                            ...dragAndDropQuestion,
                                            question_ar: e.target.value,
                                        })
                                    } else if (language.isNetherlands) {
                                        setDragAndDropQuestion({
                                            ...dragAndDropQuestion,
                                            question_nl: e.target.value,
                                        })
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                margin="dense"
                                fullWidth
                                label="Option A"
                                variant="outlined"
                                required
                                value={
                                    language.isEnglish
                                        ? dragAndDropQuestion.options[0]
                                        : language.isArabic
                                        ? dragAndDropQuestion.options_ar[0]
                                        : dragAndDropQuestion.options_nl[0]
                                }
                                onChange={(e) => {
                                    setDragAndDropQuestion({
                                        ...dragAndDropQuestion,
                                        options: [
                                            e.target.value,
                                            dragAndDropQuestion.options[1],
                                            dragAndDropQuestion.options[2],
                                        ],
                                        options_ar: [
                                            e.target.value,
                                            dragAndDropQuestion.options_ar[1],
                                            dragAndDropQuestion.options_ar[2],
                                        ],
                                        options_nl: [
                                            e.target.value,
                                            dragAndDropQuestion.options_nl[1],
                                            dragAndDropQuestion.options_nl[2],
                                        ],
                                    })
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                margin="dense"
                                fullWidth
                                label="Option B"
                                variant="outlined"
                                required
                                value={
                                    language.isEnglish
                                        ? dragAndDropQuestion.options[1]
                                        : language.isArabic
                                        ? dragAndDropQuestion.options_ar[1]
                                        : dragAndDropQuestion.options_nl[1]
                                }
                                onChange={(e) => {
                                    setDragAndDropQuestion({
                                        ...dragAndDropQuestion,
                                        options: [
                                            dragAndDropQuestion.options[0],
                                            e.target.value,
                                            dragAndDropQuestion.options[2],
                                        ],
                                        options_ar: [
                                            dragAndDropQuestion.options_ar[0],
                                            e.target.value,
                                            dragAndDropQuestion.options_ar[2],
                                        ],
                                        options_nl: [
                                            dragAndDropQuestion.options_nl[0],
                                            e.target.value,
                                            dragAndDropQuestion.options_nl[2],
                                        ],
                                    })
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                margin="dense"
                                fullWidth
                                label="Option C"
                                variant="outlined"
                                required
                                value={
                                    language.isEnglish
                                        ? dragAndDropQuestion.options[2]
                                        : language.isArabic
                                        ? dragAndDropQuestion.options_ar[2]
                                        : dragAndDropQuestion.options_nl[2]
                                }
                                onChange={(e) => {
                                    setDragAndDropQuestion({
                                        ...dragAndDropQuestion,
                                        options: [
                                            dragAndDropQuestion.options[0],
                                            dragAndDropQuestion.options[1],
                                            e.target.value,
                                        ],
                                        options_ar: [
                                            dragAndDropQuestion.options_ar[0],
                                            dragAndDropQuestion.options_ar[1],
                                            e.target.value,
                                        ],
                                        options_nl: [
                                            dragAndDropQuestion.options_nl[0],
                                            dragAndDropQuestion.options_nl[1],
                                            e.target.value,
                                        ],
                                    })
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                margin="dense"
                                fullWidth
                                label="Option D"
                                variant="outlined"
                                required
                                value={
                                    language.isEnglish
                                        ? dragAndDropQuestion.options[3]
                                        : language.isArabic
                                        ? dragAndDropQuestion.options_ar[3]
                                        : dragAndDropQuestion.options_nl[3]
                                }
                                onChange={(e) => {
                                    setDragAndDropQuestion({
                                        ...dragAndDropQuestion,
                                        options: [
                                            dragAndDropQuestion.options[0],
                                            dragAndDropQuestion.options[1],
                                            dragAndDropQuestion.options[2],
                                            e.target.value,
                                            dragAndDropQuestion.options[4],
                                        ],
                                        options_ar: [
                                            dragAndDropQuestion.options_ar[0],
                                            dragAndDropQuestion.options_ar[1],
                                            dragAndDropQuestion.options_ar[2],
                                            e.target.value,
                                            dragAndDropQuestion.options_ar[4],
                                        ],
                                        options_nl: [
                                            dragAndDropQuestion.options_nl[0],
                                            dragAndDropQuestion.options_nl[1],
                                            dragAndDropQuestion.options_nl[2],
                                            e.target.value,
                                            dragAndDropQuestion.options_nl[4],
                                        ],
                                    })
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                margin="dense"
                                fullWidth
                                label="Option E"
                                variant="outlined"
                                required
                                value={
                                    language.isEnglish
                                        ? dragAndDropQuestion.options[4]
                                        : language.isArabic
                                        ? dragAndDropQuestion.options_ar[4]
                                        : dragAndDropQuestion.options_nl[4]
                                }
                                onChange={(e) => {
                                    setDragAndDropQuestion({
                                        ...dragAndDropQuestion,
                                        options: [
                                            dragAndDropQuestion.options[0],
                                            dragAndDropQuestion.options[1],
                                            dragAndDropQuestion.options[2],
                                            dragAndDropQuestion.options[3],
                                            e.target.value,
                                        ],
                                        options_ar: [
                                            dragAndDropQuestion.options_ar[0],
                                            dragAndDropQuestion.options_ar[1],
                                            dragAndDropQuestion.options_ar[2],
                                            dragAndDropQuestion.options_ar[3],
                                            e.target.value,
                                        ],
                                        options_nl: [
                                            dragAndDropQuestion.options_nl[0],
                                            dragAndDropQuestion.options_nl[1],
                                            dragAndDropQuestion.options_nl[2],
                                            dragAndDropQuestion.options_nl[3],
                                            e.target.value,
                                        ],
                                    })
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                margin="dense"
                                fullWidth
                                label="Reason"
                                variant="outlined"
                                required
                                value={
                                    language.isEnglish
                                        ? dragAndDropQuestion.reason
                                        : language.isArabic
                                        ? dragAndDropQuestion.reason_ar
                                        : dragAndDropQuestion.reason_nl
                                }
                                onChange={(e) => {
                                    if (language.isEnglish) {
                                        setDragAndDropQuestion({
                                            ...dragAndDropQuestion,
                                            reason: e.target.value,
                                        })
                                    } else if (language.isArabic) {
                                        setDragAndDropQuestion({
                                            ...dragAndDropQuestion,
                                            reason_ar: e.target.value,
                                        })
                                    } else if (language.isNetherlands) {
                                        setDragAndDropQuestion({
                                            ...dragAndDropQuestion,
                                            reason_nl: e.target.value,
                                        })
                                    }
                                }}
                            />
                        </Grid>
                        <Box component="div" className={classes.modalContent}>
                            <Button
                                onClick={createQuestion}
                                variant="contained"
                                style={{
                                    backgroundColor: '#EEBC1D',
                                    fontWeight: '600',
                                    boxShadow: '3px 3px 10px #EEBC1D',
                                    marginBottom: '10px',
                                    padding: '10px',
                                    paddingLeft: '30px',
                                    paddingRight: '30px',
                                }}
                            >
                                {language.isNetherlands ? 'Create' : 'Next'}
                            </Button>
                        </Box>
                    </Grid>
                </FormControl>
            </CustomModal>
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
                            dispatch(getPaidQuestion(e.target.value))
                        }}
                        required
                    >
                        <MenuItem value={'en'}>English</MenuItem>
                        <MenuItem value={'ar'}>Arabic</MenuItem>
                        <MenuItem value={'nl'}>Netherland</MenuItem>
                    </Select>
                </FormControl>
                <Box component="div">
                    <CustomButton
                        eventHandler={() => {
                            setOpen(true)
                        }}
                        title="Create Question"
                    />
                    <CustomButton
                        eventHandler={() => {
                            setDragAbleOpen(true)
                        }}
                        title="Create DragAble Question"
                    />
                    <CustomButton
                        eventHandler={() => {
                            navigation.push('/dashboard/import/paid-question')
                        }}
                        title="Import Questions"
                    />
                </Box>
            </Box>
            <SimpleCard title="Part 1">
                <PaginationTable data={questionList.part1} lang={lang} />
            </SimpleCard>
            <SimpleCard title="Part 2">
                <PaginationTable data={questionList.part2} lang={lang} />
            </SimpleCard>
            <SimpleCard title="Part 3">
                <PaginationTable data={questionList.part3} lang={lang} />
            </SimpleCard>
        </Box>
    )
}

export default PaidQuestion
