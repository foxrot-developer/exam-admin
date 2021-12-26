import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { IconButton, TableCell, Icon, TextField } from '@material-ui/core'
import { Switch } from '@mui/material'

const useStyles = makeStyles((theme) => ({
    input: {
        width: '90%',
    },
}))
const CustomTableCell = ({ subscriber }) => {
    const classes = useStyles()
    return (
        <>
            <TableCell colSpan={1} className="px-0 " align="left">
                {subscriber.heading}
            </TableCell>
            <TableCell colSpan={2} className="px-0 " align="left">
                {subscriber.description}
            </TableCell>
        </>
    )
}

export default CustomTableCell
