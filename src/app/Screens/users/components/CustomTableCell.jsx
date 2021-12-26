import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import {
    IconButton,
    TableCell,
    Icon,
    TextField,
    Button,
} from '@material-ui/core'
import { Switch } from '@mui/material'
import { Box, Grid, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { createUser, resetUserPassword } from 'app/redux/actions/UserActions'
import CustomModal from 'app/components/Custom/Modal'
import FormControl from '@mui/material/FormControl'
const useStyles = makeStyles((theme) => ({
    input: {
        width: '90%',
    },
}))
const CustomTableCell = ({
    subscriber,
    removeUser,
    updateData,
    blockUser,
    packageList,
}) => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const [open, setOpen] = useState(false)
    const [value, setValue] = useState({
        username: subscriber.username,
        email: subscriber.email,
        block: subscriber.block,
    })
    const [password, setPassword] = useState('')
    const [error, setError] = useState({
        username: '',
        email: '',
    })

    const [isEditMode, setEditMode] = useState(false)
    return (
        <>
            <CustomModal open={open} setOpen={setOpen}>
                <FormControl encType="multipart/form-data">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6">Update</Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                margin="dense"
                                fullWidth
                                label="Description"
                                variant="outlined"
                                required
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                }}
                            />
                        </Grid>

                        <Box component="div" className={classes.modalContent}>
                            <Button
                                onClick={() => {
                                    dispatch(
                                        resetUserPassword(
                                            subscriber.id,
                                            {
                                                password: password,
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
            <TableCell colSpan={2} className="px-0 " align="left">
                {isEditMode ? (
                    <TextField
                        required={true}
                        variant="outlined"
                        value={value.username}
                        name="username"
                        helperText={error.username}
                        onChange={(e) => {
                            setValue({ ...value, username: e.target.value })
                        }}
                        error={error.username !== ''}
                        className={classes.input}
                    />
                ) : (
                    value.username
                )}
            </TableCell>
            <TableCell colSpan={2} className="px-0 " align="left">
                {isEditMode ? (
                    <TextField
                        required={true}
                        variant="outlined"
                        value={value.email}
                        name="username"
                        helperText={error.email}
                        onChange={(e) => {
                            setValue({ ...value, email: e.target.value })
                        }}
                        error={error.email !== ''}
                        className={classes.input}
                    />
                ) : (
                    value.email
                )}
            </TableCell>
            <TableCell colSpan={2} className="px-0 " align="left">
                {packageList !== undefined &&
                    packageList.find((item) => item.id === subscriber.packageId)
                        ?.package_name}
            </TableCell>
            <TableCell colSpan={2} className="px-0 " align="left">
                {subscriber.specialCode}
            </TableCell>
            <TableCell colSpan={2} align="center" className="px-0">
                <IconButton
                    onClick={() => {
                        setOpen(true)
                    }}
                >
                    <Icon>lock_reset</Icon>
                </IconButton>
                {isEditMode ? (
                    <>
                        <IconButton
                            onClick={() => {
                                setEditMode(false)
                            }}
                        >
                            <Icon>close</Icon>
                        </IconButton>
                        <IconButton
                            onClick={() => {
                                var pattern = new RegExp(
                                    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
                                )

                                if (
                                    value.username.length === 0 &&
                                    value.email.length === 0
                                ) {
                                    setError({
                                        username: 'Please Enter Username',
                                        email: 'Please Enter Email',
                                    })
                                } else if (value.username.length === 0) {
                                    setError({
                                        username: 'Please Enter Username',
                                        email: '',
                                    })
                                } else if (value.email.length === 0) {
                                    setError({
                                        username: '',
                                        email: 'Please Enter Email',
                                    })
                                } else if (!pattern.test(value.email)) {
                                    setError({
                                        username: '',
                                        email: 'Invalid Email',
                                    })
                                } else {
                                    setEditMode(!isEditMode)
                                    updateData(subscriber.id, value)
                                }
                            }}
                        >
                            <Icon color="action">done_all</Icon>
                        </IconButton>
                    </>
                ) : (
                    <>
                        <IconButton onClick={() => setEditMode(!isEditMode)}>
                            <Icon>edit</Icon>
                        </IconButton>
                        <IconButton onClick={() => removeUser(subscriber.id)}>
                            <Icon>delete</Icon>
                        </IconButton>
                        <Switch
                            checked={!subscriber.block}
                            onChange={(e) => {
                                blockUser(subscriber.id, !e.target.checked)
                            }}
                        />
                    </>
                )}
            </TableCell>
        </>
    )
}

export default CustomTableCell
