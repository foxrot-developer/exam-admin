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

    return (
        <Grid container spacing={3} className="mb-3">
            <Grid item xs={12} md={4}>
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
            <Grid item xs={12} md={4}>
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

            <Grid item xs={12} md={4}>
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
            <Grid item xs={12} md={12}>
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

            <Grid item xs={12} md={4}>
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
            <Grid item xs={12} md={4}>
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
            <Grid item xs={12} md={4}>
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

            {/* <Grid item xs={12} md={6}>
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
                        <IconButton
                            onClick={() => {
                                setOpen(true)
                            }}
                        >
                            <Icon>arrow_right_alt</Icon>
                        </IconButton>
                    </Tooltip>
                </Card>
            </Grid> */}
        </Grid>
    )
}

export default StatCards
