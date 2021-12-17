import React, { useEffect } from 'react'
import { Box, Grid, IconButton, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import SimpleCard from 'app/components/cards/SimpleCard'
import PaginationTable from './components/PaginationTable'
import { ArrowBack } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { createUser, getUserList } from 'app/redux/actions/UserActions'
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
const Users = () => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const userList = useSelector((state) => state.user.userList)
    const [open, setOpen] = React.useState(false)

    const [username, setUsername] = React.useState('')
    const [packageId, setPackageId] = React.useState('')
    const [specialCode, setSpecialCode] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const packageList = useSelector((state) => state.package.packageList)
    console.log(userList)
    useEffect(() => {
        dispatch(getUserList())
        dispatch(getPackageList('en'))
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
                <Typography variant="h4">Users</Typography>
            </Box>

            <CustomModal open={open} setOpen={setOpen}>
                <Grid container style={{ marginTop: 10 }} spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            label="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                                Packages
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Packages"
                                value={packageId}
                                onChange={(e) => {
                                    setPackageId(e.target.value)
                                }}
                                required
                            >
                                {packageList !== undefined &&
                                    packageList.map((item) => (
                                        <MenuItem value={item.id}>
                                            {item.package_name}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            label="Special Code"
                            value={specialCode}
                            onChange={(e) => setSpecialCode(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            type="password"
                            label="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Grid>

                    <Box component="div" className={classes.modalContent}>
                        <CustomButton
                            eventHandler={() => {
                                dispatch(
                                    createUser(
                                        {
                                            username: username,
                                            packageId: packageId,
                                            specialCode: specialCode,
                                            email: email,
                                            password: password,
                                        },
                                        setOpen
                                    )
                                )
                            }}
                            title="Create"
                        />
                    </Box>
                </Grid>
            </CustomModal>

            <CustomButton
                eventHandler={() => {
                    setOpen(true)
                }}
                title="Create User"
            />
            <SimpleCard title="List">
                <PaginationTable data={userList} />
            </SimpleCard>
        </Box>
    )
}

export default Users
