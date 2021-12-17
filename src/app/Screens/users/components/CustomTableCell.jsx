import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { IconButton, TableCell, Icon, TextField } from '@material-ui/core'
import { FormControlLabel, Switch } from '@mui/material'

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
    const [value, setValue] = React.useState({
        username: subscriber.username,
        email: subscriber.email,
        block: subscriber.block,
    })
    const [error, setError] = React.useState({
        username: '',
        email: '',
    })

    const [isEditMode, setEditMode] = React.useState(false)
    return (
        <>
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
                            value={subscriber.block}
                            onChange={(e) => {
                                blockUser(subscriber.id, e.target.checked)
                            }}
                        />
                    </>
                )}
            </TableCell>
        </>
    )
}

export default CustomTableCell
