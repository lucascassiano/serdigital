import React, { Component } from "react";

import { Grid, Paper, Card, Typography } from "@material-ui/core";

export default class Header extends Component {
    render() {
        return <div>
            <Paper className="card">
                <img ></img>
                <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                    Title of a longer featured blog post
                  </Typography>
                <Typography variant="h5" color="inherit" paragraph>
                    Multiple lines of text that form the lede, informing new readers quickly and
                    efficiently about what&apos;s most interesting in this post&apos;s contents…
                  </Typography>
            </Paper>

            
        </div>
    }
}
