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
        image: null,
    })

    const englishPart = ['part 1', 'part 2', 'part 3']
    const arabicPart = ['الجزء 1', 'الجزء 2', 'الجزء 3']
    const netherlandsPart = ['Deel 1', 'Deel 2', 'Deel 3']
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

    const createQuestion = () => {
        if (language.isNetherlands) {
            console.log(question)
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

            dispatch(createPaidExamQuestion(data, setOpen, setQuestion))
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
                                disabled={language.isNetherlands ? false : true}
                            >
                                Create
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
                        onChange={(e) => {
                            setLang(e.target.value)
                            dispatch(getPaidQuestion(e.target.value))
                        }}
                        required
                    >
                        <MenuItem value={'en'}>English</MenuItem>
                        <MenuItem value={'ar'}>Arbic</MenuItem>
                        <MenuItem value={'nl'}>Netherland</MenuItem>
                    </Select>
                </FormControl>
                <CustomButton
                    eventHandler={() => {
                        setOpen(true)
                    }}
                    title="Create Question"
                />
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
