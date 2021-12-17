import React, { Fragment } from 'react'
import { Grid } from '@material-ui/core'
import StatCards from './components/StatCards'

const Analytics = () => {
    return (
        <Fragment>
            <div className="analytics m-sm-30 mt-6">
                <Grid container spacing={3}>
                    <Grid item lg={8} md={8} sm={12} xs={12}>
                        <StatCards />
                    </Grid>
                </Grid>
            </div>
        </Fragment>
    )
}

export default Analytics
