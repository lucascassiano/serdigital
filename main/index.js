import React from "react";
import ReactDOM from "react-dom";
import Header from "./components/Header";

import { Grid, Paper } from "@material-ui/core";

class App extends React.Component {
    render() {
        return <div>
            <Grid container spacing={24}>
                <Grid item xs={12}>
                    <Header />
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

ReactDOM.render(<App />, document.getElementById("root"));
