import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import {
    IconButton,
    TableCell,
    Icon,
    TextField,
    Grid,
    Typography,
    Box,
    Button,
} from '@material-ui/core'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import CustomModal from 'app/components/Custom/Modal'

const useStyles = makeStyles((theme) => ({
    input: {
        width: '90%',
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
const CustomTableCell = ({ subscriber, removeUser, updateData, lang }) => {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false)

    const value = {
        question: subscriber.question,
        answer: subscriber.answer,
        options: JSON.parse(subscriber.options),
        part: subscriber.part,
        reason: subscriber.reason,
    }

    const [language, setLanguage] = useState({
        isEnglish: true,
        isArabic: false,
        isNetherlands: false,
    })

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
        circles: [],
        draggable: false,
    })

    const englishPart = ['part 1', 'part 2', 'part 3']
    const arabicPart = ['الجزء 1', 'الجزء 2', 'الجزء 3']
    const netherlandsPart = ['Deel 1', 'Deel 2', 'Deel 3']

    useEffect(() => {
        if (!subscriber.draggable) {
            if (lang === 'en') {
                setLanguage({
                    isEnglish: true,
                    isArabic: false,
                    isNetherlands: false,
                })
                const index = englishPart.indexOf(subscriber.part)
                setQuestion({
                    question: subscriber.question,
                    options: JSON.parse(subscriber.options),
                    answer: subscriber.answer,
                    part: englishPart[index],
                    question_ar: '',
                    options_ar: ['', '', ''],
                    answer_ar: '',
                    part_ar: arabicPart[index],
                    question_nl: '',
                    options_nl: ['', '', ''],
                    answer_nl: '',
                    part_nl: netherlandsPart[index],
                    reason: subscriber.reason,
                    reason_ar: '',
                    reason_nl: '',
                    circles: [],
                    draggable: subscriber.draggable,
                })
            } else if (lang === 'ar') {
                setLanguage({
                    isEnglish: false,
                    isArabic: true,
                    isNetherlands: false,
                })
                const index = arabicPart.indexOf(subscriber.part)

                setQuestion({
                    question: '',
                    options: ['', '', ''],
                    answer: '',
                    part: englishPart[index],
                    question_ar: subscriber.question,
                    options_ar: JSON.parse(subscriber.options),
                    answer_ar: subscriber.answer,
                    part_ar: arabicPart[index],
                    question_nl: '',
                    options_nl: ['', '', ''],
                    answer_nl: '',
                    part_nl: netherlandsPart[index],
                    reason: '',
                    reason_ar: subscriber.reason,
                    draggable: subscriber.draggable,
                    reason_nl: '',
                    circles: [],
                })
            } else if (lang === 'nl') {
                setLanguage({
                    isEnglish: false,
                    isArabic: false,
                    isNetherlands: true,
                })
                const index = netherlandsPart.indexOf(subscriber.part)

                setQuestion({
                    question: '',
                    options: ['', '', ''],
                    answer: '',
                    part: englishPart[index],
                    question_ar: '',
                    options_ar: ['', '', ''],
                    answer_ar: '',
                    part_ar: arabicPart[index],
                    question_nl: subscriber.question,
                    options_nl: JSON.parse(subscriber.options),
                    answer_nl: subscriber.answer,
                    part_nl: netherlandsPart[index],
                    reason: '',
                    reason_ar: '',
                    reason_nl: subscriber.reason,
                    draggable: subscriber.draggable,
                })
            }
        } else {
            if (lang === 'en') {
                setLanguage({
                    isEnglish: true,
                    isArabic: false,
                    isNetherlands: false,
                })
                const index = englishPart.indexOf(subscriber.part)
                setQuestion({
                    question: subscriber.question,
                    options: JSON.parse(subscriber.options),
                    answer: JSON.parse(subscriber.answer),
                    part: englishPart[index],
                    question_ar: '',
                    options_ar: ['', '', ''],
                    answer_ar: '',
                    part_ar: arabicPart[index],
                    question_nl: '',
                    options_nl: ['', '', ''],
                    answer_nl: '',
                    part_nl: netherlandsPart[index],
                    reason: subscriber.reason,
                    draggable: subscriber.draggable,
                    reason_ar: '',
                    reason_nl: '',
                    circles: [],
                })
            } else if (lang === 'ar') {
                setLanguage({
                    isEnglish: false,
                    isArabic: true,
                    isNetherlands: false,
                })
                const index = arabicPart.indexOf(subscriber.part)

                setQuestion({
                    question: '',
                    options: ['', '', ''],
                    answer: '',
                    part: englishPart[index],
                    question_ar: subscriber.question,
                    options_ar: JSON.parse(subscriber.options),
                    answer_ar: JSON.parse(subscriber.answer),
                    part_ar: arabicPart[index],
                    question_nl: '',
                    options_nl: ['', '', ''],
                    answer_nl: '',
                    part_nl: netherlandsPart[index],
                    draggable: subscriber.draggable,
                    reason: '',
                    reason_ar: subscriber.reason,
                    reason_nl: '',
                    circles: [],
                })
            } else if (lang === 'nl') {
                setLanguage({
                    isEnglish: false,
                    isArabic: false,
                    isNetherlands: true,
                })
                const index = netherlandsPart.indexOf(subscriber.part)

                setQuestion({
                    question: '',
                    options: ['', '', ''],
                    answer: '',
                    part: englishPart[index],
                    question_ar: '',
                    options_ar: ['', '', ''],
                    answer_ar: '',
                    part_ar: arabicPart[index],
                    question_nl: subscriber.question,
                    options_nl: JSON.parse(subscriber.options),
                    answer_nl: JSON.parse(subscriber.answer),
                    part_nl: netherlandsPart[index],
                    draggable: subscriber.draggable,
                    reason: '',
                    reason_ar: '',
                    reason_nl: subscriber.reason,
                })
            }
        }
    }, [])

    const [circles, setCircles] = useState([])

    const getClickCoords = (event) => {
        var e = event.target
        var dim = e.getBoundingClientRect()
        var x = event.clientX - dim.left
        var y = event.clientY - dim.top
        return [x, y]
    }

    const addCircle = (event) => {
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
        setQuestion({
            ...question,
            circles: [
                ...question.circles,
                {
                    x: x,
                    y: y,
                    id: circles.length + 1,
                },
            ],
        })
    }

    return (
        <>
            <CustomModal open={open} setOpen={setOpen}>
                <FormControl encType="multipart/form-data">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6">
                                Update Question
                            </Typography>
                        </Grid>
                        {question.draggable && (
                            <>
                                <Grid item xs={12}>
                                    <svg
                                        onClick={addCircle}
                                        style={{
                                            width: '750px',
                                            height: '550px',
                                            backgroundImage:
                                                question.image !== null &&
                                                question.image !== undefined
                                                    ? `url(${URL.createObjectURL(
                                                          question.image
                                                      )})`
                                                    : `url(https://admin-alshahbarijschool.nl/${subscriber.questionImage})`,
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
                                        setQuestion({
                                            ...question,
                                            circle: [],
                                        })
                                    }}
                                    variant="outlined"
                                >
                                    Reset
                                </Button>
                            </>
                        )}
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
                                    disabled={lang === 'en' ? false : true}
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
                                    disabled={lang === 'ar' ? false : true}
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
                                    disabled={lang === 'nl' ? false : true}
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
                                    Draggale
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="draggable"
                                    value={question.draggable}
                                    onChange={(e) => {
                                        setQuestion({
                                            ...question,
                                            draggable: e.target.value,
                                        })
                                    }}
                                    required
                                >
                                    <MenuItem value={true}>Yes</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </Select>
                            </FormControl>
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

                        {!question.draggable && (
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
                        )}
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
                        <Box component="div" className={classes.modalContent}>
                            <Button
                                onClick={() => {
                                    if (question.draggable) {
                                        if (lang === 'en') {
                                            const data = new FormData()
                                            data.append(
                                                'question',
                                                question.question
                                            )
                                            data.append(
                                                'options',
                                                JSON.stringify(question.options)
                                            )
                                            data.append(
                                                'answer',
                                                JSON.parse(question.circles)
                                            )
                                            data.append('part', question.part)
                                            data.append(
                                                'reason',
                                                question.reason
                                            )
                                            data.append(
                                                'draggable',
                                                question.draggable
                                            )
                                            data.append(
                                                'questionImage',
                                                question.image
                                            )
                                            updateData(
                                                data,
                                                subscriber.id,
                                                setOpen
                                            )
                                        } else if (lang === 'ar') {
                                            const data = new FormData()
                                            data.append(
                                                'question_ar',
                                                question.question_ar
                                            )
                                            data.append(
                                                'options_ar',
                                                JSON.stringify(
                                                    question.options_ar
                                                )
                                            )
                                            data.append(
                                                'answer_ar',
                                                JSON.parse(question.circles)
                                            )
                                            data.append(
                                                'part_ar',
                                                question.part_ar
                                            )
                                            data.append(
                                                'reason_ar',
                                                question.reason_ar
                                            )
                                            data.append(
                                                'draggable',
                                                question.draggable
                                            )
                                            data.append(
                                                'questionImage',
                                                question.image
                                            )

                                            updateData(
                                                data,
                                                subscriber.enId,
                                                setOpen
                                            )
                                        } else if (lang === 'nl') {
                                            const data = new FormData()

                                            data.append(
                                                'question_nl',
                                                question.question_nl
                                            )
                                            data.append(
                                                'options_nl',
                                                JSON.stringify(
                                                    question.options_nl
                                                )
                                            )
                                            data.append(
                                                'answer_nl',
                                                JSON.parse(question.circles)
                                            )
                                            data.append(
                                                'part_nl',
                                                question.part_nl
                                            )
                                            data.append(
                                                'reason_nl',
                                                question.reason_nl
                                            )
                                            data.append(
                                                'draggable',
                                                question.draggable
                                            )
                                            data.append(
                                                'questionImage',
                                                question.image
                                            )

                                            updateData(
                                                data,
                                                subscriber.enId,
                                                setOpen
                                            )
                                        }
                                    } else {
                                        if (lang === 'en') {
                                            const data = new FormData()
                                            data.append(
                                                'question',
                                                question.question
                                            )
                                            data.append(
                                                'options',
                                                JSON.stringify(question.options)
                                            )
                                            data.append(
                                                'answer',
                                                question.answer
                                            )
                                            data.append('part', question.part)
                                            data.append(
                                                'reason',
                                                question.reason
                                            )
                                            data.append(
                                                'draggable',
                                                question.draggable
                                            )
                                            data.append(
                                                'questionImage',
                                                question.image
                                            )
                                            updateData(
                                                data,
                                                subscriber.id,
                                                setOpen
                                            )
                                        } else if (lang === 'ar') {
                                            const data = new FormData()
                                            data.append(
                                                'question_ar',
                                                question.question_ar
                                            )
                                            data.append(
                                                'options_ar',
                                                JSON.stringify(
                                                    question.options_ar
                                                )
                                            )
                                            data.append(
                                                'answer_ar',
                                                question.answer_ar
                                            )
                                            data.append(
                                                'part_ar',
                                                question.part_ar
                                            )
                                            data.append(
                                                'reason_ar',
                                                question.reason_ar
                                            )
                                            data.append(
                                                'draggable',
                                                question.draggable
                                            )
                                            data.append(
                                                'questionImage',
                                                question.image
                                            )

                                            updateData(
                                                data,
                                                subscriber.enId,
                                                setOpen
                                            )
                                        } else if (lang === 'nl') {
                                            const data = new FormData()

                                            data.append(
                                                'question_nl',
                                                question.question_nl
                                            )
                                            data.append(
                                                'options_nl',
                                                JSON.stringify(
                                                    question.options_nl
                                                )
                                            )
                                            data.append(
                                                'answer_nl',
                                                question.answer_nl
                                            )
                                            data.append(
                                                'part_nl',
                                                question.part_nl
                                            )
                                            data.append(
                                                'reason_nl',
                                                question.reason_nl
                                            )
                                            data.append(
                                                'draggable',
                                                question.draggable
                                            )
                                            data.append(
                                                'questionImage',
                                                question.image
                                            )

                                            updateData(
                                                data,
                                                subscriber.enId,
                                                setOpen
                                            )
                                        }
                                    }
                                }}
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
                                Update
                            </Button>
                        </Box>
                    </Grid>
                </FormControl>
            </CustomModal>

            <TableCell key={subscriber.part} className="px-0 " align="left">
                {subscriber.part}
            </TableCell>
            <TableCell className="px-0 " align="left">
                <a
                    href={
                        'https://admin-alshahbarijschool.nl/' +
                        subscriber.questionImage
                    }
                    download
                    target="_blank"
                >
                    <img
                        style={{
                            width: '70px',
                            height: 'auto',
                            aspectRatio: 1,
                        }}
                        src={
                            'https://admin-alshahbarijschool.nl/' +
                            subscriber.questionImage
                        }
                        alt="question"
                    />
                </a>
            </TableCell>
            <TableCell key={subscriber.id} className="px-0 " align="left">
                {value.question}
            </TableCell>
            <TableCell key={subscriber.id} className="px-0 " align="left">
                {value.options[0]}
            </TableCell>
            <TableCell key={subscriber.id} className="px-0 " align="left">
                {value.options[1]}
            </TableCell>
            <TableCell key={subscriber.id} className="px-0 " align="left">
                {value.options[2]}
            </TableCell>
            <TableCell key={subscriber.id} className="px-0 " align="left">
                {value.answer}
            </TableCell>
            <TableCell key={subscriber.id} className="px-0 " align="left">
                {value.reason}
            </TableCell>
            <TableCell className="px-0">
                <IconButton
                    onClick={() => {
                        if (lang === 'en') {
                            removeUser(subscriber.id)
                        } else {
                            removeUser(subscriber.enId)
                        }
                    }}
                >
                    <Icon>delete</Icon>
                </IconButton>
                <IconButton
                    onClick={() => {
                        setOpen(true)
                    }}
                >
                    <Icon>edit</Icon>
                </IconButton>
            </TableCell>
        </>
    )
}

//

export default CustomTableCell
