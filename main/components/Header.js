import React, { Component } from "react";

import { Grid, Paper, Card } from "@material-ui/core";

export default class Header extends Component {

    render() {
        return <div>
            <Grid container spacing={24}>
                <Grid item xs={12}>
                    <Paper className="card">xs=12</Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className="card">xs=6</Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className="card">xs=6</Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className="card">xs=3</Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className="card">xs=3</Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className="card">xs=3</Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className="card">xs=3</Paper>
                </Grid>
            </Grid>
        </div>
    }
}
