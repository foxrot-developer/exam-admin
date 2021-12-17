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
const CustomTableCell = ({ subscriber, removeUser, updateData }) => {
    const classes = useStyles()
    const [value, setValue] = React.useState({
        question: subscriber.question,
        answer: subscriber.answer,
        options: JSON.parse(subscriber.options),
        part: subscriber.part,
    })
    const [error, setError] = React.useState({
        question: '',
        answer: '',
        options: '',
        part: '',
    })
    const [isEditMode, setEditMode] = React.useState(false)
    return (
        <>
            <TableCell className="px-0 " align="left">
                {isEditMode ? (
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                            Part
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Age"
                            value={value.part}
                            onChange={(e) => {
                                setValue({ ...value, part: e.target.value })
                            }}
                            required
                        >
                            <MenuItem value={'part 1'}>Part 1</MenuItem>
                            <MenuItem value={'part 2'}>Part 2</MenuItem>
                            <MenuItem value={'part 3'}>Part 3</MenuItem>
                        </Select>
                    </FormControl>
                ) : (
                    subscriber.part
                )}
            </TableCell>
            <TableCell className="px-0 " align="left">
                <img
                    style={{ width: '70px', height: 'auto', aspectRatio: 1 }}
                    src={
                        'https://examin-education.herokuapp.com/' +
                        subscriber.questionImage
                    }
                    alt="question"
                />
            </TableCell>
            <TableCell colSpan={2} className="px-0 " align="left">
                {isEditMode ? (
                    <TextField
                        required={true}
                        variant="outlined"
                        value={value.question}
                        name="Question"
                        helperText={error.question}
                        onChange={(e) => {
                            setValue({ ...value, question: e.target.value })
                        }}
                        error={error.email !== ''}
                        className={classes.input}
                    />
                ) : (
                    value.question
                )}
            </TableCell>
            <TableCell className="px-0 " align="left">
                {isEditMode ? (
                    <TextField
                        required={true}
                        variant="outlined"
                        value={value.options[0]}
                        name="Question"
                        helperText={error.options}
                        onChange={(e) => {
                            setValue({
                                ...value,
                                options: [
                                    e.target.value,
                                    value.options[1],
                                    value.options[2],
                                ],
                            })
                        }}
                        error={error.options !== ''}
                        className={classes.input}
                    />
                ) : (
                    value.options[0]
                )}
            </TableCell>
            <TableCell className="px-0 " align="left">
                {isEditMode ? (
                    <TextField
                        required={true}
                        variant="outlined"
                        value={value.options[1]}
                        name="Question"
                        helperText={error.options}
                        onChange={(e) => {
                            setValue({
                                ...value,
                                options: [
                                    value.options[0],
                                    e.target.value,
                                    value.options[2],
                                ],
                            })
                        }}
                        error={error.options !== ''}
                        className={classes.input}
                    />
                ) : (
                    value.options[1]
                )}
            </TableCell>
            <TableCell className="px-0 " align="left">
                {isEditMode ? (
                    <TextField
                        required={true}
                        variant="outlined"
                        value={value.options[2]}
                        name="Question"
                        helperText={error.options}
                        onChange={(e) => {
                            setValue({
                                ...value,
                                options: [
                                    value.options[0],
                                    value.options[1],
                                    e.target.value,
                                ],
                            })
                        }}
                        error={error.options !== ''}
                        className={classes.input}
                    />
                ) : (
                    value.options[2]
                )}
            </TableCell>
            <TableCell className="px-0 " align="left">
                {isEditMode ? (
                    <TextField
                        required={true}
                        variant="outlined"
                        value={value.answer}
                        name="Question"
                        helperText={error.options}
                        onChange={(e) => {
                            setValue({ ...value, answer: e.target.value })
                        }}
                        error={error.options !== ''}
                        className={classes.input}
                    />
                ) : (
                    value.answer
                )}
            </TableCell>
        </>
    )
}

export default CustomTableCell
