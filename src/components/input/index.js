import {Component} from 'preact';

export default class Input extends Component {

    constructor() {
        super();
        this.state = {
            input: ""
        };
    }

    inputChange = (e) => {
        this.setState({
            input: e.target.value
        })
    };

    submit = () => {
        this.props.submit(this.state.input);
    };

    render() {
        return (
            <div>
                <input onInput={this.inputChange} placeholder="Use that keyboard here..."/>
                <button onClick={this.submit}>Submit</button>
            </div>
        );
    }
}