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
} from 'app/redux/actions/ExamAction'
import Toast from 'Toast'

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
    const questions = useSelector((state) => state.exam.questions)
    console.log(exams)
    useEffect(() => {
        dispatch(getPaidExam('en'))
        dispatch(getPaidQuestion('en'))
    }, [])

    const [questionList, setQuestionList] = React.useState({
        part1: [],
        part2: [],
        part3: [],
    })

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

    const onExamCreate = () => {
        console.log(lang)
        if (
            questionList.part1.lenght > 25 &&
            questionList.part2.lenght > 12 &&
            questionList.part3.lenght > 28
        ) {
            dispatch(createPaidExam(exam, setOpen, lang))
        } else if (questionList.part1.length > 25) {
            Toast.error('Questions in part 1 must be less than 25')
        } else if (questionList.part2.length > 12) {
            Toast.error('Questions in part 2 must be less than 12')
        } else if (questionList.part3.length > 28) {
            Toast.error('Questions in part 3 must be less than 28')
        }
    }
    const [language, setLanguage] = useState({
        isEnglish: true,
        isArabic: false,
        isNetherlands: false,
    })

    const [exam, setExam] = React.useState({
        name: '',
        description: '',
        name_ar: '',
        description_ar: '',
        name_nl: '',
        description_nl: '',
    })

    const [lang, setLang] = useState('en')

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
                </FormControl>
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
                            dispatch(getPaidExam(e.target.value))
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
                <PaginationTable data={exams} lang={lang} />
            </SimpleCard>
        </Box>
    )
}

export default PaidExam
