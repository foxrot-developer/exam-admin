import React, { useEffect } from 'react'
import { Box, IconButton, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import SimpleCard from 'app/components/cards/SimpleCard'
import PaginationTable from './components/PaginationTable'
import { ArrowBack } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPayment } from 'app/redux/actions/UserActions'

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
const PaymentMethod = () => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const paymentMethod = useSelector((state) => state.user.paymentMethod)
    console.log(paymentMethod)

    useEffect(() => {
        dispatch(getAllPayment())
    }, [])
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
                <Typography variant="h4">Payment Method</Typography>
            </Box>
            <SimpleCard title="List">
                <PaginationTable data={paymentMethod} />
            </SimpleCard>
        </Box>
    )
}

export default PaymentMethod
