import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { IconButton, TableCell, Icon, TextField } from '@material-ui/core'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

const useStyles = makeStyles((theme) => ({
    input: {
        width: '90%',
    },
}))
const CustomTableCellReplacement = ({ subscriber, index, handleChange }) => {
    const classes = useStyles()
    const [value, setValue] = React.useState({
        question: subscriber.question,
        answer: subscriber.answer,
        options: JSON.parse(subscriber.options),
        part: subscriber.part,
        reason: subscriber.reason,
    })
    return (
        <>
            <TableCell className="px-0 " align="left">
                {subscriber.part}
            </TableCell>
            <TableCell className="px-0 " align="left">
                {subscriber.draggable ? 'Yes' : 'No'}
            </TableCell>
            <TableCell className="px-0 " align="left">
                <img
                    style={{ width: '70px', height: 'auto', aspectRatio: 1 }}
                    src={
                        'https://admin-alshahbarijschool.nl/' +
                        subscriber.questionImage
                    }
                    alt="question"
                />
            </TableCell>
            <TableCell className="px-0 " align="left">
                {value.question}
            </TableCell>
            <TableCell className="px-0 " align="left">
                {value.options[0]}
            </TableCell>
            <TableCell className="px-0 " align="left">
                {value.options[1]}
            </TableCell>
            <TableCell className="px-0 " align="left">
                {value.options[2]}
            </TableCell>
            <TableCell className="px-0 " align="left">
                {value.answer}
            </TableCell>
            <TableCell className="px-0 " align="left">
                {value.reason}
            </TableCell>
            <TableCell className="px-0 " align="left">
                <IconButton onClick={() => handleChange(index)}>
                    <Icon>done</Icon>
                </IconButton>
            </TableCell>
        </>
    )
}

export default CustomTableCellReplacement
