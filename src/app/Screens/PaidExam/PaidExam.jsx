import React, { useEffect, useState } from 'react'
import {
    Box,
    Button,
    Grid,
    IconButton,
    TextField,
    Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import SimpleCard from 'app/components/cards/SimpleCard'
import PaginationTable from './components/PaginationTable'
import { ArrowBack } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import CustomButton from 'app/components/Custom/CustomButton'
import CustomModal from 'app/components/Custom/Modal'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import {
    getPaidExam,
    createPaidExam,
    getPaidQuestion,
    getAllLanguageExams,
} from 'app/redux/actions/ExamAction'
import Toast from 'Toast'
import {
    Checkbox,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material'

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

const PaidExam = () => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const [open, setOpen] = React.useState(false)

    const exams = useSelector((state) => state.exam.exam)
    const allLanguageExam = useSelector((state) => state.exam.allLanguageExam)
    useEffect(() => {
        dispatch(getPaidExam('en'))
        dispatch(getAllLanguageExams())
    }, [])

    const [questionList, setQuestionList] = React.useState({
        part1: [],
        part2: [],
        part3: [],
    })
    useEffect(() => {
        if (exams) {
            setExamPaid(exams.en_paid_exams)
        }
    }, [exams])

    useEffect(() => {
        if (allLanguageExam) {
            setQuestionList({
                part1: allLanguageExam.english.filter(
                    (question) => question.part === 'part 1'
                ),
                part1_ar: allLanguageExam.arabic.filter(
                    (question) => question.part === 'الجزء 1'
                ),
                part1_nl: allLanguageExam.netherlands.filter(
                    (question) => question.part === 'Deel 1'
                ),
                part2: allLanguageExam.english.filter(
                    (question) => question.part === 'part 2'
                ),
                part2_ar: allLanguageExam.arabic.filter(
                    (question) => question.part === 'الجزء 2'
                ),
                part2_nl: allLanguageExam.netherlands.filter(
                    (question) => question.part === 'Deel 2'
                ),
                part3: allLanguageExam.english.filter(
                    (question) => question.part === 'part 3'
                ),
                part3_ar: allLanguageExam.arabic.filter(
                    (question) => question.part === 'الجزء 3'
                ),
                part3_nl: allLanguageExam.netherlands.filter(
                    (question) => question.part === 'Deel 3'
                ),
            })
        }
    }, [allLanguageExam])

    const onExamCreate = () => {
        if (
            exam.part1.length >= 25 &&
            exam.part2.length >= 12 &&
            exam.part3.length >= 28
        ) {
            dispatch(
                createPaidExam(
                    {
                        name: exam.name,
                        description: exam.description,
                        name_ar: exam.name_ar,
                        description_ar: exam.description_ar,
                        name_nl: exam.name_nl,
                        description_nl: exam.description_nl,
                        part1: JSON.stringify(exam.part1),
                        part2: JSON.stringify(exam.part2),
                        part3: JSON.stringify(exam.part3),
                        part1_ar: JSON.stringify(exam.part1_ar),
                        part2_ar: JSON.stringify(exam.part2_ar),
                        part3_ar: JSON.stringify(exam.part3_ar),
                        part1_nl: JSON.stringify(exam.part1_nl),
                        part2_nl: JSON.stringify(exam.part2_nl),
                        part3_nl: JSON.stringify(exam.part3_nl),
                    },
                    setOpen,
                    lang
                )
            )
        } else if (exam.part1.length < 25) {
            Toast.error('Questions in part 1 must be atlest 25 questions')
            setOpen(false)
        } else if (exam.part2.length < 12) {
            Toast.error('Questions in part 2 must be atlest 12 questions')
            setOpen(false)
        } else if (exam.part3.length < 28) {
            Toast.error('Questions in part 3 must be atlest 28 questions')
            setOpen(false)
        }
    }
    const [language, setLanguage] = useState({
        isEnglish: true,
        isArabic: false,
        isNetherlands: false,
    })
    const [part, setPart] = useState({
        part1: true,
        part2: false,
        part3: false,
    })

    const [exam, setExam] = React.useState({
        name: '',
        description: '',
        name_ar: '',
        description_ar: '',
        name_nl: '',
        description_nl: '',
        part1: [],
        part2: [],
        part3: [],
        part1_ar: [],
        part2_ar: [],
        part3_ar: [],
        part1_nl: [],
        part2_nl: [],
        part3_nl: [],
    })

    const [lang, setLang] = useState('en')

    const [examPaid, setExamPaid] = useState([])
    const [openSelectPart, setOpenSelectPart] = useState(false)

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
                <Typography variant="h4">Paid Exams</Typography>
            </Box>
            <CustomModal open={open} setOpen={setOpen}>
                <FormControl encType="multipart/form-data">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6">Create Exam</Typography>
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
                            <TextField
                                margin="dense"
                                fullWidth
                                label="Name"
                                variant="outlined"
                                required
                                value={
                                    language.isEnglish
                                        ? exam.name
                                        : language.isArabic
                                        ? exam.name_ar
                                        : exam.name_nl
                                }
                                onChange={(e) => {
                                    if (language.isEnglish)
                                        setExam({
                                            ...exam,
                                            name: e.target.value,
                                        })
                                    else if (language.isArabic)
                                        setExam({
                                            ...exam,
                                            name_ar: e.target.value,
                                        })
                                    else if (language.isNetherlands)
                                        setExam({
                                            ...exam,
                                            name_nl: e.target.value,
                                        })
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                margin="dense"
                                fullWidth
                                label="Description"
                                variant="outlined"
                                required
                                value={
                                    language.isEnglish
                                        ? exam.description
                                        : language.isArabic
                                        ? exam.description_ar
                                        : exam.description_nl
                                }
                                onChange={(e) => {
                                    if (language.isEnglish)
                                        setExam({
                                            ...exam,
                                            description: e.target.value,
                                        })
                                    else if (language.isArabic)
                                        setExam({
                                            ...exam,
                                            description_ar: e.target.value,
                                        })
                                    else if (language.isNetherlands)
                                        setExam({
                                            ...exam,
                                            description_nl: e.target.value,
                                        })
                                }}
                            />
                        </Grid>

                        <Box component="div" className={classes.modalContent}>
                            <Button
                                onClick={() => {
                                    setOpenSelectPart(true)
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
                                Select Part
                            </Button>
                        </Box>
                    </Grid>
                </FormControl>
            </CustomModal>
            <CustomModal open={openSelectPart} setOpen={setOpenSelectPart}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6">Create Exam</Typography>
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
                                    backgroundColor: part.part1
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
                                    setPart({
                                        part1: true,
                                        part2: false,
                                        part3: false,
                                    })
                                }}
                            >
                                Part 1
                            </Button>
                            <Button
                                dis
                                variant="contained"
                                style={{
                                    width: '30%',
                                    backgroundColor: part.part2
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
                                    setPart({
                                        part1: false,
                                        part2: true,
                                        part3: false,
                                    })
                                }}
                            >
                                Part 2
                            </Button>
                            <Button
                                variant="contained"
                                style={{
                                    width: '30%',
                                    backgroundColor: part.part3
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
                                    setPart({
                                        part1: false,
                                        part2: false,
                                        part3: true,
                                    })
                                }}
                            >
                                Part 3
                            </Button>
                        </Box>
                    </Grid>
                    {part.part1 && (
                        <TableContainer component={Paper}>
                            <Typography variant="h6">
                                {exam.part1.length} /25
                            </Typography>
                            <Table
                                sx={{ minWidth: 650, padding: 20 }}
                                aria-label="simple table"
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell width={100}>
                                            Checked
                                        </TableCell>
                                        <TableCell width={100}>Part</TableCell>
                                        <TableCell width={100}>
                                            Draggable
                                        </TableCell>
                                        <TableCell width={150}>Image</TableCell>
                                        <TableCell width={500}>
                                            Question
                                        </TableCell>
                                        <TableCell width={200}>
                                            Option A{' '}
                                        </TableCell>
                                        <TableCell width={200}>
                                            Option B
                                        </TableCell>
                                        <TableCell width={200}>
                                            Option C
                                        </TableCell>
                                        <TableCell width={200}>
                                            Answer
                                        </TableCell>
                                        <TableCell width={500}>
                                            Reason
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {questionList.part1.map((row, index) => (
                                        <TableRow
                                            key={row.name}
                                            sx={{
                                                '&:last-child td, &:last-child th':
                                                    { border: 0 },
                                            }}
                                        >
                                            <TableCell>
                                                <Checkbox
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setExam({
                                                                ...exam,
                                                                part1: [
                                                                    ...exam.part1,
                                                                    row,
                                                                ],
                                                                part1_ar: [
                                                                    ...exam.part1_ar,
                                                                    questionList
                                                                        .part1_ar[
                                                                        index
                                                                    ],
                                                                ],
                                                                part1_nl: [
                                                                    ...exam.part1_nl,
                                                                    questionList
                                                                        .part1_nl[
                                                                        index
                                                                    ],
                                                                ],
                                                            })
                                                        } else {
                                                            setExam({
                                                                ...exam,
                                                                part1: exam.part1.filter(
                                                                    (item) =>
                                                                        item.id !==
                                                                        row.id
                                                                ),
                                                                part1_ar:
                                                                    exam.part1_ar.filter(
                                                                        (
                                                                            item
                                                                        ) =>
                                                                            item.id !==
                                                                            questionList
                                                                                .part1_ar[
                                                                                index
                                                                            ].id
                                                                    ),
                                                                part1_nl:
                                                                    exam.part1_nl.filter(
                                                                        (
                                                                            item
                                                                        ) =>
                                                                            item.id !==
                                                                            questionList
                                                                                .part1_nl[
                                                                                index
                                                                            ].id
                                                                    ),
                                                            })
                                                        }
                                                        console.log({
                                                            exam,
                                                            index,
                                                            questionList,
                                                        })
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell>{row.part}</TableCell>
                                            <TableCell>
                                                {row.draggable ? 'Yes' : 'No'}
                                            </TableCell>
                                            <TableCell
                                                className="px-0 "
                                                align="left"
                                            >
                                                <img
                                                    style={{
                                                        width: '70px',
                                                        height: 'auto',
                                                        aspectRatio: 1,
                                                    }}
                                                    src={
                                                        'https://admin-alshahbarijschool.nl/' +
                                                        row.questionImage
                                                    }
                                                    alt="question"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                {row.question}
                                                <br />
                                                {
                                                    questionList.part1_ar[index]
                                                        ?.question
                                                }
                                                <br />
                                                {
                                                    questionList.part1_nl[index]
                                                        ?.question
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {JSON.parse(row.options)[0]}
                                                <br />
                                                {
                                                    JSON.parse(
                                                        questionList.part1_ar[
                                                            index
                                                        ].options
                                                    )[0]
                                                }
                                                <br />
                                                {
                                                    JSON.parse(
                                                        questionList.part1_nl[
                                                            index
                                                        ].options
                                                    )[0]
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {JSON.parse(row.options)[1]}
                                                <br />
                                                {
                                                    JSON.parse(
                                                        questionList.part1_ar[
                                                            index
                                                        ].options
                                                    )[1]
                                                }
                                                <br />
                                                {
                                                    JSON.parse(
                                                        questionList.part1_nl[
                                                            index
                                                        ].options
                                                    )[1]
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {JSON.parse(row.options)[2]}
                                                <br />
                                                {
                                                    JSON.parse(
                                                        questionList.part1_ar[
                                                            index
                                                        ].options
                                                    )[2]
                                                }
                                                <br />
                                                {
                                                    JSON.parse(
                                                        questionList.part1_nl[
                                                            index
                                                        ].options
                                                    )[2]
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {row.answer}
                                                <br />
                                                {
                                                    questionList.part1_ar[index]
                                                        ?.answer
                                                }
                                                <br />
                                                {
                                                    questionList.part1_nl[index]
                                                        ?.answer
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {row.reason}
                                                <br />
                                                {
                                                    questionList.part1_ar[index]
                                                        ?.reason
                                                }
                                                <br />
                                                {
                                                    questionList.part1_nl[index]
                                                        ?.reason
                                                }
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                    {part.part2 && (
                        <TableContainer component={Paper}>
                            <Typography variant="h6">
                                {exam.part2.length} /12
                            </Typography>
                            <Table
                                sx={{ minWidth: 650, padding: 20 }}
                                aria-label="simple table"
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell width={100}>
                                            Checked
                                        </TableCell>
                                        <TableCell width={100}>Part</TableCell>
                                        <TableCell width={100}>
                                            Draggable
                                        </TableCell>
                                        <TableCell width={150}>Image</TableCell>
                                        <TableCell width={500}>
                                            Question
                                        </TableCell>
                                        <TableCell width={200}>
                                            Option A{' '}
                                        </TableCell>
                                        <TableCell width={200}>
                                            Option B
                                        </TableCell>
                                        <TableCell width={200}>
                                            Option C
                                        </TableCell>
                                        <TableCell width={200}>
                                            Answer
                                        </TableCell>
                                        <TableCell width={500}>
                                            Reason
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {questionList.part2.map((row, index) => (
                                        <TableRow
                                            key={row.name}
                                            sx={{
                                                '&:last-child td, &:last-child th':
                                                    { border: 0 },
                                            }}
                                        >
                                            <TableCell>
                                                <Checkbox
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setExam({
                                                                ...exam,
                                                                part2: [
                                                                    ...exam.part2,
                                                                    row,
                                                                ],
                                                                part2_ar: [
                                                                    ...exam.part2_ar,
                                                                    questionList
                                                                        .part2_ar[
                                                                        index
                                                                    ],
                                                                ],
                                                                part2_nl: [
                                                                    ...exam.part2_nl,
                                                                    questionList
                                                                        .part2_nl[
                                                                        index
                                                                    ],
                                                                ],
                                                            })
                                                        } else {
                                                            setExam({
                                                                ...exam,
                                                                part2: exam.part2.filter(
                                                                    (item) =>
                                                                        item.id !==
                                                                        row.id
                                                                ),
                                                                part2_ar:
                                                                    exam.part2_ar.filter(
                                                                        (
                                                                            item
                                                                        ) =>
                                                                            item.id !==
                                                                            questionList
                                                                                .part2_ar[
                                                                                index
                                                                            ].id
                                                                    ),
                                                                part2_nl:
                                                                    exam.part2_nl.filter(
                                                                        (
                                                                            item
                                                                        ) =>
                                                                            item.id !==
                                                                            questionList
                                                                                .part2_nl[
                                                                                index
                                                                            ].id
                                                                    ),
                                                            })
                                                        }
                                                        console.log({
                                                            exam,
                                                            index,
                                                            questionList,
                                                        })
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell>{row.part}</TableCell>
                                            <TableCell>
                                                {row.draggable ? 'Yes' : 'No'}
                                            </TableCell>
                                            <TableCell
                                                className="px-0 "
                                                align="left"
                                            >
                                                <img
                                                    style={{
                                                        width: '70px',
                                                        height: 'auto',
                                                        aspectRatio: 1,
                                                    }}
                                                    src={
                                                        'https://admin-alshahbarijschool.nl/' +
                                                        row.questionImage
                                                    }
                                                    alt="question"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                {row.question}
                                                <br />
                                                {
                                                    questionList.part2_ar[index]
                                                        ?.question
                                                }
                                                <br />
                                                {
                                                    questionList.part2_nl[index]
                                                        ?.question
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {JSON.parse(row.options)[0]}
                                                <br />
                                                {
                                                    JSON.parse(
                                                        questionList.part2_ar[
                                                            index
                                                        ].options
                                                    )[0]
                                                }
                                                <br />
                                                {
                                                    JSON.parse(
                                                        questionList.part2_nl[
                                                            index
                                                        ].options
                                                    )[0]
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {JSON.parse(row.options)[1]}
                                                <br />
                                                {
                                                    JSON.parse(
                                                        questionList.part2_ar[
                                                            index
                                                        ].options
                                                    )[1]
                                                }
                                                <br />
                                                {
                                                    JSON.parse(
                                                        questionList.part2_nl[
                                                            index
                                                        ].options
                                                    )[1]
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {JSON.parse(row.options)[2]}
                                                <br />
                                                {
                                                    JSON.parse(
                                                        questionList.part2_ar[
                                                            index
                                                        ].options
                                                    )[2]
                                                }
                                                <br />
                                                {
                                                    JSON.parse(
                                                        questionList.part2_nl[
                                                            index
                                                        ].options
                                                    )[2]
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {row.answer}
                                                <br />
                                                {
                                                    questionList.part2_ar[index]
                                                        ?.answer
                                                }
                                                <br />
                                                {
                                                    questionList.part2_nl[index]
                                                        ?.answer
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {row.reason}
                                                <br />
                                                {
                                                    questionList.part2_ar[index]
                                                        ?.reason
                                                }
                                                <br />
                                                {
                                                    questionList.part2_nl[index]
                                                        ?.reason
                                                }
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                    {part.part3 && (
                        <TableContainer component={Paper}>
                            <Typography variant="h6">
                                {exam.part3.length} /28
                            </Typography>
                            <Table
                                sx={{ minWidth: 650, padding: 20 }}
                                aria-label="simple table"
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell width={100}>
                                            Checked
                                        </TableCell>
                                        <TableCell width={100}>Part</TableCell>
                                        <TableCell width={100}>
                                            Draggable
                                        </TableCell>
                                        <TableCell width={150}>Image</TableCell>
                                        <TableCell width={500}>
                                            Question
                                        </TableCell>
                                        <TableCell width={200}>
                                            Option A{' '}
                                        </TableCell>
                                        <TableCell width={200}>
                                            Option B
                                        </TableCell>
                                        <TableCell width={200}>
                                            Option C
                                        </TableCell>
                                        <TableCell width={200}>
                                            Answer
                                        </TableCell>
                                        <TableCell width={500}>
                                            Reason
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {questionList.part3.map((row, index) => (
                                        <TableRow
                                            key={row.name}
                                            sx={{
                                                '&:last-child td, &:last-child th':
                                                    { border: 0 },
                                            }}
                                        >
                                            <TableCell>
                                                <Checkbox
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setExam({
                                                                ...exam,
                                                                part3: [
                                                                    ...exam.part3,
                                                                    row,
                                                                ],
                                                                part3_ar: [
                                                                    ...exam.part3_ar,
                                                                    questionList
                                                                        .part3_ar[
                                                                        index
                                                                    ],
                                                                ],
                                                                part3_nl: [
                                                                    ...exam.part3_nl,
                                                                    questionList
                                                                        .part3_nl[
                                                                        index
                                                                    ],
                                                                ],
                                                            })
                                                        } else {
                                                            setExam({
                                                                ...exam,
                                                                part3: exam.part3.filter(
                                                                    (item) =>
                                                                        item.id !==
                                                                        row.id
                                                                ),
                                                                part3_ar:
                                                                    exam.part3_ar.filter(
                                                                        (
                                                                            item
                                                                        ) =>
                                                                            item.id !==
                                                                            questionList
                                                                                .part3_ar[
                                                                                index
                                                                            ].id
                                                                    ),
                                                                part3_nl:
                                                                    exam.part3_nl.filter(
                                                                        (
                                                                            item
                                                                        ) =>
                                                                            item.id !==
                                                                            questionList
                                                                                .part3_nl[
                                                                                index
                                                                            ].id
                                                                    ),
                                                            })
                                                        }
                                                        console.log({
                                                            exam,
                                                            index,
                                                            questionList,
                                                        })
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell>{row.part}</TableCell>
                                            <TableCell>
                                                {row.draggable ? 'Yes' : 'No'}
                                            </TableCell>
                                            <TableCell
                                                className="px-0 "
                                                align="left"
                                            >
                                                <img
                                                    style={{
                                                        width: '70px',
                                                        height: 'auto',
                                                        aspectRatio: 1,
                                                    }}
                                                    src={
                                                        'https://admin-alshahbarijschool.nl/' +
                                                        row.questionImage
                                                    }
                                                    alt="question"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                {row.question}
                                                <br />
                                                {
                                                    questionList.part3_ar[index]
                                                        ?.question
                                                }
                                                <br />
                                                {
                                                    questionList.part3_nl[index]
                                                        ?.question
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {JSON.parse(row.options)[0]}
                                                <br />
                                                {
                                                    JSON.parse(
                                                        questionList.part3_ar[
                                                            index
                                                        ].options
                                                    )[0]
                                                }
                                                <br />
                                                {
                                                    JSON.parse(
                                                        questionList.part3_nl[
                                                            index
                                                        ].options
                                                    )[0]
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {JSON.parse(row.options)[1]}
                                                <br />
                                                {
                                                    JSON.parse(
                                                        questionList.part3_ar[
                                                            index
                                                        ].options
                                                    )[1]
                                                }
                                                <br />
                                                {
                                                    JSON.parse(
                                                        questionList.part3_nl[
                                                            index
                                                        ].options
                                                    )[1]
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {JSON.parse(row.options)[2]}
                                                <br />
                                                {
                                                    JSON.parse(
                                                        questionList.part3_ar[
                                                            index
                                                        ].options
                                                    )[2]
                                                }
                                                <br />
                                                {
                                                    JSON.parse(
                                                        questionList.part3_nl[
                                                            index
                                                        ].options
                                                    )[2]
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {row.answer}
                                                <br />
                                                {
                                                    questionList.part3_ar[index]
                                                        ?.answer
                                                }
                                                <br />
                                                {
                                                    questionList.part3_nl[index]
                                                        ?.answer
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {row.reason}
                                                <br />
                                                {
                                                    questionList.part3_ar[index]
                                                        ?.reason
                                                }
                                                <br />
                                                {
                                                    questionList.part3_nl[index]
                                                        ?.reason
                                                }
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                    <Box component="div" className={classes.modalContent}>
                        <Button
                            onClick={onExamCreate}
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
            </CustomModal>
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
                            if (e.target.value === 'en') {
                                setExamPaid(exams.en_paid_exams)
                            }
                            if (e.target.value === 'ar') {
                                setExamPaid(exams.ar_paid_exams)
                            }
                            if (e.target.value === 'nl') {
                                setExamPaid(exams.nl_paid_exams)
                            }
                        }}
                        required
                    >
                        <MenuItem value={'en'}>English</MenuItem>
                        <MenuItem value={'ar'}>Arabic</MenuItem>
                        <MenuItem value={'nl'}>Netherland</MenuItem>
                    </Select>
                </FormControl>
                <CustomButton
                    eventHandler={() => {
                        setOpen(true)
                    }}
                    title="Create Exam"
                />
            </Box>
            <SimpleCard title="List">
                <PaginationTable data={examPaid} lang={lang} />
            </SimpleCard>
        </Box>
    )
}

export default PaidExam
