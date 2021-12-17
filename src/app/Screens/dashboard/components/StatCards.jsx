import React, { useEffect, useState } from 'react'
import {
    Grid,
    Card,
    Icon,
    IconButton,
    Tooltip,
    Typography,
    Box,
    Button,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getWebProfile, updateDetail } from 'app/redux/actions/UserActions'
import CustomModal from 'app/components/Custom/Modal'
import { FormControl, TextField } from '@mui/material'

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

const StatCards = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const detail = useSelector((state) => state.user.detail)
    const [open, setOpen] = React.useState(false)

    useEffect(() => {
        dispatch(getWebProfile('en'))
    }, [])

    const [updateDetails, setDetail] = useState({
        profileId: '',
        address: '',
        location: '',
        contact: '',
        address_ar: '',
        location_ar: '',
        contact_ar: '',
        address_nl: '',
        location_nl: '',
        contact_nl: '',
    })

    useEffect(() => {
        if (detail) {
            if (language.isEnglish)
                setDetail({
                    ...updateDetails,
                    profileId: detail.profileId,
                    address: detail.address,
                    location: detail.location,
                    contact: detail.contact,
                })
            else if (language.isArabic)
                setDetail({
                    ...updateDetails,
                    address_ar: detail.address,
                    location_ar: detail.location,
                    contact_ar: detail.contact,
                })
            else if (language.isNetherlands)
                setDetail({
                    ...updateDetails,
                    address_nl: detail.address,
                    location_nl: detail.location,
                    contact_nl: detail.contact,
                })
        }
    }, [detail])

    const [language, setLanguage] = useState({
        isEnglish: true,
        isArabic: false,
        isNetherlands: false,
    })

    return (
        <Grid container spacing={3} className="mb-3">
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
                                        if (updateDetails.address_ar === '') {
                                            dispatch(getWebProfile('ar'))
                                        }

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
                                        if (updateDetails.address_nl === '') {
                                            dispatch(getWebProfile('nl'))
                                        }
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

                        <Box component="div" className={classes.modalContent}>
                            <Button
                                onClick={() => {
                                    dispatch(
                                        updateDetail(
                                            updateDetails.profileId,
                                            updateDetails,
                                            'en',
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
            <Grid item xs={12} md={6}>
                <Card
                    className="flex flex-wrap justify-between items-center p-sm-24 bg-paper"
                    elevation={6}
                >
                    <div className="flex items-center">
                        <Icon className={classes.icon}>group</Icon>
                        <div className="ml-3">
                            <small className="text-muted">Users</small>
                        </div>
                    </div>
                    <Link to="/dashboard/users">
                        <Tooltip title="View Details" placement="top">
                            <IconButton>
                                <Icon>arrow_right_alt</Icon>
                            </IconButton>
                        </Tooltip>
                    </Link>
                </Card>
            </Grid>
            <Grid item xs={12} md={6}>
                <Card
                    className="flex flex-wrap justify-between align-center p-sm-24 bg-paper"
                    elevation={6}
                >
                    <div className="flex items-center">
                        <Icon className={classes.icon}>feed</Icon>
                        <div className="ml-3">
                            <small className="text-muted line-height-1">
                                Free Exam
                            </small>
                        </div>
                    </div>
                    <Link to="/dashboard/free-exams">
                        <Tooltip title="View Details" placement="top">
                            <IconButton>
                                <Icon>arrow_right_alt</Icon>
                            </IconButton>
                        </Tooltip>
                    </Link>
                </Card>
            </Grid>
            <Grid item xs={12} md={6}>
                <Card
                    className="flex flex-wrap justify-between items-center p-sm-24 bg-paper"
                    elevation={6}
                >
                    <div className="flex items-center">
                        <Icon className={classes.icon}>subscriptions</Icon>
                        <div className="ml-3">
                            <small className="text-muted">
                                Subscription Packages
                            </small>
                        </div>
                    </div>
                    <Link to="/dashboard/subscription">
                        <Tooltip title="View Details" placement="top">
                            <IconButton>
                                <Icon>arrow_right_alt</Icon>
                            </IconButton>
                        </Tooltip>
                    </Link>
                </Card>
            </Grid>
            <Grid item xs={12} md={6}>
                <Card
                    className="flex flex-wrap justify-between items-center p-sm-24 bg-paper"
                    elevation={6}
                >
                    <div className="flex items-center">
                        <Icon className={classes.icon}>receipt</Icon>
                        <div className="ml-3">
                            <small className="text-muted">Results</small>
                        </div>
                    </div>
                    <Tooltip title="View Details" placement="top">
                        <Link to="/dashboard/results">
                            <IconButton>
                                <Icon>arrow_right_alt</Icon>
                            </IconButton>
                        </Link>
                    </Tooltip>
                </Card>
            </Grid>
            <Grid item xs={12} md={6}>
                <Card
                    className="flex flex-wrap justify-between items-center p-sm-24 bg-paper"
                    elevation={6}
                >
                    <div className="flex items-center">
                        <Icon className={classes.icon}>article</Icon>
                        <div className="ml-3">
                            <small className="text-muted">Paid Exams</small>
                        </div>
                    </div>
                    <Tooltip title="View Details" placement="top">
                        <Link to="/dashboard/paid-exams">
                            <IconButton>
                                <Icon>arrow_right_alt</Icon>
                            </IconButton>
                        </Link>
                    </Tooltip>
                </Card>
            </Grid>
            <Grid item xs={12} md={6}>
                <Card
                    className="flex flex-wrap justify-between items-center p-sm-24 bg-paper"
                    elevation={6}
                >
                    <div className="flex items-center">
                        <Icon className={classes.icon}>question_mark</Icon>
                        <div className="ml-3">
                            <small className="text-muted">Paid Questions</small>
                        </div>
                    </div>
                    <Tooltip title="View Details" placement="top">
                        <Link to="/dashboard/paid-questions">
                            <IconButton>
                                <Icon>arrow_right_alt</Icon>
                            </IconButton>
                        </Link>
                    </Tooltip>
                </Card>
            </Grid>
            <Grid item xs={12} md={6}>
                <Card
                    className="flex flex-wrap justify-between items-center p-sm-24 bg-paper"
                    elevation={6}
                >
                    <div className="flex items-center">
                        <Icon className={classes.icon}>payment</Icon>
                        <div className="ml-3">
                            <small className="text-muted">Payment Method</small>
                        </div>
                    </div>
                    <Tooltip title="View Details" placement="top">
                        <Link to="/dashboard/payment-methods">
                            <IconButton>
                                <Icon>arrow_right_alt</Icon>
                            </IconButton>
                        </Link>
                    </Tooltip>
                </Card>
            </Grid>
            <Grid item xs={12} md={6}>
                <Card
                    className="flex flex-wrap justify-between items-center p-sm-24 bg-paper"
                    elevation={6}
                >
                    <div className="flex items-center">
                        <Icon className={classes.icon}>details</Icon>
                        <div className="ml-3">
                            <small className="text-muted">Detail</small>
                        </div>
                    </div>
                    <Tooltip title="View Details" placement="top">
                        {/* <Link to="/dashboard/details"> */}
                        <IconButton
                            onClick={() => {
                                setOpen(true)
                            }}
                        >
                            <Icon>arrow_right_alt</Icon>
                        </IconButton>
                        {/* </Link> */}
                    </Tooltip>
                </Card>
            </Grid>
        </Grid>
    )
}

export default StatCards
