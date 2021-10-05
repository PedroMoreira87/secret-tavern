import {React, Component} from "react";
import {Link} from "react-router-dom";
import {Button} from "@material-ui/core";
import './index.css';

class Start extends Component {

    render() {

        return (
            <div class="content">
                <Link to={"login"}>
                    <Button variant="outlined" color="primary">Login</Button>
                </Link>
            </div>
        )
    }
}

export default Start;
