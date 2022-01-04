import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
    IconButton,
    TableCell,
    Icon,
    TextField,
    Grid,
    Typography,
    Box,
    Button,
} from '@material-ui/core'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import CustomModal from 'app/components/Custom/Modal'
import { SettingsInputCompositeRounded } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
    input: {
        width: '90%',
    },
    btnRoot: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    modalRoot: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
    },
    modalContent: {
        width: '100%',
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    languageBtnContainer: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    btnContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
    },
    langSpinner: {
        width: '250px',
    },
}))
const CustomTableCell = ({ subscriber, removeUser, updateData, lang }) => {
    const value = {
        question: subscriber.question,
        answer: subscriber.answer,
        options: subscriber.options,
        part: subscriber.part,
        reason: subscriber.reason,
    }
    return (
        <>
            <TableCell className="px-0 " align="left">
                {subscriber.part}
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
            <TableCell className="px-0 " align="left">
                {value.question}
            </TableCell>
            <TableCell className="px-0 " align="left">
                {value.options !== undefined && JSON.parse(value.options)[0]}
            </TableCell>
            <TableCell className="px-0 " align="left">
                {value.options !== undefined && JSON.parse(value.options)[1]}
            </TableCell>
            <TableCell className="px-0 " align="left">
                {value.options !== undefined && JSON.parse(value.options)[2]}
            </TableCell>
            <TableCell className="px-0 " align="left">
                {value.answer}
            </TableCell>
            <TableCell className="px-0 " align="left">
                {value.reason}
            </TableCell>
            {/* <TableCell className="px-0">
                <IconButton onClick={() => removeUser(subscriber.id)}>
                    <Icon>delete</Icon>
                </IconButton>
                <IconButton onClick={() => setOpen(true)}>
                    <Icon>edit</Icon>
                </IconButton>
            </TableCell> */}
        </>
    )
}

export default CustomTableCell
