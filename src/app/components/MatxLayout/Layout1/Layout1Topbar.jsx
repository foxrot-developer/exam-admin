import React, { useEffect } from 'react'
import {
    Icon,
    IconButton,
    MenuItem,
    Avatar,
    useMediaQuery,
    Hidden,
} from '@material-ui/core'
import { MatxMenu, MatxSearchBox } from 'app/components'
import NotificationBar from '../../NotificationBar/NotificationBar'
import { Link } from 'react-router-dom'
import ShoppingCart from '../../ShoppingCart/ShoppingCart'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import clsx from 'clsx'
import useAuth from 'app/hooks/useAuth'
import useSettings from 'app/hooks/useSettings'
import { NotificationProvider } from 'app/contexts/NotificationContext'
import { useHistory } from 'react-router-dom'
import CustomModal from 'app/components/Custom/Modal'
import CustomButton from 'app/components/Custom/CustomButton'
import { TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { updatePassword, updateProfile } from 'app/redux/actions/LoginAction'

const useStyles = makeStyles(({ palette, ...theme }) => ({
    topbar: {
        top: 0,
        zIndex: 96,
        transition: 'all 0.3s ease',
        background:
            'linear-gradient(180deg, rgba(255, 255, 255, 0.95) 44%, rgba(247, 247, 247, 0.4) 50%, rgba(255, 255, 255, 0))',

        '& .topbar-hold': {
            backgroundColor: palette.primary.main,
            height: 80,
            paddingLeft: 18,
            paddingRight: 20,
            [theme.breakpoints.down('sm')]: {
                paddingLeft: 16,
                paddingRight: 16,
            },
            [theme.breakpoints.down('xs')]: {
                paddingLeft: 14,
                paddingRight: 16,
            },
        },
        '& .fixed': {
            boxShadow: theme.shadows[8],
            height: 64,
        },
    },
    userMenu: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        borderRadius: 24,
        padding: 4,
        '& span': {
            margin: '0 8px',
            // color: palette.text.secondary
        },
    },
    menuItem: {
        display: 'flex',
        alignItems: 'center',
        minWidth: 185,
    },
}))

const Layout1Topbar = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const theme = useTheme()
    const classes = useStyles()
    const { settings, updateSettings } = useSettings()
    const isMdScreen = useMediaQuery(theme.breakpoints.down('md'))
    const fixed = settings?.layout1Settings?.topbar?.fixed

    const updateSidebarMode = (sidebarSettings) => {
        updateSettings({
            layout1Settings: {
                leftSidebar: {
                    ...sidebarSettings,
                },
            },
        })
    }

    const handleSidebarToggle = () => {
        let { layout1Settings } = settings
        let mode

        if (isMdScreen) {
            mode =
                layout1Settings.leftSidebar.mode === 'close'
                    ? 'mobile'
                    : 'close'
        } else {
            mode =
                layout1Settings.leftSidebar.mode === 'full' ? 'close' : 'full'
        }

        updateSidebarMode({ mode })
    }

    const [open, setOpen] = React.useState(false)
    const [changePassOpen, setchangePassOpen] = React.useState(false)
    const [editName, setEditName] = React.useState(true)
    const [password, setPassword] = React.useState('')
    const [newPassword, setNewPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')
    const [editEmail, setEditEmail] = React.useState(true)
    const [message, setMessage] = React.useState('')

    const data = useSelector((state) => state.login.admin)
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    useEffect(() => {
        if (data) {
            setName(data.name)
            setEmail(data.email)
        }
    }, [data])

    return (
        <div className={classes.topbar}>
            <div className={clsx({ 'topbar-hold': true, fixed: fixed })}>
                <div className="flex justify-between items-center h-full">
                    <div className="flex">
                        <IconButton
                            onClick={handleSidebarToggle}
                            className="hide-on-pc"
                        >
                            <Icon>menu</Icon>
                        </IconButton>
                    </div>

                    <CustomModal open={open} setOpen={setOpen}>
                        <div
                            style={{
                                display: 'flex',
                                width: '100%',
                                flexDirection: 'column',
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <h4 style={{ margin: 0 }}>Name</h4>
                                <IconButton
                                    onClick={() => {
                                        const data = {
                                            email: email,
                                            name: name,
                                        }
                                        if (!editName) {
                                            dispatch(
                                                updateProfile(
                                                    data,
                                                    data.adminId,
                                                    setOpen
                                                )
                                            )
                                        }
                                        setEditName(!editName)
                                    }}
                                >
                                    {editName ? (
                                        <Icon>edit</Icon>
                                    ) : (
                                        <Icon
                                            style={{
                                                color: '#EEBC1D',
                                            }}
                                        >
                                            check
                                        </Icon>
                                    )}
                                </IconButton>
                            </div>
                            <TextField
                                variant="outlined"
                                value={name}
                                disabled={editName}
                                onChange={(e) => {
                                    setName(e.target.value)
                                }}
                            />
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <h4 style={{ margin: 0 }}>Email</h4>
                                <IconButton
                                    onClick={() => {
                                        const data = {
                                            email: email,
                                            name: name,
                                        }
                                        if (!editEmail) {
                                            dispatch(
                                                updateProfile(
                                                    data,
                                                    data.adminId,
                                                    setOpen
                                                )
                                            )
                                        }
                                        setEditEmail(!editEmail)
                                    }}
                                >
                                    {editEmail ? (
                                        <Icon>edit</Icon>
                                    ) : (
                                        <Icon
                                            style={{
                                                color: '#EEBC1D',
                                            }}
                                        >
                                            check
                                        </Icon>
                                    )}
                                </IconButton>
                            </div>

                            <TextField
                                variant="outlined"
                                value={email}
                                disabled={editEmail}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <div
                                style={{
                                    marginTop: '10px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <CustomButton
                                    eventHandler={() => {
                                        setchangePassOpen(true)
                                    }}
                                    title="Change Password"
                                />
                            </div>
                        </div>
                    </CustomModal>
                    <CustomModal
                        open={changePassOpen}
                        setOpen={setchangePassOpen}
                    >
                        <div
                            style={{
                                display: 'flex',
                                width: '100%',
                                flexDirection: 'column',
                            }}
                        >
                            <h4>Old Password</h4>
                            <TextField
                                variant="outlined"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <h4>New Password</h4>

                            <TextField
                                variant="outlined"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <h4>Confirm New Password</h4>

                            <TextField
                                variant="outlined"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            />
                            <div
                                style={{
                                    marginTop: '10px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <CustomButton
                                    eventHandler={() => {
                                        if (newPassword === confirmPassword) {
                                            dispatch(
                                                updatePassword({
                                                    data: {
                                                        oldPassword: password,
                                                        newPassword:
                                                            newPassword,
                                                    },
                                                    id: data.adminId,
                                                    setMessage: setMessage,
                                                    setchangePassOpen:
                                                        setchangePassOpen,
                                                })
                                            )
                                        } else {
                                            alert('Password not match')
                                        }
                                    }}
                                    title="Update"
                                />
                            </div>
                        </div>
                    </CustomModal>
                    <div className="flex items-center">
                        <MatxMenu
                            menuButton={
                                <div className={classes.userMenu}>
                                    <Hidden xsDown>
                                        <span>
                                            Hi <strong>Admin</strong>
                                        </span>
                                    </Hidden>
                                    <Avatar
                                        className="cursor-pointer"
                                        src={null}
                                    />
                                </div>
                            }
                        >
                            <MenuItem>
                                <Link className={classes.menuItem} to="/">
                                    <Icon> home </Icon>
                                    <span className="pl-4"> Home </span>
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <div
                                    onClick={() => setOpen(true)}
                                    className={classes.menuItem}
                                >
                                    <Icon> person </Icon>
                                    <span className="pl-4"> Profile </span>
                                </div>
                            </MenuItem>
                            {/* <MenuItem className={classes.menuItem}>
                                <Icon> settings </Icon>
                                <span className="pl-4"> Settings </span>
                            </MenuItem> */}
                            <MenuItem
                                onClick={() => {
                                    history.push('/session/signin')
                                }}
                                className={classes.menuItem}
                            >
                                <Icon> power_settings_new </Icon>
                                <span className="pl-4"> Logout </span>
                            </MenuItem>
                        </MatxMenu>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(Layout1Topbar)
