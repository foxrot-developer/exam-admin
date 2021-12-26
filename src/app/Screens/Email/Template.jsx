import { Button, TextareaAutosize } from '@material-ui/core'
import { Box } from '@mui/system'
import {
    getEmailTemplate,
    updateEmailTemplate,
} from 'app/redux/actions/UserActions'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Template = () => {
    const dispatch = useDispatch()
    const template = useSelector((state) => state.user.email)
    console.log(template)
    const [value, setValue] = useState('')
    useEffect(() => {
        dispatch(getEmailTemplate())
    }, [])
    useEffect(() => {
        setValue(template.templateText)
    }, [template])

    return (
        <Box
            sx={{
                p: 10,
            }}
            component="div"
        >
            <h1>Template</h1>
            <TextareaAutosize
                aria-label="minimum height"
                minRows={30}
                value={value}
                style={{ width: '100%', height: '70vh', fontSize: '20px' }}
                onChange={(e) => setValue(e.target.value)}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={() =>
                    dispatch(updateEmailTemplate({ templateText: value }))
                }
            >
                Update
            </Button>
        </Box>
    )
}

export default Template
