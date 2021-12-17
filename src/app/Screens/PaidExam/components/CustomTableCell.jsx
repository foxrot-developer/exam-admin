import React, { useEffect, useState } from 'react'

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
import { ArrowForward } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import CustomModal from 'app/components/Custom/Modal'
import FormControl from '@mui/material/FormControl'

const useStyles = makeStyles(({ palette, ...theme }) => ({
    input: {
        width: '90%',
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
const CustomTableCell = ({ subscriber, removeUser, updateData, lang }) => {
    const classes = useStyles()
    const value = {
        description: subscriber.description,
        name: subscriber.name,
    }
    const [open, setOpen] = React.useState(false)

    const [language, setLanguage] = useState({
        isEnglish: true,
        isArabic: false,
        isNetherlands: false,
    })

    const [exam, setExam] = useState({
        name: '',
        description: '',
        name_ar: '',
        description_ar: '',
        name_nl: '',
        description_nl: '',
    })
    useEffect(() => {
        if (lang === 'en') {
            setLanguage({
                isEnglish: true,
                isArabic: false,
                isNetherlands: false,
            })
            setExam({
                name: subscriber.name,
                description: subscriber.description,
                name_ar: '',
                description_ar: '',
                name_nl: '',
                description_nl: '',
            })
        }
        if (lang === 'ar') {
            setLanguage({
                isEnglish: false,
                isArabic: true,
                isNetherlands: false,
            })
            setExam({
                name: '',
                description: '',
                name_ar: subscriber.name,
                description_ar: subscriber.description,
                name_nl: '',
                description_nl: '',
            })
        }
        if (lang === 'nl') {
            setLanguage({
                isEnglish: false,
                isArabic: false,
                isNetherlands: true,
            })
            setExam({
                name: '',
                description: '',
                name_ar: '',
                description_ar: '',
                name_nl: subscriber.name,
                description_nl: subscriber.description,
            })
        }
    }, [])

    return (
        <>
            <CustomModal open={open} setOpen={setOpen}>
                <FormControl encType="multipart/form-data">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6">Update Exam</Typography>
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
                                    if (lang === 'en') {
                                        updateData(subscriber.id, exam, setOpen)
                                    } else if (lang === 'ar') {
                                        updateData(
                                            subscriber.enId,
                                            exam,
                                            setOpen
                                        )
                                    } else if (lang === 'nl') {
                                        updateData(
                                            subscriber.enId,
                                            exam,
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
            <TableCell colSpan={2} className="px-0 " align="left">
                {value.name}
            </TableCell>
            <TableCell colSpan={2} className="px-0 " align="left">
                {value.description}
            </TableCell>
            <TableCell align="center" className="px-0">
                <IconButton onClick={() => setOpen(true)}>
                    <Icon>edit</Icon>
                </IconButton>
                <IconButton
                    onClick={() => {
                        if (lang === 'en') {
                            removeUser(subscriber.id)
                        } else if (lang === 'ar') {
                            removeUser(subscriber.enId)
                        } else if (lang === 'nl') {
                            removeUser(subscriber.enId)
                        }
                    }}
                >
                    <Icon>delete</Icon>
                </IconButton>
                <Link
                    to={`/dashboard/paid-exams/questions/${subscriber.id}/${lang}`}
                >
                    <IconButton>
                        <ArrowForward />
                    </IconButton>
                </Link>
            </TableCell>
        </>
    )
}

export default CustomTableCell
