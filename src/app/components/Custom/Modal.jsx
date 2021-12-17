import * as React from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import { Close } from '@material-ui/icons'
import { IconButton } from '@material-ui/core'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: '#fff',
    border: '1px solid #EEBC1D',
    borderRadius: '5px',
    boxShadow: ' 0 0 10px #EEBC1D',
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '90%',
    overflowY: 'auto',
    padding: '2rem',
}

const CustomModal = ({ open, setOpen, children }) => {
    const handleClose = () => setOpen(false)
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <Box component="div" style={style}>
                    <IconButton
                        onClick={handleClose}
                        style={{
                            background: '#EEBC1D',
                            color: '#fff',
                            padding: '0.3rem',
                            alignSelf: 'flex-end',
                        }}
                    >
                        <Close style={{ width: '18px', height: '18px' }} />
                    </IconButton>
                    {children}
                </Box>
            </Fade>
        </Modal>
    )
}

export default CustomModal
