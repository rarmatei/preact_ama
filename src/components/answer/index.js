import {Component} from 'preact';

export default class Answer extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>{this.props.children}</div>
        );
    }
}