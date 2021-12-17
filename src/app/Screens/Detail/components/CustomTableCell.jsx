import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { IconButton, TableCell, Icon, TextField } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    input: {
        width: '90%',
    },
}))
const CustomTableCell = ({ subscriber, updateData }) => {
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
                {subscriber.specialCode}
            </TableCell>
            <TableCell align="center" className="px-0">
                {isEditMode ? (
                    <>
                        <IconButton
                            onClick={() => {
                                setEditMode(false)
                            }}
                        >
                            <Icon>close</Icon>
                        </IconButton>
                        <IconButton onClick={() => {}}>
                            <Icon color="action">done_all</Icon>
                        </IconButton>
                    </>
                ) : (
                    <>
                        <IconButton onClick={() => setEditMode(!isEditMode)}>
                            <Icon>edit</Icon>
                        </IconButton>
                    </>
                )}
            </TableCell>
        </>
    )
}

export default CustomTableCell
