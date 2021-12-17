import React from 'react'
import { IconButton, TableCell, Icon } from '@material-ui/core'

const CustomTableCell = ({ subscriber, updateData }) => {
    return (
        <>
            <TableCell className="px-0 " align="left">
                {subscriber.name}
            </TableCell>
            <TableCell className="px-0 " align="left">
                {subscriber.active ? 'Active' : 'Inactive'}
            </TableCell>

            <TableCell align="center" className="px-0">
                {subscriber.active ? (
                    <IconButton
                        onClick={() => updateData(subscriber.id, false)}
                    >
                        <Icon>lock_open</Icon>
                    </IconButton>
                ) : (
                    <IconButton onClick={() => updateData(subscriber.id, true)}>
                        <Icon>lock</Icon>
                    </IconButton>
                )}
            </TableCell>
        </>
    )
}

export default CustomTableCell
