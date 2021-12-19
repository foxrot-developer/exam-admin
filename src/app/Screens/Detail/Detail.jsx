import React, { useEffect } from 'react'
import { Box, Grid, IconButton, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import SimpleCard from 'app/components/cards/SimpleCard'
import PaginationTable from './components/PaginationTable'
import { ArrowBack } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import {
    createUser,
    getUserList,
    getWebProfile,
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

const Detail = () => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const detail = useSelector((state) => state.user.detail)
    const [open, setOpen] = React.useState(false)
    useEffect(() => {
        dispatch(getWebProfile('en'))
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
                <Typography variant="h4">Detail</Typography>
            </Box>

            <CustomButton
                eventHandler={() => {
                    setOpen(true)
                }}
                title="Create User"
            />
            <SimpleCard title="List">
                <PaginationTable data={detail} />
            </SimpleCard>
        </Box>
    )
}

export default Detail
