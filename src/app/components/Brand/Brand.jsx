import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import useSettings from 'app/hooks/useSettings'
import logo from './logo.png'

const useStyles = makeStyles(({ palette, ...theme }) => ({
    brand: {
        padding: '20px 18px 20px 29px',
    },
    hideOnCompact: {
        display: 'none',
    },
}))

const Brand = ({ children }) => {
    const classes = useStyles()
    const { settings } = useSettings()
    const leftSidebar = settings.layout1Settings.leftSidebar
    const { mode } = leftSidebar

    return (
        <div
            className={clsx('flex items-center justify-between', classes.brand)}
        >
            <div className="flex items-center">
                <img
                    style={{
                        width: '150px',
                    }}
                    src={logo}
                    alt="logo"
                />
            </div>
            <div
                className={clsx({
                    sidenavHoverShow: true,
                    [classes.hideOnCompact]: mode === 'compact',
                })}
            >
                {children || null}
            </div>
        </div>
    )
}

export default Brand
