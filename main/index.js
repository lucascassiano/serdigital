import React from "react";
import ReactDOM from "react-dom";
import Header from "./components/Header";

import { Grid, Paper } from "@material-ui/core";

class App extends React.Component {
    render() {
        return <div>
            <Header />
        </div>
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
