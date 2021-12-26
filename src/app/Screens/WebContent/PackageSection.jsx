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
import {
    createUser,
    getContentAr,
    getContentEn,
    getContentNl,
    updatePackageSection,
} from 'app/redux/actions/UserActions'
import CustomButton from 'app/components/Custom/CustomButton'
import CustomModal from 'app/components/Custom/Modal'
import { getPackageList } from 'app/redux/actions/PackageActions'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

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
}))

const PackageSection = () => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const [open, setOpen] = React.useState(false)
    const english = useSelector((state) => state.user.detail_en)
    const arabic = useSelector((state) => state.user.detail_ar)
    const netherland = useSelector((state) => state.user.detail_nl)
    console.log({
        english,
        arabic,
        netherland,
    })
    useEffect(() => {
        dispatch(getContentEn())
        dispatch(getContentAr())
        dispatch(getContentNl())
    }, [])
    const [language, setLanguage] = useState({
        isEnglish: true,
        isArabic: false,
        isNetherlands: false,
    })

    const [about, setAbout] = useState({
        about: {
            heading: '',
            description: '',
        },
        about_ar: {
            heading: '',
            description: '',
        },
        about_nl: {
            heading: '',
            description: '',
        },
    })
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
                <Typography variant="h4">Package Section</Typography>
            </Box>

            <CustomModal open={open} setOpen={setOpen}>
                <FormControl encType="multipart/form-data">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6">Update</Typography>
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
                                label="Heading"
                                variant="outlined"
                                value={language.isEnglish}
                                required
                                value={
                                    language.isEnglish
                                        ? about.about.heading
                                        : language.isArabic
                                        ? about.about_ar.heading
                                        : language.isNetherlands
                                        ? about.about_nl.heading
                                        : ''
                                }
                                onChange={(e) => {
                                    if (language.isEnglish) {
                                        setAbout({
                                            ...about,
                                            about: {
                                                ...about.about,
                                                heading: e.target.value,
                                            },
                                        })
                                    } else if (language.isArabic) {
                                        setAbout({
                                            ...about,
                                            about_ar: {
                                                ...about.about_ar,
                                                heading: e.target.value,
                                            },
                                        })
                                    } else if (language.isNetherlands) {
                                        setAbout({
                                            ...about,
                                            about_nl: {
                                                ...about.about_nl,
                                                heading: e.target.value,
                                            },
                                        })
                                    }
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
                                        ? about.about.description
                                        : language.isArabic
                                        ? about.about_ar.description
                                        : language.isNetherlands
                                        ? about.about_nl.description
                                        : ''
                                }
                                onChange={(e) => {
                                    if (language.isEnglish) {
                                        setAbout({
                                            ...about,
                                            about: {
                                                ...about.about,
                                                description: e.target.value,
                                            },
                                        })
                                    } else if (language.isArabic) {
                                        setAbout({
                                            ...about,
                                            about_ar: {
                                                ...about.about_ar,
                                                description: e.target.value,
                                            },
                                        })
                                    } else if (language.isNetherlands) {
                                        setAbout({
                                            ...about,
                                            about_nl: {
                                                ...about.about_nl,
                                                description: e.target.value,
                                            },
                                        })
                                    }
                                }}
                            />
                        </Grid>

                        <Box component="div" className={classes.modalContent}>
                            <Button
                                onClick={() => {
                                    dispatch(
                                        updatePackageSection(
                                            {
                                                package: JSON.stringify(
                                                    about.about
                                                ),
                                                package_ar: JSON.stringify(
                                                    about.about_ar
                                                ),
                                                package_nl: JSON.stringify(
                                                    about.about_nl
                                                ),
                                            },
                                            setOpen
                                        )
                                    )
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
            <CustomButton
                eventHandler={() => {
                    setOpen(true)
                }}
                title="Update"
            />
            {english != null && english.sections !== undefined && (
                <SimpleCard title="English">
                    <PaginationTable
                        data={JSON.parse(english.sections.package)}
                    />
                </SimpleCard>
            )}
            {arabic != null && arabic.sections !== undefined && (
                <SimpleCard title="Arabic">
                    <PaginationTable
                        data={JSON.parse(arabic.sections.package)}
                    />
                </SimpleCard>
            )}
            {netherland != null && netherland.sections !== undefined && (
                <SimpleCard title="Netherland">
                    <PaginationTable
                        data={JSON.parse(netherland.sections.package)}
                    />
                </SimpleCard>
            )}
        </Box>
    )
}

export default PackageSection
