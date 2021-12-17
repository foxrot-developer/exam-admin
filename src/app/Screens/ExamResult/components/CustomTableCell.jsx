import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { IconButton, TableCell, Icon, TextField } from '@material-ui/core'
import { ArrowBack, ArrowForward } from '@material-ui/icons'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(() => ({
    input: {
        width: '90%',
    },
}))
const CustomTableCell = ({ subscriber }) => {
    return (
        <>
            <TableCell className="px-0 " align="left">
                {subscriber.username}
            </TableCell>
            <TableCell className="px-0 " align="left">
                {subscriber.examName}
            </TableCell>
            <TableCell
                style={{ color: subscriber.part1_status ? 'green' : 'red' }}
                className="px-0 "
                align="left"
            >
                {subscriber.part1}
            </TableCell>
            <TableCell
                style={{ color: subscriber.part2_status ? 'green' : 'red' }}
                className="px-0 "
                align="left"
            >
                {subscriber.part2}
            </TableCell>
            <TableCell
                style={{ color: subscriber.part3_status ? 'green' : 'red' }}
                className="px-0 "
                align="left"
            >
                {subscriber.part3}
            </TableCell>
            <TableCell
                style={{
                    fontWeight: 'bold',
                    color:
                        subscriber.part1_status &&
                        subscriber.part2_status &&
                        subscriber.part3_status
                            ? 'green'
                            : 'red',
                }}
                className="px-0 "
                align="left"
            >
                {subscriber.part1_status &&
                subscriber.part2_status &&
                subscriber.part3_status
                    ? 'Pass'
                    : 'Fail'}
            </TableCell>
        </>
    )
}

export default CustomTableCell
