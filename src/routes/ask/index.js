import { Component } from "preact";
import { route } from "preact-router";
import Match from "preact-router/match";   

class Ask extends Component {

    constructor() {
        super();
        this.state = {
            path: ''
        };
    }

    setPath = (path) => {
        this.setState({path});
    }

    render() {
        return (
            <div>
                <p> I know how to do Preact! </p>
                 <Match path="/">
                    {({path}) => !this.state.path && this.setPath(path)}
                </Match> 
                Path: {this.state.path}
            </div>
        );
    }
}

export default Ask;