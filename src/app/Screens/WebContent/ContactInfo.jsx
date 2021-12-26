import React, { useEffect, useState } from 'react'
import {
    Box,
    Grid,
    IconButton,
    TextField,
    Typography,
    Button,
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
    getUserList,
    updateDetail,
} from 'app/redux/actions/UserActions'
import CustomButton from 'app/components/Custom/CustomButton'
import CustomModal from 'app/components/Custom/Modal'
import { getPackageList } from 'app/redux/actions/PackageActions'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import PaginationTableContactInfo from './components/PaginationTableContactInfo'

const useStyles = makeStyles(({ palette, ...theme }) => ({
    icon: {
        fontSize: '44px',
        opacity: 0.6,
        color: palette.primary.main,
    },
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

const ContactInfo = () => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const english = useSelector((state) => state.user.detail_en)
    const arabic = useSelector((state) => state.user.detail_ar)
    const netherland = useSelector((state) => state.user.detail_nl)

    console.log({
        english,
        arabic,
        netherland,
    })
    const [open, setOpen] = React.useState(false)
    const [updateDetails, setDetail] = useState({
        profileId: '',
        address: '',
        location: '',
        contact: '',
        email: '',
        hours: '',
        hoursSaturday: '',
        address_ar: '',
        location_ar: '',
        contact_ar: '',
        email_ar: '',
        hours_ar: '',
        hoursSaturday_ar: '',
        address_nl: '',
        location_nl: '',
        contact_nl: '',
        email_nl: '',
        hours_nl: '',
        hoursSaturday_nl: '',
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
                <Typography variant="h4">Web Contact Info</Typography>
            </Box>

            <CustomModal open={open} setOpen={setOpen}>
                <FormControl encType="multipart/form-data">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6">Detail</Typography>
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
                                        color: language.isEnglish
                                            ? '#FFF'
                                            : '#000',
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
                                        color: language.isArabic
                                            ? '#FFF'
                                            : '#000',
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
                                        color: language.isNetherlands
                                            ? '#FFF'
                                            : '#000',
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
                                label="Address"
                                variant="outlined"
                                required
                                value={
                                    language.isEnglish
                                        ? updateDetails.address
                                        : language.isArabic
                                        ? updateDetails.address_ar
                                        : language.isNetherlands
                                        ? updateDetails.address_nl
                                        : ''
                                }
                                onChange={(e) => {
                                    if (language.isEnglish)
                                        setDetail({
                                            ...updateDetails,
                                            address: e.target.value,
                                        })
                                    else if (language.isArabic)
                                        setDetail({
                                            ...updateDetails,
                                            address_ar: e.target.value,
                                        })
                                    else if (language.isNetherlands)
                                        setDetail({
                                            ...updateDetails,
                                            address_nl: e.target.value,
                                        })
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                margin="dense"
                                fullWidth
                                label="Location"
                                variant="outlined"
                                required
                                value={
                                    language.isEnglish
                                        ? updateDetails.location
                                        : language.isArabic
                                        ? updateDetails.location_ar
                                        : language.isNetherlands
                                        ? updateDetails.location_nl
                                        : ''
                                }
                                onChange={(e) => {
                                    if (language.isEnglish)
                                        setDetail({
                                            ...updateDetails,
                                            location: e.target.value,
                                        })
                                    else if (language.isArabic)
                                        setDetail({
                                            ...updateDetails,
                                            location_ar: e.target.value,
                                        })
                                    else if (language.isNetherlands)
                                        setDetail({
                                            ...updateDetails,
                                            location_nl: e.target.value,
                                        })
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                margin="dense"
                                fullWidth
                                label="Contact"
                                variant="outlined"
                                required
                                value={
                                    language.isEnglish
                                        ? updateDetails.contact
                                        : language.isArabic
                                        ? updateDetails.contact_ar
                                        : language.isNetherlands
                                        ? updateDetails.contact_nl
                                        : ''
                                }
                                onChange={(e) => {
                                    if (language.isEnglish)
                                        setDetail({
                                            ...updateDetails,
                                            contact: e.target.value,
                                        })
                                    else if (language.isArabic)
                                        setDetail({
                                            ...updateDetails,
                                            contact_ar: e.target.value,
                                        })
                                    else if (language.isNetherlands)
                                        setDetail({
                                            ...updateDetails,
                                            contact_nl: e.target.value,
                                        })
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                margin="dense"
                                fullWidth
                                label="Email"
                                variant="outlined"
                                required
                                value={
                                    language.isEnglish
                                        ? updateDetails.email
                                        : language.isArabic
                                        ? updateDetails.email_ar
                                        : language.isNetherlands
                                        ? updateDetails.email_nl
                                        : ''
                                }
                                onChange={(e) => {
                                    if (language.isEnglish)
                                        setDetail({
                                            ...updateDetails,
                                            email: e.target.value,
                                        })
                                    else if (language.isArabic)
                                        setDetail({
                                            ...updateDetails,
                                            email_ar: e.target.value,
                                        })
                                    else if (language.isNetherlands)
                                        setDetail({
                                            ...updateDetails,
                                            email_nl: e.target.value,
                                        })
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                margin="dense"
                                fullWidth
                                label="Hours Monday to Friday"
                                variant="outlined"
                                required
                                value={
                                    language.isEnglish
                                        ? updateDetails.hours
                                        : language.isArabic
                                        ? updateDetails.hours_ar
                                        : language.isNetherlands
                                        ? updateDetails.hours_nl
                                        : ''
                                }
                                onChange={(e) => {
                                    if (language.isEnglish)
                                        setDetail({
                                            ...updateDetails,
                                            hours: e.target.value,
                                        })
                                    else if (language.isArabic)
                                        setDetail({
                                            ...updateDetails,
                                            hours_ar: e.target.value,
                                        })
                                    else if (language.isNetherlands)
                                        setDetail({
                                            ...updateDetails,
                                            hours_nl: e.target.value,
                                        })
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                margin="dense"
                                fullWidth
                                label="Hours Saturday and Sunday"
                                variant="outlined"
                                required
                                value={
                                    language.isEnglish
                                        ? updateDetails.hoursSaturday
                                        : language.isArabic
                                        ? updateDetails.hoursSaturday_ar
                                        : language.isNetherlands
                                        ? updateDetails.hoursSaturday_nl
                                        : ''
                                }
                                onChange={(e) => {
                                    if (language.isEnglish)
                                        setDetail({
                                            ...updateDetails,
                                            hoursSaturday: e.target.value,
                                        })
                                    else if (language.isArabic)
                                        setDetail({
                                            ...updateDetails,
                                            hoursSaturday_ar: e.target.value,
                                        })
                                    else if (language.isNetherlands)
                                        setDetail({
                                            ...updateDetails,
                                            hoursSaturday_nl: e.target.value,
                                        })
                                }}
                            />
                        </Grid>

                        <Box component="div" className={classes.modalContent}>
                            <Button
                                onClick={() => {
                                    dispatch(
                                        updateDetail(
                                            {
                                                address: updateDetails.address,
                                                location:
                                                    updateDetails.location,
                                                contact: updateDetails.contact,
                                                email: '',
                                                hours: JSON.stringify([
                                                    updateDetails.hours,
                                                    updateDetails.hoursSaturday,
                                                ]),
                                                address_ar:
                                                    updateDetails.address_ar,
                                                location_ar:
                                                    updateDetails.location_ar,
                                                contact_ar:
                                                    updateDetails.contact_ar,
                                                email_ar:
                                                    updateDetails.email_ar,
                                                hours_ar: JSON.stringify([
                                                    updateDetails.hours_ar,
                                                    updateDetails.hoursSaturday_ar,
                                                ]),
                                                address_nl:
                                                    updateDetails.address_nl,
                                                location_nl:
                                                    updateDetails.location_nl,
                                                contact_nl:
                                                    updateDetails.contact_nl,
                                                email_nl:
                                                    updateDetails.email_nl,
                                                hours_nl: JSON.stringify([
                                                    updateDetails.hours_nl,
                                                    updateDetails.hoursSaturday_nl,
                                                ]),
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
                                disabled={language.isNetherlands ? false : true}
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
                title="Update Details"
            />
            <SimpleCard title="English">
                <PaginationTableContactInfo
                    data={
                        english !== undefined
                            ? {
                                  address: english.address,
                                  contact: english.contact,
                                  email: english.email,
                                  hours: english.hours,
                                  location: english.location,
                              }
                            : {
                                  address: '',
                                  contact: '',
                                  email: '',
                                  hours: '',
                                  location: '',
                              }
                    }
                />
            </SimpleCard>
            <SimpleCard title="Arabic">
                <PaginationTableContactInfo
                    data={
                        arabic !== undefined
                            ? {
                                  address: arabic.address,
                                  contact: arabic.contact,
                                  email: arabic.email,
                                  hours: arabic.hours,
                                  location: arabic.location,
                              }
                            : {
                                  address: '',
                                  contact: '',
                                  email: '',
                                  hours: '',
                                  location: '',
                              }
                    }
                />
            </SimpleCard>
            <SimpleCard title="Netherland">
                <PaginationTableContactInfo
                    data={
                        netherland !== undefined
                            ? {
                                  address: netherland.address,
                                  contact: netherland.contact,
                                  email: netherland.email,
                                  hours: netherland.hours,
                                  location: netherland.location,
                              }
                            : {
                                  address: '',
                                  contact: '',
                                  email: '',
                                  hours: '',
                                  location: '',
                              }
                    }
                />
            </SimpleCard>
        </Box>
    )
}

export default ContactInfo
