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
        image: null,
    })

    const englishPart = ['part 1', 'part 2', 'part 3']
    const arabicPart = ['الجزء 1', 'الجزء 2', 'الجزء 3']
    const netherlandsPart = ['Deel 1', 'Deel 2', 'Deel 3']

    useEffect(() => {
        if (lang === 'en') {
            setLanguage({
                isEnglish: true,
                isArabic: false,
                isNetherlands: false,
            })
            var index = englishPart.indexOf(subscriber.part)
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
                image:
                    'https://examin-education.herokuapp.com/' +
                    subscriber.questionImage,
            })
        } else if (lang === 'ar') {
            setLanguage({
                isEnglish: false,
                isArabic: true,
                isNetherlands: false,
            })
            var index = arabicPart.indexOf(subscriber.part)

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
                image:
                    'https://examin-education.herokuapp.com/' +
                    subscriber.questionImage,
            })
        } else if (lang === 'nl') {
            setLanguage({
                isEnglish: false,
                isArabic: false,
                isNetherlands: true,
            })
            var index = netherlandsPart.indexOf(subscriber.part)

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
                image:
                    'https://examin-education.herokuapp.com/' +
                    subscriber.questionImage,
            })
        }
    }, [])

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
                        {/* <Grid item xs={12}>
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
                        </Grid> */}
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
                                onClick={() => {
                                    // const data = new FormData()
                                    // data.append('question', question.question)
                                    // data.append(
                                    //     'options',
                                    //     JSON.stringify(question.options)
                                    // )
                                    // data.append('answer', question.answer)
                                    // data.append('part', question.part)
                                    // data.append(
                                    //     'question_ar',
                                    //     question.question_ar
                                    // )
                                    // data.append(
                                    //     'options_ar',
                                    //     JSON.stringify(question.options_ar)
                                    // )
                                    // data.append('answer_ar', question.answer_ar)
                                    // data.append('part_ar', question.part_ar)
                                    // data.append(
                                    //     'question_nl',
                                    //     question.question_nl
                                    // )
                                    // data.append(
                                    //     'options_nl',
                                    //     JSON.stringify(question.options_nl)
                                    // )
                                    // data.append('answer_nl', question.answer_nl)
                                    // data.append('part_nl', question.part_nl)
                                    // data.append('questionImage', question.image)

                                    const data = {
                                        question: question.question,
                                        options: JSON.stringify(
                                            question.options
                                        ),
                                        answer: question.answer,
                                        part: question.part,
                                        question_ar: question.question_ar,
                                        options_ar: JSON.stringify(
                                            question.options_ar
                                        ),
                                        answer_ar: question.answer_ar,
                                        part_ar: question.part_ar,
                                        question_nl: question.question_nl,
                                        options_nl: JSON.stringify(
                                            question.options_nl
                                        ),
                                        answer_nl: question.answer_nl,
                                        part_nl: question.part_nl,
                                    }

                                    if (lang === 'en') {
                                        updateData(data, subscriber.id, setOpen)
                                    } else if (lang === 'ar') {
                                        updateData(
                                            data,
                                            subscriber.enId,
                                            setOpen
                                        )
                                    } else if (lang === 'nl') {
                                        updateData(
                                            data,
                                            subscriber.enId,
                                            setOpen
                                        )
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
                                disabled={language.isNetherlands ? false : true}
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
                <img
                    style={{ width: '70px', height: 'auto', aspectRatio: 1 }}
                    src={
                        'https://examin-education.herokuapp.com/' +
                        subscriber.questionImage
                    }
                    alt="question"
                />
            </TableCell>
            <TableCell
                key={subscriber.id}
                colSpan={2}
                className="px-0 "
                align="left"
            >
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
            <TableCell className="px-0">
                <IconButton onClick={() => removeUser(subscriber.id)}>
                    <Icon>delete</Icon>
                </IconButton>
                <IconButton onClick={() => setOpen(true)}>
                    <Icon>edit</Icon>
                </IconButton>
            </TableCell>
        </>
    )
}

//

export default CustomTableCell
