import {Component} from 'preact';

export default class Question extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div onClick={this.props.onClick}>{this.props.children}</div>
        );
    }
}