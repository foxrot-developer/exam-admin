import { Button } from '@material-ui/core'
import React from 'react'

const CustomButton = ({ eventHandler, title }) => {
    return (
        <Button
            onClick={eventHandler}
            variant="contained"
            style={{
                backgroundColor: '#EEBC1D',
                fontWeight: '600',
                boxShadow: '3px 3px 10px #EEBC1D',
                marginBottom: '10px',
                alignSelf: 'flex-end',
            }}
        >
            {title}
        </Button>
    )
}

export default CustomButton
